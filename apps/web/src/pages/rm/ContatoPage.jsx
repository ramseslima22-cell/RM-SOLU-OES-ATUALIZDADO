import React, { useState } from 'react';
import SiteLayout from '@/components/rm/SiteLayout';
import PageSeo from '@/components/rm/PageSeo';
import {
	BRAND,
	CONTACT_SERVICE_OPTIONS,
	WA_MESSAGES,
	waLink,
} from '@/data/rmBrand';

const initial = {
	name: '',
	company: '',
	whatsapp: '',
	email: '',
	service: '',
	message: '',
};

export default function ContatoPage() {
	const [form, setForm] = useState(initial);
	const [status, setStatus] = useState('idle');
	const [error, setError] = useState('');

	const onChange = (e) => {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
	};

 const [preparedUrl, setPreparedUrl] = useState('');
 const onSubmit = (e) => {
  e.preventDefault();
  if (![form.name, form.whatsapp, form.email, form.service, form.message].every(v=>v.trim())) {
   setError('Preencha os campos obrigatórios.'); return;
  }
  const message = `Olá! Gostaria de um orçamento.\nNome: ${form.name.trim()}\nEmpresa: ${form.company.trim()}\nWhatsApp: ${form.whatsapp.trim()}\nE-mail: ${form.email.trim()}\nServiço: ${form.service}\nMensagem: ${form.message.trim()}`;
  setPreparedUrl(waLink(message)); setError(''); setStatus('success');
 };

	const fieldClass =
		'mt-1.5 w-full rounded-xl border border-white/10 bg-[#050816] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20';

	return (
		<SiteLayout>
			<PageSeo
				title="Contato"
				description="Fale com a RM Soluções Digitais por formulário, e-mail ou WhatsApp."
				path="/contato"
			/>
			<section className="py-14 sm:py-20">
				<div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
					<div className="lg:col-span-2">
						<p className="text-sm font-medium text-cyan-300">Contato</p>
						<h1 className="mt-3 font-display text-4xl font-bold text-white">Solicitar orçamento</h1>
						<p className="mt-4 text-sm leading-relaxed text-slate-400">
							Conte um pouco sobre o seu negócio. Retornamos com a melhor forma de ajudar.
						</p>
						<ul className="mt-8 space-y-3 text-sm text-slate-300">
							<li>
								<span className="text-slate-500">WhatsApp: </span>
								<a data-rm-cta="" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline"><span className="rm-cta-label">
									{BRAND.whatsappDisplay}
								</span></a>
							</li>
							<li>
								<span className="text-slate-500">E-mail: </span>
								<a data-rm-cta="" href={`mailto:${BRAND.email}`} className="text-cyan-300 hover:underline"><span className="rm-cta-label">
									{BRAND.email}
								</span></a>
							</li>
						</ul>
					</div>

					<div className="lg:col-span-3">
						{status === 'success' ? (
							<div
								className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-8"
								role="status"
							>
								<p className="font-display text-xl font-semibold text-white">Mensagem pronta para enviar</p>
								<p className="mt-3 text-sm text-slate-300">
									Confira seus dados e clique abaixo. A solicitação só será enviada quando você confirmar o envio no WhatsApp.
								</p>
								<a data-rm-cta="" href={preparedUrl} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-xl bg-emerald-500 px-5 py-3 text-center font-semibold text-slate-950"><span className="rm-cta-label">Abrir WhatsApp e enviar</span></a>
<button data-rm-cta=""
									type="button"
									className="mt-6 text-sm font-semibold text-cyan-300"
									onClick={() => setStatus('idle')}
								><span className="rm-cta-label">
									Editar mensagem
								</span></button>
							</div>
						) : (
							<form
								onSubmit={onSubmit}
								className="rounded-2xl border border-white/10 bg-[#0F172A]/50 p-6 sm:p-8"
								
							>
								<div className="grid gap-5 sm:grid-cols-2">
									<label className="block text-sm font-medium text-slate-300">
										Nome
										<input
											required
											name="name"
											value={form.name}
											onChange={onChange}
											className={fieldClass}
											autoComplete="name"
										/>
									</label>
									<label className="block text-sm font-medium text-slate-300">
										Empresa ou negócio
										<input
											name="company"
											value={form.company}
											onChange={onChange}
											className={fieldClass}
											autoComplete="organization"
										/>
									</label>
									<label className="block text-sm font-medium text-slate-300">
										WhatsApp
										<input
											required
											name="whatsapp"
											value={form.whatsapp}
											onChange={onChange}
											className={fieldClass}
											inputMode="tel"
											placeholder="(21) 90000-0000"
										/>
									</label>
									<label className="block text-sm font-medium text-slate-300">
										E-mail
										<input
											required
											type="email"
											name="email"
											value={form.email}
											onChange={onChange}
											className={fieldClass}
											autoComplete="email"
										/>
									</label>
									<label className="block text-sm font-medium text-slate-300 sm:col-span-2">
										Serviço de interesse
										<select
											required
											name="service"
											value={form.service}
											onChange={onChange}
											className={fieldClass}
										>
											<option value="" disabled>
												Selecione…
											</option>
											{CONTACT_SERVICE_OPTIONS.map((opt) => (
												<option key={opt} value={opt}>
													{opt}
												</option>
											))}
										</select>
									</label>
									<label className="block text-sm font-medium text-slate-300 sm:col-span-2">
										Mensagem
										<textarea
											required
											name="message"
											value={form.message}
											onChange={onChange}
											rows={5}
											className={fieldClass}
										/>
									</label>
								</div>
								{error ? (
									<p className="mt-4 text-sm text-red-400" role="alert">
										{error}
									</p>
								) : null}
								<button data-rm-cta=""
									type="submit"
									disabled={status === 'loading'}
									className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#2563EB] text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60 sm:w-auto sm:px-8"
								><span className="rm-cta-label">
									{status === 'loading' ? 'Enviando…' : 'Preparar mensagem no WhatsApp'}
								</span></button>
							</form>
						)}
					</div>
				</div>
			</section>
		</SiteLayout>
	);
}
