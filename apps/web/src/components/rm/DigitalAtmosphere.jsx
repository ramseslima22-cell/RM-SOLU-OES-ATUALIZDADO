import React, { useLayoutEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import './DigitalAtmosphere.css';

const routePoints = [
 [[40,190],[270,190],[350,110],[650,110],[735,195],[1040,195],[1120,115],[1500,115]],
 [[15,610],[260,610],[365,505],[700,505],[815,390],[1150,390],[1270,270],[1520,270]],
 [[580,735],[730,585],[1000,585],[1090,495],[1380,495],[1500,615]],
 [[960,30],[960,175],[1070,285],[1370,285],[1470,385],[1470,720]],
];
const routes = routePoints.map(points => points.map(([x,y],i) => `${i ? 'L' : 'M'}${x} ${y}`).join(''));
const signals = routePoints.map(points => {
 let length=0;
 const segments=points.slice(1).map(([x,y],i) => {
  const [left,top]=points[i], width=Math.hypot(x-left,y-top);
  const segment={left,top,width,start:length,angle:Math.atan2(y-top,x-left)*180/Math.PI};
  length+=width;
  return segment;
 });
 return {length,segments};
});
const nodes = [[270,190],[650,110],[1040,195],[365,505],[700,505],[1150,390],[1000,585],[1380,495],[1070,285]];

function NetworkSignals() {
 const host=useRef(null), space=useRef(null);
 useLayoutEffect(() => {
  // Match the original SVG's xMidYMid slice, only when its viewport resizes.
  const resize=({width,height}) => {
   const scale=Math.max(width/1536,height/774);
   space.current.style.transform=`translate(${(width-1536*scale)/2}px, ${(height-774*scale)/2}px) scale(${scale})`;
  };
  resize(host.current.getBoundingClientRect());
  const observer=new ResizeObserver(([entry]) => resize(entry.contentRect));
  observer.observe(host.current);
  return () => observer.disconnect();
 },[]);
 return <div ref={host} className="rm-ambient-signals"><div ref={space} className="rm-ambient-signal-space">
  {signals.map(({length,segments},i) => <div key={i} className={`rm-ambient-signal-route rm-ambient-pulse-${i}`} style={{'--pulse-duration':`${23+i*4}s`,'--pulse-delay':`${-i*7}s`}}>
   {segments.map(({left,top,width,start,angle},j) => <div key={j} className="rm-ambient-signal-segment" style={{left,top:top-.9,width,transform:`rotate(${angle}deg)`}}>
    {/* Each clipped segment shows the same .65/100 dash moving along the path.
        Only tiny cached strips translate; no SVG dash property repaints a scene.
        The second strip preserves the partial dash across the closed time loop. */}
    {(j===0 ? [0,1] : [0]).map(wrap => <i key={wrap} className="rm-ambient-pulse" style={{width:length*.0065,'--pulse-from':`${-start-wrap*length}px`,'--pulse-to':`${length-start-wrap*length}px`}}/>)}
   </div>)}
  </div>)}
 </div></div>;
}

export default function DigitalAtmosphere({ variant = 'hero', progress, handoff, cursorX, cursorY, desktop, active }) {
 const reduced = useReducedMotion();
 const zero = useMotionValue(0);
 const far = useTransform([progress,handoff ?? zero],([p,h]) => variant === 'hero' ? -6*p-4*h : 8-16*p);
 const near = useTransform([progress,handoff ?? zero],([p,h]) => variant === 'hero' ? -14*p-8*h : 18-36*p);
 const pointer = useTransform([cursorX ?? zero,cursorY ?? zero],([x,y]) => `translate3d(${x*.5}px, ${y*.5}px, 0px)`);
 const moving = desktop && !reduced;
 return <div className={`rm-ambient-host rm-ambient-${variant}`} aria-hidden="true">
  <div className="rm-ambient" data-running={active && !reduced}>
   <motion.div className="rm-ambient-light-plane" style={moving ? {y:far} : undefined}><div className="rm-ambient-glow"/></motion.div>
   <motion.div className="rm-ambient-network-plane" style={moving ? {y:near} : undefined}>
    <motion.div className="rm-ambient-pointer-plane" style={moving && variant === 'hero' ? {transform:pointer} : undefined}>
    <svg className="rm-ambient-network" viewBox="0 0 1536 774" preserveAspectRatio="xMidYMid slice" fill="none">
     <g className="rm-ambient-grid"><path d="M0 774 690 350M250 774 725 350M500 774 760 350M768 774V350M1036 774 800 350M1286 774 835 350M1536 774 870 350M0 740H1536M85 645H1451M240 560H1296M385 490H1151M510 430H1026M610 385H926"/></g>
     <g className="rm-ambient-routes">{routes.map(d => <path key={d} d={d}/>)}</g>
     <g className="rm-ambient-nodes">{nodes.map(([cx,cy]) => <g key={cx}><circle cx={cx} cy={cy} r="7" fillOpacity=".09"/><circle cx={cx} cy={cy} r="1.7"/></g>)}</g>
     <g className="rm-ambient-geometry"><path d="m1140 65 160 30-45 110-160-30Zm-20 20 160 30M1095 175l25-90m160 30-25 90M80 420l110-45 75 65-110 45Zm75 65v75l110-45v-75M80 420v75l75 65"/></g>
     <g className="rm-ambient-data"><path d="M65 90h78m-78 8h42m-42 8h60M1330 665h110m-110 8h70m-70 8h90M420 690h55m8 0h8m8 0h8M1450 175v45m-5-45h10m-10 45h10"/><text x="65" y="78">RM / SYS.01</text><text x="1330" y="650">LINK / 004</text></g>
    </svg>
    {!reduced && <NetworkSignals/>}
    </motion.div>
   </motion.div>
  </div>
 </div>;
}
