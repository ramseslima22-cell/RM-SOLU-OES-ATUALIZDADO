import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown, Globe, ShoppingCart, Cog, Monitor, Headset, LineChart } from 'lucide-react';
import SiteLayout from '@/components/rm/SiteLayout';
import PageSeo from '@/components/rm/PageSeo';
import PresentationMedia, { HeroMedia } from '@/components/rm/PresentationMedia';
import Reveal from '@/components/Reveal';
import { SERVICES, PROCESS_STEPS, COMMITMENTS, PROJECTS, CREATION_PLANS, FAQ_ITEMS, LAUNCH_NOTE, LAUNCH_SCOPE_NOTE, WA_MESSAGES, waLink } from '@/data/rmBrand';
const icons = [Globe, ShoppingCart, Cog, Monitor, Headset, LineChart];
function FaqItem({item,index}) {
 const [open,setOpen]=useState(false);
 return <div className="faq-row"><button type="button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls={`faq-answer-${index}`}><span>{item.q}</span><ChevronDown size={19} style={{transform:open?'rotate(180deg)':undefined}}/></button>{open && <p id={`faq-answer-${index}`}>{item.a}</p>}</div>;
}
function SectionHeading({number,label,children}) {
 return <><p className="section-kicker">{number} / {label}</p><h2>{children}</h2></>;
}
export default function HomePage() {
 const reduced=useReducedMotion();
 const hero=useRef(null);
 const {scrollYProgress}=useScroll({target:hero,offset:['start start','end start']});
 const heroSurface=useTransform(scrollYProgress,[0,1],['#f5f5f2','#dfe3ef']);
 const seam=useTransform(scrollYProgress,[0,.8],[0,1]);
 const ctaMotion={whileHover:reduced?undefined:{y:-3},whileTap:reduced?undefined:{scale:.98},transition:{duration:.2}};
 return <SiteLayout><PageSeo path="/"/><div className="rm-home">
  <motion.section ref={hero} id="apresentacao" className="editorial-hero hero-composed" style={reduced?{}:{backgroundColor:heroSurface}}><div className="hero-composition">
   <motion.div className="hero-copy" initial={reduced?false:{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.8}}>
    <p className="section-kicker"><span className="brand-dash"/> RM SOLUÇÕES DIGITAIS</p>
    <h1>Seu negócio.<br/>Uma nova <span>dimensão.</span></h1>
    <div className="hero-bottom"><div><p>Seu negócio merece uma presença digital profissional.</p><p>Sites para apresentar sua empresa, lojas para vender e automações para simplificar sua rotina. A RM cuida da tecnologia e acompanha você.</p></div><div className="hero-links"><motion.a {...ctaMotion} href="#planos-criacao" className="editorial-button">Conhecer os planos <ArrowRight size={18}/></motion.a><motion.a {...ctaMotion} href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer" className="editorial-link">Falar com a RM <ArrowRight size={18}/></motion.a></div></div>

   </motion.div>
  <HeroMedia progress={scrollYProgress}/></div>    <div className="hero-caption"><span>SITES · LOJAS VIRTUAIS · AUTOMAÇÃO · SUPORTE</span><motion.a {...ctaMotion} href="#experiencia">Explore ao rolar ↓</motion.a></div><motion.div className="hero-transition-line" aria-hidden="true" style={{scaleX:reduced?1:seam}}/></motion.section>
  <div id="experiencia"><PresentationMedia/></div>
  <Reveal as="section" id="solucoes" className="editorial-section">
   <SectionHeading number="02" label="Soluções">Soluções completas para cada etapa do seu crescimento.</SectionHeading>
   <div className="services-list">{SERVICES.map((s,i)=>{const Icon=icons[i];return <article key={s.id}><span className="service-number">0{i+1}</span><Icon strokeWidth={1.3}/><div><h3>{s.title}</h3><p>{s.description}</p></div><a href={waLink(WA_MESSAGES.orcamento(s.title))} target="_blank" rel="noopener noreferrer" aria-label={`Solicitar orçamento de ${s.title}`}><span>Solicitar orçamento</span><ArrowRight size={20}/></a></article>;})}</div>
  </Reveal>
  <Reveal as="section" id="projetos" className="editorial-section projects-section">
   <SectionHeading number="03" label="Projetos">Conheça os projetos da RM.</SectionHeading>
   <div className="project-list">{PROJECTS.map((p,i)=><article key={p.id}><div className="project-cover"><span>RM / PROJETO 0{i+1}</span><h3>{p.title}</h3><ArrowRight strokeWidth={1}/></div><p>{p.description}</p><a className="editorial-link" href={waLink(WA_MESSAGES.projeto)} target="_blank" rel="noopener noreferrer">Solicitar demonstração <ArrowRight size={18}/></a></article>)}</div><Link to="/projetos" className="editorial-link">Ver projetos <ArrowRight size={18}/></Link>
  </Reveal>
  <Reveal as="section" id="processo" className="editorial-section">
   <SectionHeading number="04" label="Processo">Como trabalhamos</SectionHeading><p>Da ideia à solução funcionando, com clareza em cada etapa.</p>
   <div className="process-journey" aria-label="Etapas do processo">{['Ideia','Desenvolvimento','Publicação','Suporte'].map((label,i)=><div key={label}><span>0{i+1}</span><strong>{label}</strong>{i<3 && <ArrowRight size={18}/>}</div>)}</div>
   <ol className="process-details">{PROCESS_STEPS.map(step=><li key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
  </Reveal>
  <section id="planos-criacao" className="editorial-section plans-section">
   <SectionHeading number="05" label="Planos de criação">Escolha o site certo para o seu negócio</SectionHeading>
   <p className="launch-note">{LAUNCH_NOTE}</p><p>Cada plano inclui obrigatoriamente pelo menos o Suporte Essencial (R$ 100/mês).</p>
   <div className="creation-plans">{CREATION_PLANS.map(plan=><article key={plan.id} className={plan.recommended?'recommended':''}>{plan.badge && <span className="plan-badge">{plan.badge}</span>}<p className="section-kicker">Preço de lançamento</p><h3>{plan.title}</h3><p className="plan-price">{plan.priceLabel}</p><p>+ {plan.monthlyFrom}<span>/mês de Suporte Essencial</span></p><p className="plan-description">{plan.text}</p><ul>{plan.includes.slice(0,5).map(item=><li key={item}><CheckCircle2 size={16}/>{item}</li>)}</ul><Link className="editorial-button" to={`/planos?plano=${plan.id}`}>Escolher {plan.title}<ArrowRight size={16}/></Link></article>)}</div>
   <p className="scope-note">{LAUNCH_SCOPE_NOTE}</p><Link to="/planos" className="editorial-link">Comparar os planos <ArrowRight size={18}/></Link>
  </section>
  <Reveal as="section" id="suporte" className="editorial-section support-section">
   <SectionHeading number="06" label="Suporte">O site continua acompanhado depois da entrega.</SectionHeading><p>Suporte a partir de R$ 100/mês. Compare os níveis e confira o que está incluído.</p><Link to="/planos" className="editorial-link">Ver opções de suporte <ArrowRight size={18}/></Link>
   <div className="commitments"><h3>Nossos compromissos</h3><p>Você acompanha as etapas do projeto, entende os custos e sabe com quem falar.</p><ul>{COMMITMENTS.map(c=><li key={c}><CheckCircle2 size={17}/>{c}</li>)}</ul></div>
  </Reveal>
  <Reveal as="section" id="faq" className="editorial-section"><SectionHeading number="07" label="FAQ">Perguntas frequentes</SectionHeading><div className="faq-list">{FAQ_ITEMS.map((item,index)=><FaqItem key={item.q} item={item} index={index}/>)}</div></Reveal>
  <Reveal as="section" id="contato" className="editorial-section contact-section"><SectionHeading number="08" label="Contato">Vamos transformar sua ideia em realidade?</SectionHeading><p>Conte o que você precisa. Nós encontramos a solução.</p><div className="contact-actions"><a href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer" className="editorial-button">Falar com a RM no WhatsApp <ArrowRight size={18}/></a><Link to="/contato" className="editorial-link">Enviar mensagem <ArrowRight size={18}/></Link></div></Reveal>
 </div></SiteLayout>;
}

