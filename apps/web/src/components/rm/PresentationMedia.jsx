import React, { useRef } from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Globe, ShoppingBag, Workflow, Layers, Zap, MessageSquare, Contact } from 'lucide-react';
import RmLogo from './RmLogo';
import DigitalAtmosphere from './DigitalAtmosphere';
import { EcosystemArrivalAtmosphere, useHeroTransition } from './HeroTransition';
import { HeroObject, HeroScenery, useFineMotion, FloatingLayer, useHeroMotion, useSceneActive, useSceneScroll } from './HeroMotion';
const chapters = [
 ['Sites', 'Uma presença à altura da sua ideia.', 'Sua marca ganha um lugar próprio no digital.', Globe],
 ['Lojas virtuais', 'Da descoberta à próxima compra.', 'Uma experiência pensada para apresentar e vender.', ShoppingBag],
 ['Automações', 'Mais fluidez. Menos tarefas manuais.', 'Processos conectados para simplificar a sua rotina.', Workflow],
 ['Soluções digitais', 'Tudo se conecta. Seu negócio evolui.', 'Sites, lojas e automações em um mesmo ecossistema.', Layers],
];

// Monotone cubic Hermite tracks: continuous velocity, no overshoot and no spring catch-up.
// Tangents are precomputed once; all layers and the camera read the same native scroll progress.
function track(stops,values) {
 const widths = stops.slice(1).map((t,i) => t-stops[i]);
 const slopes = widths.map((width,i) => (values[i+1]-values[i])/width);
 const tangents = values.map((_,i) => {
  if (i===0 || i===values.length-1 || slopes[i-1]*slopes[i]<=0) return 0;
  const a=2*widths[i]+widths[i-1], b=widths[i]+2*widths[i-1];
  return (a+b)/(a/slopes[i-1]+b/slopes[i]);
 });
 return progress => {
  const p=Math.max(stops[0],Math.min(stops.at(-1),progress));
  let i=0;
  while(i<stops.length-2 && p>stops[i+1]) i++;
  const t=(p-stops[i])/widths[i], t2=t*t, t3=t2*t;
  return (2*t3-3*t2+1)*values[i]+(t3-2*t2+t)*widths[i]*tangents[i]+(-2*t3+3*t2)*values[i+1]+(t3-t2)*widths[i]*tangents[i+1];
 };
}
const beats = [0,.28,.62,1];
const camera = {
 x:track(beats,[9,18,24,12]), y:track(beats,[-16,-21,-26,-26]),
 z:track(beats,[-4,-2,0,2]), depth:track(beats,[0,12,24,0]),
};
const layers = [0,1,2].map(index => ({
 x:track(beats,[0,index*12,index*25,index*36]),
 y:track(beats,[index*12,index*-22,index*-47,index*-66]),
 z:track(beats,[index*65,index*65+(index===1?22:-8),index*65+(index===2?28:-12),index*65]),
 scale:track(beats,index===0?[1,1.025,.98,1]:index===1?[.98,1.04,1,1]:[.97,.98,1.05,1]),
 rotate:track(beats,[0,index===1?-3:2,index===2?-3:1,0]),
 opacity:index===0?track(beats,[1,.88,.8,1]):index===1?track([0,.28,.62,1],[0,1,.88,1]):track([0,.14,.5,.72,1],[0,0,.88,1,1]),
}));
function SceneLayer({ index,progress,reduced,desktop,visible }) {
 const tracks=layers[index];
 const transform=useTransform(progress,p => desktop
  ? `translate3d(${tracks.x(p)}px, ${tracks.y(p)}px, ${tracks.z(p)}px) rotateY(${tracks.rotate(p)}deg) scale(${tracks.scale(p)})`
  : `translate3d(${tracks.x(p)*.55}px, ${tracks.y(p)}px, 0px) scale(${1+(tracks.scale(p)-1)*.35})`);
 const opacity=useTransform(progress,tracks.opacity);
 return <motion.div className="rm-ecosystem-plane" style={reduced ? undefined : {transform}}>
  <FloatingLayer index={index+1} desktop={desktop} reduced={reduced} visible={visible}>
   <motion.div className={`ecosystem-layer layer-${index}`} style={reduced ? undefined : {opacity}}>
    <div className="layer-toolbar"><span>RM / {['PRESENÇA','COMÉRCIO','CONEXÕES'][index]}</span><ArrowUpRight size={16}/></div>
    {index===0 ? <div className="scene-site"><span className="scene-eyebrow">SUA PRÓXIMA POSSIBILIDADE</span><strong>Sua ideia.<br/><em>No digital.</em></strong><div className="scene-lines"><i/><i/></div><span className="scene-button">Começar <ArrowUpRight size={15}/></span></div> : index===1 ? <div className="scene-products">{[1,2,3].map(n=><div key={n}><ShoppingBag strokeWidth={1}/><span>Catálogo / 0{n}</span></div>)}</div> : <div className="scene-workflow"><span>Entrada</span><i/><Workflow/><i/><span>Ação</span></div>}
   </motion.div>
  </FloatingLayer>
 </motion.div>;
}
function SceneChapter({ index,progress,reduced,children }) {
 const opacity=useTransform(progress,p => .65+.35*Math.exp(-(((p-beats[index])/.38)**2)));
 return <motion.div style={reduced ? undefined : {opacity}}>{children}</motion.div>;
}
export default function PresentationMedia() {
 const target=useRef(null), stage=useRef(null);
 const reduced=useReducedMotion(), desktop=useFineMotion();
 const visible=useSceneActive(stage);
 const {progress}=useSceneScroll(target,true);
 const {handoff}=useHeroTransition();
 const transform=useTransform([progress,handoff],([p,h]) => `translate3d(0px, ${18*(1-h)}px, ${camera.depth(p)-48*(1-h)}px) rotateX(${camera.x(p)}deg) rotateY(${camera.y(p)}deg) rotateZ(${camera.z(p)}deg) scale(${.97+.03*h})`);
 return <section ref={target} className={`ecosystem ${reduced?'ecosystem-static':''}`} data-motion-active={visible && !reduced} aria-label="O ecossistema RM">
  <EcosystemArrivalAtmosphere progress={progress}/>
  <DigitalAtmosphere variant="ecosystem" progress={progress} handoff={handoff} active={visible} desktop={desktop}/>
  <div ref={stage} className="ecosystem-stage" aria-hidden="true"><div className="scene-index">RM — ECOSSISTEMA DIGITAL <span>01 → 04</span></div><motion.div className="ecosystem-perspective" style={reduced || !desktop ? undefined : {transform}}>{[0,1,2].map(index=><SceneLayer key={index} index={index} progress={progress} reduced={reduced} desktop={desktop} visible={visible}/>)}</motion.div><span className="scene-footnote">Uma ideia. Diferentes possibilidades.</span></div>
  <div className="ecosystem-chapters">{chapters.map(([title,headline,description,Icon],index)=><div className="ecosystem-chapter" key={title}><SceneChapter index={index} progress={progress} reduced={reduced}><p className="section-kicker"><Icon size={17}/> 0{index+1} / {title}</p><h2>{headline}</h2><p>{description}</p>{index===3 && <a data-rm-cta="" className="editorial-link" href="#solucoes"><span className="rm-cta-label">Explore as soluções </span><ArrowDown size={17}/></a>}</SceneChapter></div>)}</div>
 </section>;
}
function HeroBrand({ x, y, width=48, light=false }) {
 return <svg x={x} y={y} width={width} height={width*.45} viewBox="220 110 1500 670" className={light?'rm-hero-brand-light':undefined}><image href="/rm-logo.png" width="1942" height="809"/></svg>;
}
function HeroShoe({x=0,y=0}) {
 return <g transform={`translate(${x} ${y})`}><ellipse cx="53" cy="64" rx="40" ry="7" fill="#8e9bad" opacity=".22"/><path d="M10 53 26 44 40 21 47 4 60 8 66 27 74 38 91 46Q102 48 100 58L91 65Q50 77 8 63L5 57Z" fill="url(#rm-shoe)" stroke="#5f6e86"/><path d="M7 57Q48 72 100 55L94 65Q51 79 8 65Z" fill="#495973" stroke="#7c889d" strokeWidth=".6"/><path d="m37 27 22 7m-27 1 23 7m-28 0 22 7M47 7l8 15 12 6M18 51q33 18 67-3" stroke="#7b879b" strokeWidth="1.5"/><path d="m16 65 2 4m10-2 1 5m12-3v5m12-5v4m12-6-1 5m12-7-2 5m12-8-2 5" stroke="#162134"/></g>;
}
export function HeroMedia() {
 return <div className="rm-hero-art" aria-hidden="true"><svg viewBox="0 0 1536 774" fill="none" className="rm-hero-canvas">
 <defs>
  <linearGradient id="rm-bezel" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#39414e"/><stop offset=".18" stopColor="#101620"/><stop offset=".72" stopColor="#090e16"/><stop offset="1" stopColor="#303946"/></linearGradient>
  <linearGradient id="rm-keycap" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#4b5667"/><stop offset=".28" stopColor="#293342"/><stop offset="1" stopColor="#101824"/></linearGradient>
  <linearGradient id="rm-phone-rail"><stop stopColor="#304b74"/><stop offset=".2" stopColor="#c2d5ef"/><stop offset=".38" stopColor="#7896bd"/><stop offset=".65" stopColor="#334e77"/><stop offset="1" stopColor="#a9c0df"/></linearGradient>
  <linearGradient id="rm-phone-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset=".6" stopColor="#f9fbff"/><stop offset="1" stopColor="#eaf0f9"/></linearGradient>
  <linearGradient id="rm-product-surface" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#dce4f0"/><stop offset=".5" stopColor="#eef2f8"/><stop offset="1" stopColor="#e0e7f2"/></linearGradient>
  <linearGradient id="rm-electric" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3579ff"/><stop offset=".45" stopColor="#0751ff"/><stop offset="1" stopColor="#0033dc"/></linearGradient>
  <linearGradient id="rm-button-white" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#e1e8f4"/></linearGradient>
  <linearGradient id="rm-metal" x1="729" y1="533" x2="905" y2="659" gradientUnits="userSpaceOnUse"><stop stopColor="#737f90"/><stop offset=".2" stopColor="#bdc7d5"/><stop offset=".34" stopColor="#f0f3f8"/><stop offset=".58" stopColor="#cbd3df"/><stop offset=".8" stopColor="#aeb9c9"/><stop offset=".95" stopColor="#e0e6ef"/><stop offset="1" stopColor="#778496"/></linearGradient>
  <linearGradient id="rm-screen" x1="932" y1="155" x2="1147" y2="553" gradientUnits="userSpaceOnUse"><stop stopColor="#2d323d"/><stop offset=".3" stopColor="#1b222e"/><stop offset=".76" stopColor="#101722"/><stop offset="1" stopColor="#080f1b"/></linearGradient>
  <linearGradient id="rm-crystal"><stop stopColor="#071326"/><stop offset=".19" stopColor="#879fbf"/><stop offset=".29" stopColor="#c1d8ef"/><stop offset=".39" stopColor="#263e65"/><stop offset=".56" stopColor="#091b3e"/><stop offset=".76" stopColor="#1456e9"/><stop offset=".86" stopColor="#769bdf"/><stop offset="1" stopColor="#102448"/></linearGradient>
  <linearGradient id="rm-crystal-face"><stop stopColor="#0a1428"/><stop offset=".45" stopColor="#254d98"/><stop offset=".7" stopColor="#497ef4"/><stop offset="1" stopColor="#07142c"/></linearGradient>
  <linearGradient id="rm-card" x1="0" y1="0" x2=".7" y2="1"><stop stopColor="#fff" stopOpacity=".98"/><stop offset=".45" stopColor="#f8faff" stopOpacity=".96"/><stop offset="1" stopColor="#e3ebff" stopOpacity=".93"/></linearGradient>
  <linearGradient id="rm-shoe" x2="1" y2="1"><stop stopColor="#66748a"/><stop offset=".4" stopColor="#26354d"/><stop offset="1" stopColor="#0d1729"/></linearGradient>
  <linearGradient id="rm-rock" x2=".5" y2="1"><stop stopColor="#6b7788"/><stop offset=".3" stopColor="#273342"/><stop offset="1" stopColor="#050a12"/></linearGradient>
  <radialGradient id="rm-blue-halo"><stop stopColor="#004cff" stopOpacity=".28"/><stop offset="1" stopColor="#004cff" stopOpacity="0"/></radialGradient>
  <filter id="rm-soft-shadow" x="-40%" y="-50%" width="190%" height="230%"><feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#101d36" floodOpacity=".23"/><feDropShadow dx="8" dy="20" stdDeviation="16" floodColor="#163979" floodOpacity=".19"/></filter>
  <filter id="rm-card-shadow" x="-40%" y="-60%" width="190%" height="240%"><feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#516da8" floodOpacity=".2"/><feDropShadow dx="3" dy="16" stdDeviation="12" floodColor="#0653ef" floodOpacity=".17"/></filter>
  <filter id="rm-rock-texture"><feTurbulence type="fractalNoise" baseFrequency=".13" numOctaves="3" seed="8" result="noise"/><feColorMatrix in="noise" type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in"/><feBlend in="SourceGraphic" mode="multiply"/></filter>
  <clipPath id="rm-screen-clip"><path d="m929 207 348-83-58 384-354 11Z"/></clipPath>
 </defs>
 <g className="rm-hero-guides"><ellipse cx="1100" cy="525" rx="420" ry="235" fill="url(#rm-blue-halo)"/><path d="m779 57 697 510M662 459l660-286M805 459l700 240M1230 66l-7 235" stroke="#a7bbec" strokeWidth="1" opacity=".45"/><path d="m590 539 946-360v329L999 774H659Z" fill="#c7d5fb" opacity=".16"/><path d="m1449 479 60 70" stroke="white"/><text x="1400" y="79" transform="rotate(-5 1400 79)" fill="#aeb6c6" fontSize="11" letterSpacing="2"><tspan x="1400">IDEIAS</tspan><tspan x="1400" dy="21">SITES</tspan><tspan x="1400" dy="21">LOJAS VIRTUAIS</tspan><tspan x="1400" dy="21">AUTOMAÇÕES</tspan><tspan x="1400" dy="21">RESULTADOS</tspan></text></g>
 <HeroObject index={0}> <g className="rm-hero-notebook" filter="url(#rm-soft-shadow)">
  <path d="M920 189 1281 99Q1299 95 1297 113L1238 521Q1236 533 1225 536L844 545 906 209Q908 194 920 189Z" fill="#aab4c5"/>
  <path d="M918 192 1280 101Q1295 98 1293 114L1234 521Q1232 530 1222 532L843 541 906 209Q908 197 918 192Z" fill="url(#rm-bezel)" stroke="#78879d" strokeWidth=".85"/>
  <path d="m929 207 348-83-58 384-354 11Z" fill="url(#rm-screen)" stroke="#7e91af" strokeOpacity=".32" strokeWidth=".75"/><path d="m920 193 361-91q10-3 10 8" stroke="#dce9fb" strokeOpacity=".5" strokeWidth=".8"/><ellipse cx="1100" cy="158" rx="2.3" ry="1.7" fill="#415570"/><circle cx="1100" cy="158" r=".8" fill="#101b2b"/>
  <g clipPath="url(#rm-screen-clip)">
   <g className="rm-notebook-content" transform="matrix(.89 -.21 -.16 .94 944 231)"><HeroBrand x={0} y={0} width={48} light/><g fill="#d4dce9" fontSize="6" fontWeight="500"><text x="72" y="11">Seu negócio</text><text x="133" y="11">Projetos</text><text x="180" y="11">Digital</text><text x="223" y="11">Planos</text><text x="266" y="11">Suporte</text><text x="315" y="11">☰</text></g><text x="0" y="115" fill="white" fontSize="32" fontWeight="650" letterSpacing="-1.4"><tspan x="0" textLength="165" lengthAdjust="spacingAndGlyphs">Seu projeto</tspan><tspan x="0" dy="35" textLength="198" lengthAdjust="spacingAndGlyphs">em <tspan fill="#0750ff">boas mãos.</tspan></tspan></text><text x="0" y="173" fill="#c9d3e3" fontSize="9">Estratégia. Design. Tecnologia.</text><rect x="0" y="200" width="115" height="42" rx="5" fill="url(#rm-button-white)" stroke="#fff" strokeWidth=".7"/><text x="15" y="225" fill="#131925" fontSize="10" fontWeight="600">Começar agora</text><path d="m94 221 9 0m-4-4 4 4-4 4" stroke="#131925"/></g>
   <g className="rm-notebook-crystal" transform="translate(202 49) scale(.84)"><path d="M1141 233Q1163 213 1177 241L1209 318Q1220 343 1211 382L1191 492Q1187 515 1165 527L1114 520Q1090 508 1090 481L1088 417Q1088 390 1104 373L1093 331Q1086 306 1105 279Z" fill="url(#rm-crystal)" stroke="#8cace1"/>
   <path d="m1155 228 21 30 24 70Q1209 350 1198 382L1178 484 1165 527 1144 505 1159 421Q1168 393 1151 363L1123 321Q1116 303 1131 274Z" fill="url(#rm-crystal-face)" stroke="#bbd3ff" strokeOpacity=".35"/>
   <path d="m1105 281q-14 21-1 46l21 42q8 20-7 40l-18 19 6 62 10 31-17-9-9-30-2-65q0-25 16-44l-11-42q-8-24 12-50Z" fill="url(#rm-crystal)"/><path d="m1157 232q5 28 23 59l19 53m-97 29q25 5 22 23" stroke="#c5dfff" strokeOpacity=".5" strokeWidth="2"/>
   </g>
   <path d="m886 480 320-31m-334 54 330-30m-279 39 29-49m117 49 16-62" stroke="#5781c3" strokeOpacity=".22"/>
  </g>
  <path d="m847 536 387-8-364 112q-18 5-38 1l-223-36-3-8Z" fill="#929caa"/><path d="m847 532 387-8-364 108q-20 6-37 2l-227-37Z" fill="url(#rm-metal)" stroke="#dce2ec"/>
  <path d="m859 537 334-7-206 56-262-15Z" fill="#505f73" stroke="#a8b5c7" strokeWidth=".6"/>
  {Array.from({length:5},(_,row)=>Array.from({length:14},(_,col)=>{const x=861-row*23+col*(23-row*.55),y=538+row*7;return <path key={row+'-'+col} d={`M${x} ${y}l${21-row*.55} -.4 -19 5.1 -${21-row*.55} .4Z`} fill="url(#rm-keycap)" stroke="#8c9aaf" strokeWidth=".45"/>;}))}
  <path d="m820 586 110 6-70 26-107-18Z" fill="url(#rm-metal)" stroke="#8493a9"/><path d="m615 599 218 36q18 4 37-2l342-103" stroke="#eff3f9"/><path d="m851 532 373-8" stroke="#070c14" strokeWidth="5"/>
 </g>
 </HeroObject><HeroObject index={1}>
 <g className="rm-hero-phone-placement">
 <g className="rm-hero-phone" transform="translate(703 250) rotate(-19 75 150)" filter="url(#rm-soft-shadow)">
  <rect x="-8" y="3" width="156" height="316" rx="24" fill="url(#rm-phone-rail)" stroke="#d4e4fb" strokeWidth="2"/><path d="M-9 54v32m0 12v37" stroke="#9eb6e1" strokeWidth="4"/>
  <rect x="-2" y="0" width="153" height="316" rx="23" fill="#0b111c" stroke="#d7e0ef" strokeWidth="2"/><rect x="3" y="5" width="143" height="306" rx="19" fill="url(#rm-phone-glass)" stroke="white" strokeWidth=".6"/>
  <path d="M8 48V26Q8 10 24 10h19M141 266v25q0 14-14 14" stroke="white" strokeOpacity=".8" strokeWidth="1.2"/>
  <rect x="51" y="10" width="43" height="11" rx="6" fill="#080b11"/><circle cx="85" cy="15.5" r="2" fill="#243955"/>
  <HeroBrand x={16} y={30} width={43}/><path d="M123 38h9m-9 3h9m-9 3h9" stroke="#8992a2"/>
  <text x="16" y="91" fill="#10151f" fontSize="23" fontWeight="700" letterSpacing="-1.2"><tspan x="16">Lojas para</tspan><tspan x="16" dy="23">vender</tspan><tspan x="16" dy="23" fill="#0649ff">no digital.</tspan></text>
  <rect x="14" y="153" width="98" height="89" rx="8" fill="url(#rm-product-surface)" stroke="#fff" strokeWidth=".8"/><HeroShoe x={15} y={162}/><text x="98" y="166" fontSize="12" fill="#8d9bad">♡</text>
  <rect x="119" y="153" width="25" height="89" rx="7" fill="url(#rm-product-surface)" stroke="#fff" strokeWidth=".8"/><text x="127" y="169" fontSize="11" fill="#8d9bad">♡</text><path d="m126 189 13 0 2 24h-17Z" stroke="#b8c4d7"/><path d="M129 189v-4a3 3 0 0 1 6 0v4" stroke="#b8c4d7"/>
  <rect x="24" y="254" width="92" height="27" rx="5" fill="url(#rm-electric)"/><text x="70" y="272" textAnchor="middle" fontSize="10" fontWeight="600" fill="white">Comprar</text><rect x="52" y="300" width="43" height="3" rx="2" fill="#bdc6d5"/>
 </g>
 </g>
 </HeroObject><HeroObject index={2}>
 <g className="rm-hero-top-card-placement">
 <g className="rm-hero-top-card" transform="translate(837 73) rotate(-4)" filter="url(#rm-card-shadow)"><rect x="2" y="4" width="240" height="73" rx="12" fill="#b9c9fa"/><rect width="240" height="73" rx="12" fill="url(#rm-card)" stroke="white" strokeWidth="1.6"/><rect x="11" y="12" width="41" height="44" rx="9" fill="url(#rm-electric)"/><g transform="translate(23 25)"><ShoppingBag size={18} color="white" strokeWidth={1.4}/></g><text x="67" y="29" fill="#111722" fontSize="14">Lojas virtuais</text><text x="67" y="49" fill="#111722" fontSize="14">para o seu negócio</text><path d="m205 43 12-12m-10 0h10v10" stroke="#0750ff" strokeWidth="1.5"/></g>
 </g>
 </HeroObject><HeroObject index={3}>
 <g className="rm-hero-automation-placement">
 <g className="rm-hero-automation" transform="translate(1262 194) rotate(10)" filter="url(#rm-card-shadow)"><rect x="3" y="5" width="238" height="251" rx="15" fill="#b8c9fc"/><rect width="238" height="251" rx="15" fill="url(#rm-card)" stroke="white" strokeWidth="1.6"/><rect x="24" y="21" width="29" height="31" rx="7" fill="url(#rm-electric)"/><g transform="translate(31 28)"><Zap size={15} color="white"/></g><text x="69" y="42" fill="#171c28" fontSize="12" fontWeight="600">Automações</text><path d="M43 83v126" stroke="#89aaff"/>{[['Receber informações',Globe],['Mensagem automática',MessageSquare],['Organizar contatos',Contact],['Conectar processos',Workflow]].map(([label,Icon],i)=><g key={label} transform={`translate(0 ${78+i*42})`}><circle cx="43" cy="7" r="3.5" fill="#3870ff"/><rect x="67" y="-5" width="154" height="30" rx="5" fill="#e8eef9" fillOpacity=".72" stroke="#fff" strokeOpacity=".8" strokeWidth=".65"/><g transform="translate(77 3)"><Icon size={14} color="#2b354b" strokeWidth={1.4}/></g><text x="101" y="13" fontSize="8.5" fill="#52617a">{label}</text></g>)}</g>
 </g>
 </HeroObject><HeroObject index={4}>
 <g className="rm-hero-lower-card-placement">
 <g className="rm-hero-lower-card" transform="translate(1158 477) rotate(8)" filter="url(#rm-card-shadow)"><rect x="2" y="4" width="256" height="161" rx="15" fill="#b3c8ff"/><rect width="256" height="161" rx="15" fill="url(#rm-card)" stroke="white" strokeWidth="1.6"/><text x="24" y="31" fill="#141b29" fontSize="12" fontWeight="600">Processos conectados</text><rect x="181" y="17" width="53" height="23" rx="9" fill="#d7f0e8"/><text x="208" y="33" fill="#10ad84" textAnchor="middle" fontSize="12">RM</text>{[17,30,20,12,30,40,24,35,47,49,63,78,91].map((height,i)=><rect key={i} x={28+i*15} y={132-height*.78} width="6" height={height*.78} rx="2" fill="#0750ff" opacity={.25+i*.06}/>)}</g>
 </g></HeroObject>
 <HeroScenery><g className="rm-hero-ground"><path d="M737 774 779 739 844 717 906 674 962 648 1013 660 1077 684 1132 713 1235 732 1288 740 1360 755 1428 774Z" fill="url(#rm-rock)" filter="url(#rm-rock-texture)"/><path d="m888 717 71-66 25 9-31 34 66-15 42 20-75-3-50 28Z" fill="#727f91" opacity=".19"/><ellipse cx="1090" cy="709" rx="88" ry="17" fill="url(#rm-blue-halo)"/><text x="1398" y="691" transform="rotate(-12 1398 691)" fill="#a6b0c1" fontSize="9" letterSpacing="2"><tspan x="1398">TECNOLOGIA</tspan><tspan x="1398" dy="15">QUE IMPULSIONA</tspan><tspan x="1398" dy="15">PESSOAS</tspan></text><path d="m1435 644q12 12 17 25" stroke="#98a5b9"/></g>
 </HeroScenery></svg></div>;
}

export function HeroAtmosphere() {
 const { progress,handoff,x,y,desktop,visible } = useHeroMotion();
 return <DigitalAtmosphere progress={progress} handoff={handoff} cursorX={x} cursorY={y} desktop={desktop} active={visible}/>;
}
