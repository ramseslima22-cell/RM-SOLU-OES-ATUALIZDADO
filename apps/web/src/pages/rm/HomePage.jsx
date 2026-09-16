import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import SiteLayout from '@/components/rm/SiteLayout';
import PageSeo from '@/components/rm/PageSeo';
import RmLogo from '@/components/rm/RmLogo';
import { HeroScene, HeroCopy, HeroFooter } from '@/components/rm/HeroMotion';
import { HeroExperience, HeroSection } from '@/components/rm/HeroTransition';
import PresentationMedia, { HeroMedia, HeroAtmosphere } from '@/components/rm/PresentationMedia';
import Reveal from '@/components/Reveal';
import { COMMITMENTS, PROJECTS, CREATION_PLANS, FAQ_ITEMS, LAUNCH_NOTE, LAUNCH_SCOPE_NOTE, WA_MESSAGES, waLink } from '@/data/rmBrand';
function FaqItem({item,index}) {
 const [open,setOpen]=useState(false);
 return <div className="faq-row"><button data-rm-cta="" type="button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls={`faq-answer-${index}`}><span><span className="rm-cta-label">{item.q}</span></span><ChevronDown size={19} style={{transform:open?'rotate(180deg)':undefined}}/></button>{open && <p id={`faq-answer-${index}`}>{item.a}</p>}</div>;
}
function SectionHeading({number,label,children}) {
 return <><p className="section-kicker">{number} / {label}</p><h2>{children}</h2></>;
}
export default function HomePage() {
 return <SiteLayout><PageSeo path="/"/><div className="rm-home">
  <HeroExperience>
  <HeroSection id="apresentacao" className="rm-hero-static hero-composed">
   <HeroScene><HeroAtmosphere/><span className="rm-hero-index" aria-hidden="true">01</span><HeroCopy>
    <p className="rm-hero-eyebrow"><i/> RM SOLUÇÕES DIGITAIS</p>
    <h1 className="rm-hero-logo-heading"><RmLogo to={null} className="rm-hero-main-logo"/></h1>
    <p className="rm-hero-description">Sites, lojas virtuais e automações que simplificam sua rotina e impulsionam seus resultados.</p>
    <div className="rm-hero-actions"><a data-rm-cta="" href="#planos-criacao"><span className="rm-cta-label">Conhecer os planos </span><ArrowRight size={19}/></a><a data-rm-cta="" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer"><span className="rm-cta-label">Falar com a RM </span><ArrowRight size={19}/></a></div>
   </HeroCopy><HeroMedia/></HeroScene>
   <HeroFooter><div className="rm-hero-capabilities"><div><strong>Sites</strong><span>Presença profissional</span></div><div><strong>Lojas</strong><span>Seu negócio online</span></div><div><strong>Automações</strong><span>Processos conectados</span></div></div><div className="rm-hero-footer-note"><i/><span>Soluções digitais<br/>para um futuro maior.</span></div><a data-rm-cta="" href="#experiencia"><span><span className="rm-cta-label">↓</span></span><span className="rm-cta-label">Role para explorar</span></a></HeroFooter>
  </HeroSection>
  <div id="experiencia"><PresentationMedia/></div>
  </HeroExperience>
  <Reveal as="section" id="projetos" className="editorial-section projects-section">
   <SectionHeading number="03" label="Projetos">Conheça os projetos da RM.</SectionHeading>
   <div className="project-list">{PROJECTS.map((p,i)=><article key={p.id}><div className="project-cover"><span>RM / PROJETO 0{i+1}</span><h3>{p.title}</h3><ArrowRight strokeWidth={1}/></div><p>{p.description}</p><a data-rm-cta="" className="editorial-link" href={waLink(WA_MESSAGES.projeto)} target="_blank" rel="noopener noreferrer"><span className="rm-cta-label">Solicitar demonstração </span><ArrowRight size={18}/></a></article>)}</div><Link data-rm-cta="" to="/projetos" className="editorial-link"><span className="rm-cta-label">Ver projetos </span><ArrowRight size={18}/></Link>
  </Reveal>
  {/* Preserve the Ecosystem CTA target without retaining the removed section. */}
  <span id="solucoes" aria-hidden="true" style={{display:'block'}}/>
  <section id="planos-criacao" className="editorial-section plans-section">
   <SectionHeading number="05" label="Planos de criação">Escolha o site certo para o seu negócio</SectionHeading>
   <p className="launch-note">{LAUNCH_NOTE}</p><p>Cada plano inclui obrigatoriamente pelo menos o Suporte Essencial (R$ 100/mês).</p>
   <div className="creation-plans">{CREATION_PLANS.map(plan=><article key={plan.id} className={plan.recommended?'recommended':''}>{plan.badge && <span className="plan-badge">{plan.badge}</span>}<p className="section-kicker">Preço de lançamento</p><h3>{plan.title}</h3><p className="plan-price">{plan.priceLabel}</p><p>+ {plan.monthlyFrom}<span>/mês de Suporte Essencial</span></p><p className="plan-description">{plan.text}</p><ul>{plan.includes.slice(0,5).map(item=><li key={item}><CheckCircle2 size={16}/>{item}</li>)}</ul><Link data-rm-cta="" className="editorial-button" to={`/planos?plano=${plan.id}`}><span className="rm-cta-label">Escolher {plan.title}</span><ArrowRight size={16}/></Link></article>)}</div>
   <p className="scope-note">{LAUNCH_SCOPE_NOTE}</p><Link data-rm-cta="" to="/planos" className="editorial-link"><span className="rm-cta-label">Comparar os planos </span><ArrowRight size={18}/></Link>
  </section>
  <Reveal as="section" id="suporte" className="editorial-section support-section">
   <SectionHeading number="06" label="Suporte">O site continua acompanhado depois da entrega.</SectionHeading><p>Suporte a partir de R$ 100/mês. Compare os níveis e confira o que está incluído.</p><Link data-rm-cta="" to="/planos" className="editorial-link"><span className="rm-cta-label">Ver opções de suporte </span><ArrowRight size={18}/></Link>
   <div className="commitments"><h3>Nossos compromissos</h3><p>Você acompanha as etapas do projeto, entende os custos e sabe com quem falar.</p><ul>{COMMITMENTS.map(c=><li key={c}><CheckCircle2 size={17}/>{c}</li>)}</ul></div>
  </Reveal>
  <Reveal as="section" id="faq" className="editorial-section"><SectionHeading number="07" label="FAQ">Perguntas frequentes</SectionHeading><div className="faq-list">{FAQ_ITEMS.map((item,index)=><FaqItem key={item.q} item={item} index={index}/>)}</div></Reveal>
  <Reveal as="section" id="contato" className="editorial-section contact-section"><SectionHeading number="08" label="Contato">Vamos transformar sua ideia em realidade?</SectionHeading><p>Conte o que você precisa. Nós encontramos a solução.</p><div className="contact-actions"><a data-rm-cta="" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer" className="editorial-button"><span className="rm-cta-label">Falar com a RM no WhatsApp </span><ArrowRight size={18}/></a><Link data-rm-cta="" to="/contato" className="editorial-link"><span className="rm-cta-label">Enviar mensagem </span><ArrowRight size={18}/></Link></div></Reveal>
 </div></SiteLayout>;
}

