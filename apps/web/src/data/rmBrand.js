/** Identidade oficial — RM Soluções Digitais */
export const BRAND = {
	name: 'RM Soluções Digitais',
	shortName: 'RM',
	slogan: 'Tecnologia que transforma negócios.',
	tagline: 'Sua ideia. Nossa tecnologia.',
	email: 'ramseslima22@gmail.com',
	whatsappDisplay: '(21) 97725-8018',
	whatsappE164: '5521977258018',
	whatsappUrl: 'https://wa.me/5521977258018',
	year: 2026,
	seoTitle: 'RM Soluções Digitais | Sites, Lojas Virtuais e Automação',
	seoDescription:
		'Sites profissionais, lojas virtuais, automação, presença digital e suporte tecnológico para empresas que querem crescer no ambiente digital.',
};

export const WA_MESSAGES = {
	geral: 'Olá! Conheci a RM Soluções Digitais pelo site e gostaria de saber mais sobre os serviços.',
	planos: 'Olá! Gostaria de conhecer os planos de criação e suporte da RM Soluções Digitais.',
	essencial:
		'Olá! Tenho interesse no Site Essencial (R$350 + Suporte Essencial R$100/mês) — valores promocionais de lançamento.',
	personalizado:
		'Olá! Tenho interesse no Site Personalizado (R$500 + Suporte Essencial R$100/mês) — valores promocionais de lançamento.',
	completo:
		'Olá! Tenho interesse no Site Completo com Código (R$1.000 + Suporte Essencial R$100/mês) — valores promocionais de lançamento.',
	suporteEssencial: 'Olá! Gostaria de saber mais sobre o Suporte Essencial (R$100/mês).',
	suporteAvancado: 'Olá! Gostaria de saber mais sobre o Suporte Avançado (R$300/mês).',
	suporteOperacional:
		'Olá! Gostaria de saber mais sobre o Suporte Operacional (a partir de R$500/mês).',
	orcamento: (servico) =>
		`Olá! Gostaria de solicitar um orçamento de ${servico} com a RM Soluções Digitais.`,
	projeto: 'Olá! Quero um projeto como os que vi no site da RM Soluções Digitais.',
	avulso: (tarefa) =>
		`Olá! Preciso de ajuda com: ${tarefa}. Gostaria de saber o valor antes de começar.`,
	contratacao: (resumo) =>
		`Olá! Quero contratar: ${resumo}. Valores promocionais de lançamento.`,
};

export function waLink(message = WA_MESSAGES.geral) {
	return `${BRAND.whatsappUrl}?text=${encodeURIComponent(message)}`;
}


export const LAUNCH_NOTE =
	'Valores promocionais de lançamento por tempo limitado.';

export const LAUNCH_SCOPE_NOTE =
	'Os valores de lançamento são válidos para os escopos descritos. Funções, integrações ou necessidades adicionais serão avaliadas separadamente.';

export const SERVICES = [
	{
		id: 'sites',
		title: 'Sites Profissionais',
		description:
			'Sites institucionais e comerciais personalizados para transmitir credibilidade, apresentar serviços e gerar oportunidades.',
	},
	{
		id: 'ecommerce',
		title: 'E-commerce',
		description:
			'Lojas virtuais modernas e preparadas para vender, com catálogo, carrinho, checkout, pagamentos e experiência responsiva.',
	},
	{
		id: 'automacao',
		title: 'Automação',
		description:
			'Automação de tarefas e processos para reduzir trabalho manual, economizar tempo e melhorar a produtividade.',
	},
	{
		id: 'presenca',
		title: 'Presença Digital',
		description:
			'Estratégia e estrutura digital para fortalecer sua marca e facilitar o contato com novos clientes.',
	},
	{
		id: 'suporte',
		title: 'Suporte & Tecnologia',
		description:
			'Manutenção, correções, atualizações e suporte para sites e operações digitais do dia a dia.',
	},
	{
		id: 'personalizadas',
		title: 'Soluções Personalizadas',
		description:
			'Projetos, integrações e funcionalidades desenvolvidas de acordo com as necessidades de cada negócio.',
	},
];

