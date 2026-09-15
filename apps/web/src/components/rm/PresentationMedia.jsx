import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Globe, ShoppingBag, Workflow, Layers } from 'lucide-react';
const chapters = [
 ['Sites', 'Uma presença à altura da sua ideia.', 'Sua marca ganha um lugar próprio no digital.', Globe],
 ['Lojas virtuais', 'Da descoberta à próxima compra.', 'Uma experiência pensada para apresentar e vender.', ShoppingBag],
 ['Automações', 'Mais fluidez. Menos tarefas manuais.', 'Processos conectados para simplificar a sua rotina.', Workflow],
 ['Soluções digitais', 'Tudo se conecta. Seu negócio evolui.', 'Sites, lojas e automações em um mesmo ecossistema.', Layers],
];
function SceneLayer({ index, progress, reduced }) {
 const opacity = useTransform(progress, [0, .25, .52, .8, 1], index === 0 ? [1,1,1,1,1] : index === 1 ? [0,1,1,1,1] : [0,0,1,1,1]);
 const y = useTransform(progress, [0, .4, 1], [index*12, index*-35, index*-66]);
 const x = useTransform(progress, [0,1], [0,index*36]);
 return <motion.div className={`ecosystem-layer layer-${index}`} style={reduced ? {} : {opacity,y,x,z:index*65}}>
  <div className="layer-toolbar"><span>RM / {['PRESENÇA','COMÉRCIO','CONEXÕES'][index]}</span><ArrowUpRight size={16}/></div>
  {index === 0 ? <div className="scene-site"><span className="scene-eyebrow">SUA PRÓXIMA POSSIBILIDADE</span><strong>Sua ideia.<br/><em>No digital.</em></strong><div className="scene-lines"><i/><i/></div><span className="scene-button">Começar <ArrowUpRight size={15}/></span></div> : index === 1 ? <div className="scene-products">{[1,2,3].map(n=><div key={n}><ShoppingBag strokeWidth={1}/><span>Catálogo / 0{n}</span></div>)}</div> : <div className="scene-workflow"><span>Entrada</span><i/><Workflow/><i/><span>Ação</span></div>}
 </motion.div>;
}
export default function PresentationMedia() {
 const target = useRef(null);
 const reduced = useReducedMotion();
 const {scrollYProgress} = useScroll({target,offset:['start start','end end']});
 const rotateX = useTransform(scrollYProgress,[0,.5,1],[9,24,12]);
 const rotateY = useTransform(scrollYProgress,[0,1],[-16,-26]);
 const rotateZ = useTransform(scrollYProgress,[0,1],[-4,2]);
 return <section ref={target} className={`ecosystem ${reduced ? 'ecosystem-static' : ''}`} aria-label="O ecossistema RM">
  <div className="ecosystem-stage" aria-hidden="true"><div className="scene-index">RM — ECOSSISTEMA DIGITAL <span>01 → 04</span></div><motion.div className="ecosystem-perspective" style={reduced ? {} : {rotateX,rotateY,rotateZ}}>{[0,1,2].map(index=><SceneLayer key={index} index={index} progress={scrollYProgress} reduced={reduced}/>)}</motion.div><span className="scene-footnote">Uma ideia. Diferentes possibilidades.</span></div>
  <div className="ecosystem-chapters">{chapters.map(([title,headline,description,Icon],index)=><div className="ecosystem-chapter" key={title}><motion.div initial={reduced ? false : {opacity:.25,y:30}} whileInView={{opacity:1,y:0}} viewport={{amount:.6}} transition={{duration:reduced ? 0 : .55}}><p className="section-kicker"><Icon size={17}/> 0{index+1} / {title}</p><h2>{headline}</h2><p>{description}</p>{index === 3 && <a className="editorial-link" href="#solucoes">Explore as soluções <ArrowDown size={17}/></a>}</motion.div></div>)}</div>
 </section>;
}


