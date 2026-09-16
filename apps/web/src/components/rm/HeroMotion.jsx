import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { animateMini, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useHeroTransition } from './HeroTransition';

const HeroContext = createContext(null);
export const useHeroMotion = () => useContext(HeroContext);
const fineQuery = '(min-width:901px) and (hover:hover) and (pointer:fine)';
const entrance = [.22,1,.36,1];
const clamp = value => Math.max(-1,Math.min(1,value));
const settle = value => { const t=Math.max(0,Math.min(1,value)); return t*t*(3-2*t); };
const objects = [
 // Cursor depth, scroll X/Y/rotation/scale; layout stays in the original SVG groups.
 { depth:1.8, x:32, y:-12, rotate:-1, scale:1.06, exitX:95, exitY:-130, exitRotate:2, exitScale:.72 },
 { depth:3.5, x:-38, y:-5, rotate:-2, scale:1.04, exitX:-100, exitY:-150, exitRotate:-5, exitScale:.6 },
 { depth:4.2, x:12, y:-26, rotate:1.4, scale:1.02, exitX:160, exitY:-230, exitRotate:4, exitScale:.72 },
 { depth:4.8, x:40, y:12, rotate:2.2, scale:1.015, exitX:220, exitY:-110, exitRotate:5, exitScale:.74 },
 { depth:5.5, x:24, y:40, rotate:-1.8, scale:1.04, exitX:200, exitY:-160, exitRotate:-4, exitScale:.7 },
];
const floats = [
 // Closed asymmetric orbits: duration, X/Y amplitude, rotation, phase.
 [8.9,.45,.8,.055,.2], [6.7,1.5,2.1,.23,1.4], [8.1,1,1.4,.13,2.6],
 [7.3,1.6,1.7,.19,4.1], [6.1,1.2,1.6,.16,5.5],
];

export function useFineMotion() {
 const [enabled,setEnabled] = useState(() => typeof window !== 'undefined' && window.matchMedia(fineQuery).matches);
 useEffect(() => {
  const query = window.matchMedia(fineQuery);
  const update = () => setEnabled(query.matches);
  update(); query.addEventListener('change',update);
  return () => query.removeEventListener('change',update);
 },[]);
 return enabled;
}

export function useSceneActive(target) {
 const visible = useInView(target);
 const [awake,setAwake] = useState(() => typeof document === 'undefined' || !document.hidden);
 useEffect(() => {
  const update = () => setAwake(!document.hidden);
  document.addEventListener('visibilitychange',update);
  return () => document.removeEventListener('visibilitychange',update);
 },[]);
 return visible && awake;
}

// Read geometry only on resize/content resize, never during scrolling. Using the
// native document scroll source avoids Framer's static-root target-offset warning.
export function useSceneScroll(target,sticky=false) {
 const {scrollY} = useScroll();
 const start = useMotionValue(0), distance = useMotionValue(1);
 useLayoutEffect(() => {
  const measure = () => {
   const rect = target.current.getBoundingClientRect();
   start.set(rect.top+window.scrollY);
   distance.set(Math.max(1,rect.height-(sticky ? window.innerHeight : 0)));
  };
  measure();
  const observer = new ResizeObserver(measure);
  observer.observe(target.current); observer.observe(document.documentElement);
  window.addEventListener('resize',measure,{passive:true});
  return () => { observer.disconnect(); window.removeEventListener('resize',measure); };
 },[target,sticky,start,distance]);
 const progress = useTransform([scrollY,start,distance],([y,top,length]) => Math.max(0,Math.min(1,(y-top)/length)));
 return {progress,scrollY};
}

export function FloatingLayer({ children,index,desktop,reduced,visible,svg=false,speed }) {
 const target = useRef(null), playback = useRef(null);
 const Tag = svg ? 'g' : 'div';
 useEffect(() => {
  if (reduced) return;
  const [duration,dx,dy,angle,phase] = floats[index];
  const amount = (desktop ? 1 : .25)*(svg ? [2.2,1.8,1.9,1.7,1.85][index] : 1);
  // Sample once, not per frame. Position AND velocity join at the loop boundary.
  // X/Y use different harmonics, avoiding a straight-line ping-pong.
  const frames = Array.from({length:65},(_,i) => {
   if (i===0 || i===64) return svg ? 'translate(0px, 0px) rotate(0deg)' : 'translate3d(0px, 0px, 0px) rotate(0deg)';
   const t = i/64*Math.PI*2;
   const x = dx*amount*(Math.sin(t+phase)-Math.sin(phase));
   const y = dy*amount*(.8*(Math.cos(t+phase)-Math.cos(phase))+.2*(Math.sin(2*t+phase)-Math.sin(phase)));
   const r = angle*amount*(Math.sin(t+phase+.6)-Math.sin(phase+.6));
   return svg ? `translate(${x}px, ${y}px) rotate(${r}deg)` : `translate3d(${x}px, ${y}px, 0px) rotate(${r}deg)`;
  });
  // Framer's native animation path keeps autonomous floating off the JS frame loop.
  const animation = animateMini(target.current,{transform:frames},{duration,repeat:Infinity,ease:'linear'});
  animation.pause();
  playback.current = animation;
  return () => { animation.cancel(); playback.current = null; };
 },[index,desktop,reduced,svg]);
 useEffect(() => {
  if (visible && !reduced) playback.current?.play();
  else playback.current?.pause();
 },[visible,reduced,desktop,index]);
 useEffect(() => {
  if (!speed) return;
  const update = value => { if (playback.current) playback.current.speed=value; };
  update(speed.get());
  return speed.on('change',update);
 },[speed,index,desktop,reduced,svg]);
 return <Tag ref={target} className={svg ? 'rm-hero-plane rm-hero-float' : 'rm-ecosystem-float'}>{children}</Tag>;
}