export const PROCESS_STEPS = [
	{
		n: '01',
		title: 'Entendemos seu negócio',
		text: 'Analisamos suas necessidades, objetivos, público e operação.',
	},
	{
		n: '02',
		title: 'Planejamos a solução',
		text: 'Definimos estrutura, identidade, funcionalidades e etapas do projeto.',
	},
	{
		n: '03',
		title: 'Desenvolvemos e testamos',
		text: 'Criamos a solução, revisamos os fluxos e testamos em diferentes dispositivos.',
	},
	{
		n: '04',
		title: 'Publicamos e acompanhamos',
		text: 'Colocamos o projeto no ar e oferecemos suporte contínuo para sua evolução.',
	},
];

export const COMMITMENTS = [
	'Comunicação clara',
	'Soluções adaptadas ao negócio',
	'Entrega revisada e testada',
	'Suporte próximo',
	'Transparência sobre custos e limites',
];

export const PROJECTS = [
	{
		id: 'rm-essence',
		title: 'RM Essence',
		description:
			'Loja virtual de perfumes com identidade premium, catálogo, navegação responsiva e experiência de compra planejada para diferentes dispositivos.',
	},
	{
		id: 'ecommerce-funcional',
		title: 'E-commerce funcional',
		description:
			'Estrutura completa com produtos, carrinho, checkout integrado ao Stripe, confirmação de compra e envio de pedidos.',
	},
];

/** Planos de criação — sempre em combo com suporte mensal */
export const CREATION_PLANS = [
	{
		id: 'essencial',
		title: 'Site Essencial',
		priceLabel: 'R$ 350,00',
		priceCents: 35000,
		monthlyFrom: 'R$ 100,00',
		monthlyCents: 10000,
		billing: 'Investimento inicial + mensalidade',
		badge: null,
		recommended: false,
		text: 'Site funcional criado a partir de uma estrutura profissional preparada pela RM, personalizado com as principais informações e a identidade visual do cliente.',
		includes: [
			'Template profissional funcional',
			'Personalização de logo, cores, textos e imagens',
			'Conteúdo fornecido pelo cliente',
			'Layout responsivo',
			'Formulário de contato',
			'WhatsApp',
			'SEO básico',
			'Suporte Essencial',
		],
		limits: [
			'O cliente poderá alterar ou solicitar mudanças superficiais',
			'Alterações superficiais incluem textos, imagens, cores e informações',
			'Não inclui mudanças profundas na estrutura',
			'Não inclui funções ilimitadas',
			'Não inclui entrega do código-fonte',
			'Não inclui acesso irrestrito à infraestrutura',
			'Mudanças estruturais serão orçadas separadamente',
		],
		waKey: 'essencial',
		matchKeywords: ['essencial', 'criação', 'criacao', '350'],
	},
	{
		id: 'personalizado',
		title: 'Site Personalizado',
		priceLabel: 'R$ 500,00',
		priceCents: 50000,
		monthlyFrom: 'R$ 100,00',
		monthlyCents: 10000,
		billing: 'Investimento inicial + mensalidade',
		badge: 'Recomendado pela RM',
		recommended: true,
		text: 'Site com visual, estrutura, seções e detalhes personalizados de acordo com a empresa e os objetivos definidos para o projeto.',
		includes: [
			'Design personalizado',
			'Estrutura adaptada ao negócio',
			'Seções planejadas',
			'Identidade visual detalhada',
			'Layout responsivo',
			'Formulários',
			'WhatsApp',
			'Integrações básicas previstas',
			'SEO básico',
			'Suporte Essencial',
		],
		limits: [
			'A RM continua responsável pelo código e pela administração técnica',
			'O cliente não recebe acesso irrestrito ao código-fonte',
			'Sistemas, automações e integrações complexas serão orçados separadamente',
			'Alterações fora do escopo aprovado não estão incluídas',
		],
		waKey: 'personalizado',
		matchKeywords: ['personalizado', '500'],
	},
	{
		id: 'completo',
		title: 'Site Completo com Código',
		priceLabel: 'R$ 1.000,00',
		priceCents: 100000,
		monthlyFrom: 'R$ 100,00',
		monthlyCents: 10000,
		billing: 'Investimento inicial + mensalidade',
		badge: null,
		recommended: false,
		text: 'Projeto personalizado e detalhado, com entrega do código-fonte e acesso irrestrito ao projeto.',
		includes: [
			'Design personalizado',
			'Estrutura personalizada',
			'Layout responsivo',
			'Integrações previstas',
			'SEO básico',
			'Código-fonte',
			'Acesso administrativo',
			'Acesso técnico',
			'Liberdade para modificar o código',
			'Suporte Essencial',
		],
		limits: [
			'O código e os acessos serão entregues após a conclusão e o pagamento',
			'O cliente poderá alterar o código ou contratar outro profissional',
			'Funcionalidades extraordinárias serão orçadas separadamente',
			'Suporte mensal não significa desenvolvimento ilimitado',
		],
		waKey: 'completo',
		matchKeywords: ['completo', 'código', 'codigo', '1000', '1.000'],
	},
];