export function HeroMedia({ progress }) {
 const reduced = useReducedMotion();
 const scene = useRef(null);
 const visible = useInView(scene);
 const [desktop, setDesktop] = useState(false);
 useEffect(() => {
  const query = window.matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine)');
  const update = () => setDesktop(query.matches);
  update(); query.addEventListener('change', update);
  return () => query.removeEventListener('change', update);
 }, []);
 const pointerX = useMotionValue(0), pointerY = useMotionValue(0);
 const rotateY = useSpring(pointerX, { stiffness:75, damping:22 });
 const rotateX = useSpring(pointerY, { stiffness:75, damping:22 });
 const y = useTransform(progress,[0,1],[0,100]);
 const rotate = useTransform(progress,[0,1],[0,-5]);
 const scale = useTransform(progress,[0,1],[1,.9]);
 const drift = !reduced && desktop && visible;
 const move = e => {
  if(reduced || !desktop || e.pointerType !== 'mouse') return;
  const rect=e.currentTarget.getBoundingClientRect();
  pointerX.set(((e.clientX-rect.left)/rect.width-.5)*7);
  pointerY.set(-((e.clientY-rect.top)/rect.height-.5)*5);
 };
 const entrance={hidden:{opacity:0,y:reduced?0:32},visible:{opacity:1,y:0}};
 const card=(className,index,children)=><motion.div className={className} variants={entrance} transition={{duration:reduced?0:.75,delay:reduced?0:.18+index*.13}}><motion.div className="hero-device-float" animate={{y:drift?[0,-5,0]:0}} transition={{duration:drift?7+index:0,repeat:drift?Infinity:0,ease:'easeInOut'}}>{children}</motion.div></motion.div>;
 return <motion.div ref={scene} className="hero-technology" aria-hidden="true" onPointerMove={move} onPointerLeave={()=>{pointerX.set(0);pointerY.set(0);}} style={reduced||!desktop?{}:{y,rotate,scale}} initial={reduced?false:'hidden'} animate="visible">
  <div className="hero-tech-grid"/><span className="hero-tech-caption">IDEIA → EXPERIÊNCIA → CONEXÃO</span>
  <motion.div className="hero-tech-depth" style={reduced||!desktop?{}:{rotateX,rotateY}}>
   {card('hero-laptop',0,<><div className="hero-laptop-screen"><div className="mockup-toolbar"><Globe size={15}/><span>RM / SITES PROFISSIONAIS</span><span>— &nbsp; □</span></div><div className="mockup-site"><span>TECNOLOGIA COM PROPÓSITO</span><strong>Sua ideia.<br/>Nossa <em>tecnologia.</em></strong><p>Uma presença digital feita para o seu negócio.</p><span className="mockup-action">Conhecer <ArrowUpRight size={13}/></span><div className="mockup-sculpture"><i/><i/><i/></div></div></div><div className="hero-laptop-base"/></>)}
   {card('hero-phone',1,<><div className="phone-speaker"/><div className="mockup-toolbar"><ShoppingBag size={14}/><span>LOJA VIRTUAL</span></div><strong>Uma nova<br/>forma de <em>vender.</em></strong><div className="phone-product"><ShoppingBag strokeWidth={.8}/></div><div className="phone-swatches"><i/><i/><i/></div><span className="mockup-action">Explorar catálogo <ArrowUpRight size={12}/></span></>)}
   {card('hero-automation',2,<><div className="mockup-toolbar"><Workflow size={18}/><strong>Automações</strong></div><div className="automation-steps">{['Receber informações','Organizar tarefas','Conectar processos'].map((text,index)=><div key={text}><span>{index+1}</span>{text}</div>)}</div><span className="automation-caption">Mais fluidez no dia a dia</span></>)}
   {card('hero-tech-note',3,<><Layers size={22}/><div><strong>Soluções conectadas</strong><span>Seu próximo passo no digital.</span></div><ArrowUpRight size={17}/></>)}
  </motion.div>
 </motion.div>;
}