export function HeroScene({ children }) {
 const target = useRef(null), bounds = useRef(null);
 const reduced = useReducedMotion(), desktop = useFineMotion();
 const visible = useSceneActive(target);
 const px = useMotionValue(0), py = useMotionValue(0);
 const x = useSpring(px,{stiffness:70,damping:20,mass:.8,restDelta:.001,restSpeed:.001});
 const y = useSpring(py,{stiffness:70,damping:20,mass:.8,restDelta:.001,restSpeed:.001});
 const {progress:scrollYProgress,scrollY,opening,handoff,carry,floatingSpeed} = useHeroTransition();
 const reset = () => { px.set(0); py.set(0); };
 useEffect(() => {
  const observer = new ResizeObserver(() => { bounds.current = null; });
  observer.observe(target.current);
  return () => observer.disconnect();
 },[]);
 useEffect(() => { if (!desktop || reduced || !visible) { px.set(0); py.set(0); } },[desktop,reduced,visible,px,py]);
 const context = useMemo(() => ({x,y,progress:scrollYProgress,opening,handoff,carry,floatingSpeed,reduced,desktop,visible}),[x,y,scrollYProgress,opening,handoff,carry,floatingSpeed,reduced,desktop,visible]);
 const measure = () => {
  const rect = target.current.getBoundingClientRect();
  bounds.current = {left:rect.left,top:rect.top+scrollY.get(),width:rect.width,height:rect.height};
 };
 return <HeroContext.Provider value={context}>
  <div ref={target} className="rm-hero-scene" onPointerLeave={reset} onPointerCancel={reset}
   onPointerEnter={() => { if (desktop && !reduced) measure(); }} onPointerMove={event => {
    if (!desktop || reduced || event.pointerType !== 'mouse') return;
    if (!bounds.current) measure();
    const rect = bounds.current;
    px.set(clamp((event.clientX-rect.left)/rect.width*2-1));
    py.set(clamp((event.clientY+scrollY.get()-rect.top)/rect.height*2-1));
   }}>{children}</div>
 </HeroContext.Provider>;
}

export function HeroCopy({ children }) {
 const {reduced,opening,desktop} = useHeroMotion();
 const y = useTransform(opening,value => reduced ? 0 : value*(desktop ? -70 : -12));
 const opacity = useTransform(opening,[0,1],[1,desktop ? .65 : .9]);
 return <motion.div className="rm-hero-copy" style={reduced ? undefined : {y,opacity}}>
  <motion.div className="rm-hero-intro" initial={reduced ? false : {opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.08,ease:entrance}}>{children}</motion.div>
 </motion.div>;
}

export function HeroFooter({children}) {
 const {progress}=useHeroTransition();
 const prefersReduced=useReducedMotion();
 const enabled=useFineMotion();
 const opacity=useTransform(progress,p => enabled ? 1-.84*settle(p/.55) : 1);
 const y=useTransform(progress,p => enabled ? -30*settle(p) : 0);
 return <motion.div className="rm-hero-footer" style={prefersReduced ? undefined : {opacity,y}}>{children}</motion.div>;
}

export function HeroScenery({children}) {
 const {progress,reduced,desktop}=useHeroMotion();
 const opacity=useTransform(progress,p => desktop ? 1-settle(p/.34) : 1);
 const y=useTransform(progress,p => desktop ? -35*settle(p/.34) : 0);
 const scale=useTransform(progress,p => desktop ? 1-.12*settle(p/.34) : 1);
 return <motion.g style={reduced ? undefined : {opacity,y,scale}}>{children}</motion.g>;
}

export function HeroObject({ children,index }) {
 const {x,y,opening,handoff,carry,floatingSpeed,reduced,desktop,visible} = useHeroMotion();
 const config = objects[index];
 const amount = reduced ? 0 : desktop ? 1 : .25;
 const sx = useTransform([opening,handoff],([p,h]) => desktop ? (p*config.x+h*config.exitX)*amount : 0);
 const sy = useTransform([opening,handoff,carry],([p,h,retention]) => (p*config.y+(desktop ? retention+h*config.exitY : 0))*amount);
 const scale = useTransform([opening,handoff],([p,h]) => 1+((config.scale-1)*p+(desktop ? (config.exitScale-config.scale)*h : 0))*amount);
 const rotate = useTransform([opening,handoff],([p,h]) => desktop ? (config.rotate*p+(config.exitRotate-config.rotate)*h)*amount : 0);
 const px = useTransform([x,handoff],([value,h]) => desktop && !reduced ? value*config.depth*(1-h*.85) : 0);
 const py = useTransform([y,handoff],([value,h]) => desktop && !reduced ? value*config.depth*.7*(1-h*.85) : 0);
 return <g className={`rm-hero-object rm-hero-object-${index}`} data-motion-active={visible && !reduced}>
  <motion.g className="rm-hero-plane rm-hero-scroll" style={reduced ? undefined : {x:sx,y:sy,scale,rotate}}>
   <motion.g className="rm-hero-plane rm-hero-pointer" style={desktop && !reduced ? {x:px,y:py} : undefined}>
    <motion.g className="rm-hero-plane rm-hero-intro" initial={reduced ? false : {opacity:0,x:index===1 ? -16 : 0,y:index===0 ? 14 : 8,scale:index===0 ? .982 : .99}}
     animate={{opacity:1,x:0,y:0,scale:1}} transition={{duration:desktop ? 1.2 : .65,delay:.12+index*.13,ease:entrance}}>
     <FloatingLayer svg index={index} desktop={desktop} reduced={reduced} visible={visible} speed={floatingSpeed}>{children}</FloatingLayer>
    </motion.g>
   </motion.g>
  </motion.g>
 </g>;
}
