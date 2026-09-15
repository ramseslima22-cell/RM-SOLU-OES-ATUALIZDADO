import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import SiteLayout from '@/components/rm/SiteLayout';
import PageSeo from '@/components/rm/PageSeo';
import {
	CREATION_PLANS,
	SUPPORT_TIERS,
	LAUNCH_NOTE,
	LAUNCH_SCOPE_NOTE,
	WA_MESSAGES,
	waLink,
} from '@/data/rmBrand';
import { cn } from '@/lib/utils';

export default function PlanosPage() {
	const [params] = useSearchParams();
	const [step, setStep] = useState(1);

	const initialPlan = params.get('plano') || 'personalizado';
	const [creationId, setCreationId] = useState(
		CREATION_PLANS.some((p) => p.id === initialPlan) ? initialPlan : 'personalizado',
	);
	const [supportId, setSupportId] = useState('essencial');

	useEffect(() => {
		const p = params.get('plano');
		if (p && CREATION_PLANS.some((x) => x.id === p)) setCreationId(p);
	}, [params]);

	const creation = CREATION_PLANS.find((p) => p.id === creationId) || CREATION_PLANS[0];
	const support = SUPPORT_TIERS.find((t) => t.id === supportId) || SUPPORT_TIERS[0];

	const summaryLine = `${creation.title}: ${creation.priceLabel} uma vez + ${support.title}: ${support.priceLabel} — valores promocionais de lançamento.`;

	const waResumo = waLink(WA_MESSAGES.contratacao(summaryLine));

	return (
		<SiteLayout>
			<PageSeo
				title="Planos"
				description="Planos de criação de site com suporte mensal. Valores promocionais de lançamento."
				path="/planos"
			/>
			<section className="py-14 sm:py-20">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<p className="text-sm font-medium text-cyan-300">Planos</p>
					<h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
						Encontre o plano para o seu negócio
					</h1>
					<p className="mt-4 max-w-2xl text-slate-400">
						Escolha o plano de criação, o nível de suporte, confira o resumo e prossiga para a contratação.
						A mensalidade de suporte faz parte de todo plano.
					</p>
					<p className="mt-3 text-sm font-medium text-amber-200/90">{LAUNCH_NOTE}</p>
					<p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-500">{LAUNCH_SCOPE_NOTE}</p>

					{/* Steps */}
					<ol className="mt-10 flex flex-wrap gap-2">
						{[
							{ n: 1, label: 'Criação' },
							{ n: 2, label: 'Suporte' },
							{ n: 3, label: 'Resumo' },
						].map((s) => (
							<li key={s.n}>
								<button
									type="button"
									onClick={() => setStep(s.n)}
									className={cn(
										'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60',
										step === s.n
											? 'border-cyan-400/40 bg-cyan-400/15 text-white'
											: 'border-white/10 text-[#CBD5E1] hover:border-white/20 hover:text-white',
									)}
								>
									<span
										className={cn(
											'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
											step === s.n ? 'bg-cyan-400 text-slate-900' : 'bg-white/10 text-slate-300',
										)}
									>
										{s.n}
									</span>
									{s.label}
								</button>
							</li>
						))}
					</ol>

					{/* STEP 1 — Criação */}
					{step === 1 ? (
						<div className="mt-10">
							<h2 className="font-display text-2xl font-bold text-white">1. Escolha o plano de criação</h2>
							<div className="mt-6 grid gap-6 lg:grid-cols-3">
								{CREATION_PLANS.map((plan) => (
									<button
										key={plan.id}
										type="button"
										onClick={() => setCreationId(plan.id)}
										className={cn(
											'relative flex flex-col rounded-2xl border p-6 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60',
											creationId === plan.id
												? 'border-cyan-400/50 bg-gradient-to-b from-[#1E3A8A]/35 to-[#0F172A]/90 ring-1 ring-cyan-400/30'
												: 'border-white/10 bg-[#0F172A]/40 hover:border-white/20',
										)}
									>
										{plan.badge ? (
											<span className="absolute -top-3 left-5 rounded-full bg-cyan-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-900">
												{plan.badge}
											</span>
										) : null}
										<p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
											Preço de lançamento
										</p>
										<h3 className="mt-2 font-display text-xl font-bold text-white">{plan.title}</h3>
										<p className="mt-3 font-display text-3xl font-bold text-white">{plan.priceLabel}</p>
										<p className="mt-1 text-sm text-slate-300">
											+ {plan.monthlyFrom}/mês de Suporte Essencial
										</p>
										<p className="mt-4 text-sm leading-relaxed text-slate-400">{plan.text}</p>
										<ul className="mt-5 space-y-2">
											{plan.includes.map((item) => (
												<li key={item} className="flex gap-2 text-sm text-slate-300">
													<Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
													{item}
												</li>
											))}
										</ul>
										<div className="mt-5 border-t border-white/10 pt-4">
											<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
												Limites
											</p>
											<ul className="mt-2 space-y-1.5">
												{plan.limits.map((l) => (
													<li key={l} className="text-xs leading-relaxed text-slate-500">
														· {l}
													</li>
												))}
											</ul>
										</div>
									</button>
								))}
							</div>
							<div className="mt-8 flex justify-end">
								<button
									type="button"
									onClick={() => setStep(2)}
									className="inline-flex h-12 items-center gap-2 rounded-full bg-[#2563EB] px-6 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
								>
									Continuar para suporte
									<ArrowRight className="h-4 w-4" />
								</button>
							</div>
						</div>
					) : null}

					{/* STEP 2 — Suporte */}
					{step === 2 ? (
						<div className="mt-10">
							<h2 className="font-display text-2xl font-bold text-white">2. Escolha o nível de suporte</h2>
							<p className="mt-2 text-sm text-slate-400">
								Todo plano inclui pelo menos o Suporte Essencial. Você pode escolher um nível mais
								completo.
							</p>
							<div className="mt-6 grid gap-6 lg:grid-cols-3">
								{SUPPORT_TIERS.map((tier) => (
									<button
										key={tier.id}
										type="button"
										onClick={() => setSupportId(tier.id)}
										className={cn(
											'flex flex-col rounded-2xl border p-6 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60',
											supportId === tier.id
												? 'border-cyan-400/50 bg-gradient-to-b from-[#1E3A8A]/35 to-[#0F172A]/90 ring-1 ring-cyan-400/30'
												: 'border-white/10 bg-[#0F172A]/40 hover:border-white/20',
										)}
									>
										<p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
											{tier.priceNote}
										</p>
										<h3 className="mt-2 font-display text-xl font-bold text-white">{tier.title}</h3>
										<p className="mt-2 font-display text-2xl font-bold text-white">{tier.priceLabel}</p>
										{tier.required ? (
											<span className="mt-2 inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-200">
												Mínimo obrigatório
											</span>
										) : null}
										<p className="mt-4 text-sm text-slate-400">{tier.text}</p>
										<ul className="mt-5 space-y-2">
											{tier.includes.map((item) => (
												<li key={item} className="flex gap-2 text-sm text-slate-300">
													<Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
													{item}
												</li>
											))}
										</ul>
										<ul className="mt-4 space-y-1">
											{tier.notes.map((n) => (
												<li key={n} className="text-xs text-slate-500">
													{n}
												</li>
											))}
										</ul>
									</button>
								))}
							</div>
							<div className="mt-8 flex flex-wrap justify-between gap-3">
								<button
									type="button"
									onClick={() => setStep(1)}
									className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white hover:bg-white/5"
								>
									Voltar
								</button>
								<button
									type="button"
									onClick={() => setStep(3)}
									className="inline-flex h-12 items-center gap-2 rounded-full bg-[#2563EB] px-6 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
								>
									Ver resumo
									<ArrowRight className="h-4 w-4" />
								</button>
							</div>
						</div>
					) : null}

					{/* STEP 3 — Resumo */}
					{step === 3 ? (
						<div className="mt-10">
							<h2 className="font-display text-2xl font-bold text-white">3. Resumo da contratação</h2>
							<div className="mt-6 rounded-2xl border border-cyan-400/25 bg-[#0F172A]/60 p-6 sm:p-8">
								<p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
									Preço de lançamento
								</p>
								<p className="mt-3 font-display text-lg font-semibold leading-relaxed text-white sm:text-xl">
									{summaryLine}
								</p>
								<dl className="mt-6 grid gap-4 sm:grid-cols-2">
									<div className="rounded-xl border border-white/10 bg-[#050816]/50 p-4">
										<dt className="text-xs text-slate-500">Investimento inicial</dt>
										<dd className="mt-1 font-display text-xl font-bold text-white">
											{creation.title} — {creation.priceLabel}
										</dd>
									</div>
									<div className="rounded-xl border border-white/10 bg-[#050816]/50 p-4">
										<dt className="text-xs text-slate-500">Mensalidade</dt>
										<dd className="mt-1 font-display text-xl font-bold text-white">
											{support.title} — {support.priceLabel}
										</dd>
									</div>
								</dl>
								<p className="mt-4 text-xs leading-relaxed text-slate-500">{LAUNCH_SCOPE_NOTE}</p>

								<div className="mt-8 space-y-3 border-t border-white/10 pt-6">
									<p className="text-sm font-semibold text-white">Prosseguir para contratação</p>

<a href={waResumo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950">Conversar sobre este plano</a>
<p className="text-sm text-slate-300">O resumo será aberto no WhatsApp. Antes de qualquer pagamento, confirmamos escopo, prazo, custos de terceiros e condições do suporte. Esta seleção não efetua cobrança.</p>
</div>
								</div>
							<div className="mt-6">
								<button
									type="button"
									onClick={() => setStep(2)}
									className="inline-flex h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white hover:bg-white/5"
								>
									Voltar ao suporte
								</button>
							</div>
						</div>
					) : null}
				</div>
			</section>
		</SiteLayout>
	);
}