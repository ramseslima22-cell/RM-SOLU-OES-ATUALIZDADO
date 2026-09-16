import React from 'react';
import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import './DigitalAtmosphere.css';

const routes = [
 'M40 190H270L350 110H650L735 195H1040L1120 115H1500',
 'M15 610H260L365 505H700L815 390H1150L1270 270H1520',
 'M580 735L730 585H1000L1090 495H1380L1500 615',
 'M960 30V175L1070 285H1370L1470 385V720',
];
const nodes = [[270,190],[650,110],[1040,195],[365,505],[700,505],[1150,390],[1000,585],[1380,495],[1070,285]];

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
    <svg className="rm-ambient-signals" viewBox="0 0 1536 774" preserveAspectRatio="xMidYMid slice" fill="none">
     {routes.map((d,i) => <path key={d} className={`rm-ambient-pulse rm-ambient-pulse-${i}`} d={d} pathLength="100" style={{ '--pulse-duration': `${23+i*4}s`, '--pulse-delay': `${-i*7}s` }}/>) }
    </svg>
    </motion.div>
   </motion.div>
  </div>
 </div>;
}
