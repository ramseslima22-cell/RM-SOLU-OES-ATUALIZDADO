# RM Soluções Digitais — projeto independente

## Rodar no computador

Instale Node.js 22.12 ou superior. Abra esta pasta, a que contém este README e o package.json principal, no VS Code.

```sh
npm ci
npm run dev
```

Acesse http://localhost:3000. Para gerar a versão de produção:

```sh
npm run build
npm run preview
```

`dist/` contém os arquivos para hospedagem estática. Para Apache, publique também o `.htaccess` gerado. Há configuração para Vercel na raiz. Domínio e hospedagem não foram alterados nem publicados nesta entrega.

## Onde editar

- Serviços, valores, suporte, contatos, projetos: `apps/web/src/data/rmBrand.js`.
- Página inicial: `apps/web/src/pages/rm/HomePage.jsx`.
- Vídeo: substitua `apps/web/public/media/apresentacao.mp4` por um MP4 H.264 e atualize `apresentacao-poster.jpg`. Mantenha os nomes para dispensar edição de código.
- Cena de apresentação: `apps/web/src/components/rm/PresentationMedia.jsx`.
- Cores, contraste e profundidade CSS: `apps/web/src/index.css`.
- Logo e favicon: `apps/web/public/`.

## O que mudou

Removidos os plugins do editor Horizon, scripts de instrumentação, comunicação com iframe, proxy, APIs de comércio e assinatura da plataforma, autenticação dependente da plataforma, banco PocketBase embarcado, arquivos de ambiente e catálogo antigo de autopeças. React, Vite, Tailwind e Framer Motion são bibliotecas independentes e foram mantidos. As fontes usam fallback local, sem Google Fonts obrigatório.

O projeto agora é um site comercial estático: não tem banco, login, checkout ou cobrança recorrente. Planos e preços foram preservados, assim como a condição atual de suporte mensal obrigatório. A seleção gera um resumo para conversar no WhatsApp. Não há confirmação fictícia de pagamento. Rotas antigas de conta e assinatura levam ao contato.

O formulário valida os campos e prepara uma mensagem; o visitante deve abrir o WhatsApp e confirmar o envio. Não há armazenamento nem envio automático. O contato permanece (21) 97725-8018. Nenhuma mensagem foi enviada durante os testes.

O GIF original foi recuperado e convertido em MP4 local. Ele contém uma captura do próprio site com controles de gravação: isso continua no conteúdo do vídeo, embora a integração esteja corrigida. Substituí-lo por uma animação limpa é o próximo aprimoramento visual. O player inicia sem áudio quando permitido, repete, tem pausa/reprodução, pausa fora da tela e respeita preferência por movimento reduzido. Se autoplay for bloqueado, há botão de reprodução.

Os elementos de profundidade são feitos com CSS 3D e ícones; não há cena WebGL, modelos 3D ou câmera comandada pelo scroll. Isso evita adicionar uma renderização 3D pesada a esta correção.

## Antes de divulgar

Adicionar imagens e links reais dos projetos (não vieram no arquivo). Definir o domínio definitivo antes de gerar sitemap com URLs absolutas; o sitemap relativo inválido foi retirado. Rever comercialmente páginas, revisões, horas de suporte, prazos, cancelamento e custos de terceiros. A oferta atual foi preservada para você decidir essas mudanças com clareza.

Para reativar pagamentos e área do cliente, será necessário implementar um backend independente e integrar o provedor de pagamento, com IDs explícitos de produtos, verificação de preços e webhooks. Remover o Horizon não migra contas, pedidos ou assinaturas antigas. Não cancele serviços existentes antes de organizar essa migração.
