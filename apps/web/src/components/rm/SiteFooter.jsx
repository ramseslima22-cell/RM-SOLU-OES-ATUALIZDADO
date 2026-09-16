import React from 'react';
import { Link } from 'react-router-dom';
import RmLogo from '@/components/rm/RmLogo';
import { BRAND, NAV_LINKS, waLink, WA_MESSAGES } from '@/data/rmBrand';

export default function SiteFooter() {
	return (
		<footer className="border-t border-white/10 bg-[#050816]">
			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
				<div className="lg:col-span-5">
					<RmLogo />
					<p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{BRAND.tagline}</p>
				</div>
				<div className="lg:col-span-3">
					<p className="font-display text-sm font-semibold text-white">Navegação</p>
					<ul className="mt-4 space-y-2">
						{NAV_LINKS.filter((l) => l.href !== '/').map((l) => (
							<li key={l.href}>
								<Link data-rm-cta=""
									to={l.href}
									className="text-sm text-[#CBD5E1] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
								><span className="rm-cta-label">
									{l.label}
								</span></Link>
							</li>
						))}
						<li>
							<Link data-rm-cta=""
								to="/politica-de-privacidade"
								className="text-sm text-[#CBD5E1] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
							><span className="rm-cta-label">
								Política de Privacidade
							</span></Link>
						</li>
						<li>
							<Link data-rm-cta=""
								to="/termos-de-servico"
								className="text-sm text-[#CBD5E1] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
							><span className="rm-cta-label">
								Termos de Serviço
							</span></Link>
						</li>
					</ul>
				</div>
				<div className="lg:col-span-4">
					<p className="font-display text-sm font-semibold text-white">Contato</p>
					<ul className="mt-4 space-y-2 text-sm text-slate-400">
						<li>
							<a data-rm-cta="" href={waLink(WA_MESSAGES.geral)} target="_blank" rel="noopener noreferrer" className="hover:text-white"><span className="rm-cta-label">
								WhatsApp: {BRAND.whatsappDisplay}
							</span></a>
						</li>
						<li>
							<a data-rm-cta="" href={`mailto:${BRAND.email}`} className="hover:text-white"><span className="rm-cta-label">
								E-mail: {BRAND.email}
							</span></a>
						</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-white/5">
				<div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
					<p>
						© {BRAND.year} {BRAND.name}
					</p>
					<p>{BRAND.slogan}</p>
				</div>
			</div>
		</footer>
	);
}
