import React from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from '@/components/rm/SiteLayout';
import PageSeo from '@/components/rm/PageSeo';
import { BRAND, COMMITMENTS, WA_MESSAGES, waLink } from '@/data/rmBrand';
import { CheckCircle2 } from 'lucide-react';

export default function SobrePage() {
	return (
		<SiteLayout>
			<PageSeo
				title="Sobre"
				description="A RM Soluções Digitais ajuda negócios a transformar ideias em soluções digitais funcionais."
				path="/sobre"
			/>
			<section className="py-14 sm:py-20">
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
					<p className="text-sm font-medium text-cyan-300">Sobre</p>
					<h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">{BRAND.name}</h1>
					<p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
						A RM Soluções Digitais ajuda pequenos negócios e empresas a transformar ideias em soluções
						digitais funcionais. Nosso trabalho reúne tecnologia, estratégia, design, e-commerce,
						automação e suporte para criar ferramentas que possam ser utilizadas no dia a dia de cada
						cliente.
					</p>
					<p className="mt-4 text-sm text-slate-400">{BRAND.tagline}</p>
					<ul className="mt-10 space-y-3">
						{COMMITMENTS.map((c) => (
							<li key={c} className="flex items-start gap-3 text-sm text-slate-200">
								<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
								{c}
							</li>
						))}
					</ul>
					<div className="mt-10 flex flex-col gap-3 sm:flex-row">
						<a data-rm-cta=""
							href={waLink(WA_MESSAGES.geral)}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex h-11 items-center justify-center rounded-full bg-[#2563EB] px-5 text-sm font-semibold text-white"
						><span className="rm-cta-label">
							Falar com a RM
						</span></a>
						<Link data-rm-cta=""
							to="/contato"
							className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white"
						><span className="rm-cta-label">
							Formulário de contato
						</span></Link>
					</div>
				</div>
			</section>
		</SiteLayout>
	);
}
