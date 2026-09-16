import React from 'react';
import SiteHeader from '@/components/rm/SiteHeader';
import SiteFooter from '@/components/rm/SiteFooter';

export default function SiteLayout({ children }) {
	return (
		<div className="rm-layout flex min-h-[100dvh] flex-col bg-[#050816] text-[#F8FAFC]">
			<a data-rm-cta=""
				href="#conteudo"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-slate-900"
			><span className="rm-cta-label">
				Ir para o conteúdo
			</span></a>
			<SiteHeader />
			<main id="conteudo" className="flex-1">
				{children}
			</main>
			<SiteFooter />
		</div>
	);
}
