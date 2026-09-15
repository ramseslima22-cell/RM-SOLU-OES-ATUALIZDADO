import React from 'react';
import { ShoppingCart, Globe, Cog, Monitor, Headset, LineChart, ArrowRight } from 'lucide-react';
import SiteLayout from '@/components/rm/SiteLayout';
import PageSeo from '@/components/rm/PageSeo';
import { SERVICES, AVULSO_SERVICES, WA_MESSAGES, waLink } from '@/data/rmBrand';

const ICONS = [ShoppingCart, Globe, Cog, Monitor, Headset, LineChart];

export default function ServicosPage() {
	return (
		<SiteLayout>
			<PageSeo
				title="Serviços"
				description="E-commerce, sites profissionais, automação, presença digital, suporte e soluções personalizadas."
				path="/servicos"
			/>
			<section className="border-b border-white/5 py-14 sm:py-20">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<p className="text-sm font-medium text-cyan-300">Serviços</p>
					<h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
						Soluções completas para cada etapa do seu crescimento.
					</h1>
					<p className="mt-4 max-w-2xl text-slate-400">
						Da presença online à operação digital completa — com clareza, tecnologia e suporte.
					</p>
					<div className="mt-12 grid gap-5 sm:grid-cols-2">
						{SERVICES.map((s, i) => {
							const Icon = ICONS[i] || Globe;
							return (
								<article key={s.id} className="rounded-2xl border border-white/10 bg-[#0F172A]/50 p-7">
									<span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-cyan-300">
										<Icon className="h-5 w-5" strokeWidth={1.75} />
									</span>
									<h2 className="mt-5 font-display text-xl font-semibold text-white">{s.title}</h2>
									<p className="mt-3 text-sm leading-relaxed text-slate-400">{s.description}</p>
									<a
										href={waLink(WA_MESSAGES.orcamento(s.title))}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300"
									>
										Solicitar orçamento
										<ArrowRight className="h-4 w-4" />
									</a>
								</article>
							);
						})}
					</div>
				</div>
			</section>
		<section className="mx-auto max-w-6xl px-6 pb-16"><h2 className="font-display text-2xl font-bold">Apoio digital para o dia a dia</h2><p className="mt-3 text-slate-300">Documentos, planilhas e outras tarefas avulsas, com orçamento antes de começar.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{AVULSO_SERVICES.map(s=><a key={s.id} href={waLink(WA_MESSAGES.avulso(s.title))} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 p-4 text-slate-200 hover:border-cyan-400/40">{s.title}</a>)}</div></section></SiteLayout>
	);
}
