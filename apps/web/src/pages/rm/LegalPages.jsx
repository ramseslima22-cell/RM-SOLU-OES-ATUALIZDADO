import React from 'react';
import SiteLayout from '@/components/rm/SiteLayout';
import PageSeo from '@/components/rm/PageSeo';
import { BRAND } from '@/data/rmBrand';

export function PoliticaPrivacidadePage() {
	return (
		<SiteLayout>
			<PageSeo title="Política de Privacidade" path="/politica-de-privacidade" description="Política de privacidade da RM Soluções Digitais." />
			<article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 prose-invert">
				<h1 className="font-display text-4xl font-bold text-white">Política de Privacidade</h1>
				<p className="mt-6 text-sm leading-relaxed text-slate-400">
					A {BRAND.name} trata dados pessoais fornecidos voluntariamente por meio do site (formulário de
					contato e canais de mensagem) para responder solicitações, prestar serviços contratados
					e cumprir obrigações legais. Não vendemos dados pessoais. O formulário prepara uma mensagem para envio pelo WhatsApp e não armazena os dados em um banco deste site. Este site não processa pagamentos. Ao abrir serviços externos, aplicam-se também as políticas desses serviços.
				</p>
				<p className="mt-4 text-sm leading-relaxed text-slate-400">
					Para exercer direitos de acesso, correção ou exclusão, contate {BRAND.email}. Esta política pode
					ser atualizada para refletir mudanças operacionais ou legais.
				</p>
			</article>
		</SiteLayout>
	);
}

export function TermosServicoPage() {
	return (
		<SiteLayout>
			<PageSeo title="Termos de Serviço" path="/termos-de-servico" description="Termos de serviço da RM Soluções Digitais." />
			<article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
				<h1 className="font-display text-4xl font-bold text-white">Termos de Serviço</h1>
				<p className="mt-6 text-sm leading-relaxed text-slate-400">
					Ao contratar serviços da {BRAND.name}, você concorda com o escopo descrito no plano ou orçamento
					aceito, prazos combinados e limites de horas/solicitações quando aplicável. Domínio, hospedagem,
					taxas de meios de pagamento e serviços de terceiros são de responsabilidade do cliente, salvo
					acordo escrito em contrário.
				</p>
				<p className="mt-4 text-sm leading-relaxed text-slate-400">
					Início da mensalidade, forma de cobrança e condições de cancelamento serão definidos na proposta aceita. Alterações
					estruturais, novas páginas, integrações extras e redesigns são orçados à parte. Dúvidas:{' '}
					{BRAND.email}.
				</p>
			</article>
		</SiteLayout>
	);
}
