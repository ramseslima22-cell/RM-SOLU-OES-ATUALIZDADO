import React from 'react';
import SiteLayout from '@/components/rm/SiteLayout';
import PageSeo from '@/components/rm/PageSeo';
import { PROJECTS, WA_MESSAGES, waLink } from '@/data/rmBrand';

export default function ProjetosPage() {
	return (
		<SiteLayout>
			<PageSeo
				title="Projetos"
				description="Projetos demonstrativos da RM Soluções Digitais: lojas virtuais e e-commerce funcional."
				path="/projetos"
			/>
			<section className="py-14 sm:py-20">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<p className="text-sm font-medium text-cyan-300">Projetos</p>
					<h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
						Conheça os projetos da RM.
					</h1>
					<p className="mt-4 max-w-2xl text-slate-400">
						Conheça as propostas e peça uma demonstração para avaliar os detalhes de cada projeto.
					</p>
					<div className="mt-12 grid gap-8">
						{PROJECTS.map((p) => (
							<article
								key={p.id}
								className="grid overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-2"
							>
								<div className="aspect-[16/10] bg-gradient-to-br from-[#1E3A8A]/60 via-[#0F172A] to-[#050816] p-8 lg:aspect-auto">
									<div className="flex h-full min-h-[220px] items-end">
										<h2 className="font-display text-3xl font-bold text-white">{p.title}</h2>
									</div>
								</div>
								<div className="flex flex-col justify-center bg-[#0F172A]/40 p-8">
									<p className="text-sm leading-relaxed text-slate-300">{p.description}</p>
									<a
										href={waLink(WA_MESSAGES.projeto)}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-8 inline-flex h-11 w-fit items-center rounded-full bg-[#2563EB] px-5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
									>
										Solicitar demonstração
									</a>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
		</SiteLayout>
	);
}
