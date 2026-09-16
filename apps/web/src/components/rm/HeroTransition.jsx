import React, { createContext, useContext, useLayoutEffect, useMemo, useRef } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './HeroTransition.css';

const TransitionContext = createContext(null);
export const useHeroTransition = () => useContext(TransitionContext);
const smooth = value => { const t=Math.max(0,Math.min(1,value)); return t*t*(3-2*t); };

// No layout wrapper or extra scroll runway: both scenes share native document scroll.
export function HeroExperience({children}) {
 const hero = useRef(null);
 const {scrollY} = useScroll();
 const top = useMotionValue(0), height = useMotionValue(1), sceneHeight = useMotionValue(1);
 const width = useMotionValue(1536), viewport = useMotionValue(1);
 useLayoutEffect(() => {
  const measure = () => {
   const rect=hero.current.getBoundingClientRect();
   top.set(rect.top+window.scrollY); height.set(rect.height); width.set(rect.width);
   sceneHeight.set(hero.current.querySelector('.rm-hero-scene').getBoundingClientRect().height);
   viewport.set(window.innerHeight);
  };
  measure();
  const observer=new ResizeObserver(measure);
  observer.observe(hero.current); observer.observe(document.documentElement);
  window.addEventListener('resize',measure,{passive:true});
  return () => { observer.disconnect(); window.removeEventListener('resize',measure); };
 },[top,height,sceneHeight,width,viewport]);
 const progress=useTransform([scrollY,top,sceneHeight],([y,start,length]) => Math.max(0,Math.min(1,(y-start)/Math.max(1,length))));
 const opening=useTransform(progress,smooth);
 const handoff=useTransform([scrollY,top,height,viewport],([y,start,length,vh]) => smooth((y-start-length*.7)/(length*.3+Math.min(vh*.22,220))));
 // Counter a portion of native scrolling so artwork lingers across the section seam.
 // Its derivative stays below native scroll speed: artwork never reverses direction
 // halfway through a downward scroll just because a retention easing accelerated.
 const carry=useTransform([progress,sceneHeight,width],([p,h,w]) => .95*(p-.12*(1-Math.exp(-p/.12)))*h*1536/Math.max(1,w));
 const floatingSpeed=useTransform(opening,[0,1],[1,.16]);
 const atmosphere=useTransform(opening,p => smooth((p-.2)/.65));
 const value=useMemo(() => ({hero,scrollY,progress,opening,handoff,carry,floatingSpeed,atmosphere}),[scrollY,progress,opening,handoff,carry,floatingSpeed,atmosphere]);
 return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}

export function HeroSection({children,...props}) {
 const {hero,handoff,atmosphere}=useHeroTransition();
 const reduced=useReducedMotion();
 const visible=useInView(hero,{margin:'220px 0px 0px 0px'});
 const bridgeOpacity=useTransform(handoff,p => Math.sin(Math.PI*p)*.72);
 const bridgeY=useTransform(handoff,[0,1],[14,-14]);
 const pulse=useTransform(handoff,[0,1],[0,-420]);
 return <section {...props} ref={hero} data-handoff-enabled={!reduced}>
  {!reduced && <motion.div className="rm-hero-atmosphere-blend" aria-hidden="true" style={{opacity:atmosphere}}/>}
  {children}
  {!reduced && <motion.svg className="rm-scene-bridge" viewBox="0 0 1536 320" preserveAspectRatio="none" aria-hidden="true" style={{opacity:bridgeOpacity,y:bridgeY}} data-active={visible}>
   <g fill="none" stroke="#578eff" strokeWidth=".8" strokeOpacity=".32">
    <path d="M900 0 1020 80H1270L1360 170V250L1430 320M510 0 650 95H970L1075 200H1220L1340 320"/>
   </g>
   <motion.path d="M900 0 1020 80H1270L1360 170V250L1430 320" fill="none" stroke="#bddbff" strokeWidth="1.4" strokeDasharray="9 410" style={{strokeDashoffset:pulse}}/>
   <g fill="#bddbff" opacity=".4"><circle cx="1020" cy="80" r="1.8"/><circle cx="1075" cy="200" r="1.8"/><circle cx="1360" cy="250" r="1.8"/></g>
  </motion.svg>}
 </section>;
}

export function EcosystemArrivalAtmosphere({progress}) {
 const {atmosphere}=useHeroTransition();
 const reduced=useReducedMotion();
 const opacity=useTransform([atmosphere,progress],([blend,p]) => blend*(1-smooth(p/.3)));
 return reduced ? null : <motion.div className="rm-ecosystem-atmosphere-blend" aria-hidden="true" style={{opacity}}/>;
}