export const SUPPORT_TIERS = [
	{
		id: 'essencial',
		title: 'Suporte Essencial',
		priceLabel: 'R$ 100,00/mês',
		priceNote: 'Preço de lançamento',
		priceCents: 10000,
		billingInterval: 'monthly',
		required: true,
		text: 'Todo plano de criação inclui pelo menos o Suporte Essencial.',
		includes: [
			'Correções básicas',
			'Alterações simples de textos, imagens e informações',
			'Orientações de utilização',
			'Verificações básicas',
			'Atendimento remoto',
		],
		notes: [
			'Não inclui reconstruções, novas funções complexas ou alterações ilimitadas.',
		],
		waKey: 'suporteEssencial',
		matchKeywords: ['essencial', 'manutenção', 'manutencao', '100'],
	},
	{
		id: 'avancado',
		title: 'Suporte Avançado',
		priceLabel: 'R$ 300,00/mês',
		priceNote: 'Preço de lançamento',
		priceCents: 30000,
		billingInterval: 'monthly',
		required: false,
		text: 'Atendimento técnico mais completo para empresas que precisam de apoio contínuo.',
		includes: [
			'Tudo do Suporte Essencial',
			'Atendimento técnico mais detalhado',
			'TeamViewer quando necessário',
			'Auxílio técnico relacionado aos serviços contratados',
			'Apoio na configuração de anúncios',
			'Auxílio com tráfego pago e presença digital',
		],
		notes: [
			'TeamViewer somente com autorização e agendamento.',
			'O dinheiro investido nos anúncios não está incluído.',
			'Não existe garantia de vendas ou resultados.',
			'Demandas maiores serão orçadas separadamente.',
		],
		waKey: 'suporteAvancado',
		matchKeywords: ['avançado', 'avancado', '300'],
	},
	{
		id: 'operacional',
		title: 'Suporte Operacional',
		priceLabel: 'A partir de R$ 500,00/mês',
		priceNote: 'Preço de lançamento',
		priceCents: 50000,
		billingInterval: 'monthly',
		required: false,
		text: 'Participação mais próxima nas necessidades digitais da empresa.',
		includes: [
			'Tudo do Suporte Avançado',
			'Participação mais próxima nas necessidades digitais da empresa',
			'Apoio em computadores',
			'Apoio em processos digitais',
			'Atendimento remoto',
			'Possibilidade de atendimento presencial',
			'Orientação sobre ferramentas e organização digital',
		],
		notes: [
			'Atendimento presencial depende de localização, disponibilidade e agendamento.',
			'Deslocamento, peças, equipamentos e licenças não estão incluídos.',
			'Quantidade de computadores, horas, visitas e tarefas será avaliada.',
			'Escopo e preço final serão combinados pelo WhatsApp.',
		],
		waKey: 'suporteOperacional',
		matchKeywords: ['operacional', '500'],
	},
];

