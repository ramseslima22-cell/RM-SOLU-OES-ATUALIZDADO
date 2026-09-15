import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import RmLogo from './RmLogo';
import { WA_MESSAGES, waLink } from '@/data/rmBrand';
const sections = [['apresentacao','Apresentação'],['solucoes','Soluções'],['projetos','Projetos'],['processo','Processo'],['planos-criacao','Planos'],['suporte','Suporte'],['faq','FAQ'],['contato','Contato']];
export default function SiteHeader() {
 const [open,setOpen] = useState(false);
 const reduced = useReducedMotion();
 const toggle = useRef(null);
 const panel = useRef(null);
 const location = useLocation();
 useEffect(()=>setOpen(false),[location]);
 useEffect(()=>{
  if (!open) return;
  const previous = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  panel.current?.querySelector('a')?.focus();
  const keydown = e => {
   if (e.key === 'Escape') {setOpen(false);toggle.current?.focus();}
   if (e.key === 'Tab') {
    const links = [toggle.current,...panel.current.querySelectorAll('a')];
    const i = links.indexOf(document.activeElement);
    e.preventDefault();links[(i+(e.shiftKey ? -1 : 1)+links.length)%links.length].focus();
   }
  };
  document.addEventListener('keydown',keydown);
  return ()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',keydown);};
 },[open]);
 const navigate = id => {
  setOpen(false);
  requestAnimationFrame(()=>{
   const section=document.getElementById(id);
   if(section){section.setAttribute('tabindex','-1');section.focus({preventScroll:true});section.scrollIntoView({behavior:reduced?'instant':'smooth'});}
  });
 };
 return <header className="rm-header">
  <div className="header-inner"><RmLogo/><span className="header-note">Sua ideia. Nossa tecnologia.</span><nav className="header-horizontal" aria-label="Navegação rápida" inert={open?'':undefined}>{sections.slice(0,7).map(([id,label])=><Link key={id} to={'/#'+id} onClick={()=>navigate(id)} aria-current={location.pathname==='/'&&location.hash==='#'+id?'location':undefined}>{label}</Link>)}</nav><div className="header-actions"><a href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer" className="header-contact">Vamos conversar <ArrowUpRight size={17}/></a><button ref={toggle} type="button" onClick={()=>setOpen(!open)} aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} aria-controls="rm-menu">{open?'Fechar':'Menu'}{open?<X size={20}/>:<Menu size={20}/>}</button></div></div>
  <AnimatePresence>{open && <motion.div id="rm-menu" ref={panel} className="immersive-menu" initial={{opacity:0,y:reduced?0:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-12}} transition={{duration:reduced?0:.25}}><p className="section-kicker">EXPLORE A RM</p><nav aria-label="Navegação principal">{sections.map(([id,label],i)=><motion.div key={id} initial={{opacity:0,x:reduced?0:-18}} animate={{opacity:1,x:0}} transition={{delay:reduced?0:i*.035}}><Link to={`/#${id}`} onClick={()=>navigate(id)}><span>0{i+1}</span>{label}<ArrowUpRight/></Link></motion.div>)}</nav><div className="menu-secondary"><Link to="/sobre">Sobre a RM</Link><Link to="/servicos">Todos os serviços</Link><Link to="/planos">Comparar planos</Link><Link to="/contato">Enviar mensagem</Link></div></motion.div>}</AnimatePresence>
 </header>;
}