export const AVULSO_SERVICES = [
	{
		id: 'docs-org',
		title: 'Download e organização de documentos e arquivos',
	},
	{
		id: 'docs-edit',
		title: 'Edição e correção de documentos',
	},
	{
		id: 'convert',
		title: 'Conversão e formatação de arquivos',
	},
	{
		id: 'sheets',
		title: 'Criação e organização de planilhas',
	},
	{
		id: 'fill',
		title: 'Preenchimento de documentos',
	},
	{
		id: 'cadastros',
		title: 'Apoio com cadastros e plataformas digitais',
	},
	{
		id: 'internet',
		title: 'Serviços básicos pela internet',
	},
	{
		id: 'outros',
		title: 'Outras tarefas digitais sob consulta',
	},
];

export const FAQ_ITEMS = [
	{
		q: 'A mensalidade de suporte é obrigatória?',
		a: 'Sim. Todo plano de criação inclui pelo menos o Suporte Essencial. Você pode escolher um nível mais completo conforme a necessidade da empresa.',
	},
	{
		q: 'Os valores são definitivos?',
		a: 'Os valores exibidos são promocionais de lançamento e valem para os escopos descritos. Funções, integrações ou necessidades adicionais são avaliadas separadamente.',
	},
	{
		q: 'Recebo o código-fonte?',
		a: 'A entrega do código-fonte e o acesso irrestrito ao projeto estão no plano Site Completo com Código, após conclusão e pagamento.',
	},
	{
		q: 'Como funciona a contratação?',
		a: 'Escolha o plano de criação, o nível de suporte, confira o resumo e prossiga. Envie o resumo pelo WhatsApp para confirmar escopo, prazo e condições antes de qualquer pagamento.',
	},
	{
		q: 'O suporte inclui desenvolvimento ilimitado?',
		a: 'Não. O suporte cobre o que está descrito em cada nível. Mudanças estruturais, novas funções complexas e demandas maiores são orçadas à parte.',
	},
];

/** Legado — mantido para compatibilidade com trechos que ainda referenciam */
export const PLAN_CREATION = {
	title: CREATION_PLANS[0].title,
	priceLabel: CREATION_PLANS[0].priceLabel,
	billing: CREATION_PLANS[0].billing,
	billingKey: 'one_time',
	text: CREATION_PLANS[0].text,
	includes: CREATION_PLANS[0].includes,
	note: LAUNCH_SCOPE_NOTE,
	cta: 'Escolher este plano',
};

export const PLAN_MAINTENANCE = {
	title: SUPPORT_TIERS[0].title,
	priceLabel: SUPPORT_TIERS[0].priceLabel,
	billing: 'Assinatura recorrente mensal',
	billingKey: 'monthly',
	recommended: true,
	badge: 'Incluído em todo plano',
	text: SUPPORT_TIERS[0].text,
	includes: SUPPORT_TIERS[0].includes,
	note: SUPPORT_TIERS[0].notes[0],
	cta: 'Assinar suporte',
};

export const CONTACT_SERVICE_OPTIONS = [
	'Site Essencial',
	'Site Personalizado',
	'Site Completo com Código',
	'Suporte Essencial',
	'Suporte Avançado',
	'Suporte Operacional',
	'E-commerce',
	'Automação',
	'Presença digital',
	'Tarefa digital avulsa',
	'Solução personalizada',
];

export const NAV_LINKS = [
	{ href: '/', label: 'Início' },
	{ href: '/servicos', label: 'Serviços' },
	{ href: '/projetos', label: 'Projetos' },
	{ href: '/planos', label: 'Planos' },
	{ href: '/sobre', label: 'Sobre' },
	{ href: '/contato', label: 'Contato' },
];
