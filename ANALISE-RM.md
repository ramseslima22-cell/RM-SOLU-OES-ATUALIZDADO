# Avaliação da RM Soluções Digitais

## Direção recomendada

Continue com a RM como parceira de pequenos negócios em sites, lojas virtuais, automação e suporte. A base azul-escura e ciano comunica tecnologia, os contatos estão claros e há uma estrutura comercial aproveitável. O principal problema é a hierarquia: a página oferece seis serviços, três planos de criação, três suportes e oito tarefas avulsas. Isso dilui a especialidade antes de demonstrar capacidade.

Minha recomendação editorial é manter os planos e preços públicos, mas conduzir a contratação por uma conversa de escopo. Para o momento em que você ainda está moldando a operação, o site deve gerar contatos qualificados. Um carrinho não resolve a definição de entregáveis de um projeto personalizado.

## Preços e suporte

| Oferta atual | Leitura e proposta |
| --- | --- |
| Essencial: R$350 + R$100/mês | Manter como entrada de lançamento com escopo fechado. Especificar páginas/seções, material do cliente, revisões e prazo. |
| Personalizado: R$500 + R$100/mês | Apenas R$150 de diferença compra uma promessa muito maior. Restringir a personalização ou recalcular com suas horas reais antes de ampliar a oferta. |
| Completo com Código: R$1.000 + R$100/mês | Código-fonte é uma condição de entrega, mas o cliente precisa entender o resultado. Recomendo avaliar nome como “Projeto sob medida”, sem sugerir que qualquer sistema cabe em R$1.000. |
| Suporte R$100, R$300 e a partir de R$500/mês | Separar manutenção do site, evolução e apoio operacional. Definir horas/solicitações, prazo de resposta, computadores/visitas, agendamento e excedentes. |

Não alterei preços nem tornei o suporte opcional. Para um modelo de site gerenciado, uma mensalidade obrigatória pode fazer sentido, desde que fique explícito o que ela mantém. Para projeto com código entregue e hospedagem controlada pelo cliente, recomendo avaliar suporte opcional. Isso é uma decisão comercial a tomar antes de mudar o contrato.

O texto atual repete que o suporte está “incluído”, embora custe mais R$100. Recomendo comunicar “criação + acompanhamento mensal” com valores separados. Domínio, hospedagem, licenças, taxas e mídia paga precisam aparecer no orçamento; os termos atuais dizem que são do cliente, salvo acordo escrito.

Evite transformar R$300 mensais em compromisso aberto de tráfego, suporte técnico e alterações. Você também trabalha durante o dia: o pacote deve caber na sua disponibilidade. Não prometa atendimento imediato ou resultados de venda sem estrutura para isso.

## Achados concretos no arquivo original

1. Mídia: variável de vídeo vazia e fallback para GIF externo de 11,4 MiB. A imagem só fica visível após carregar e não há tratamento de erro no GIF. O arquivo é uma gravação da própria página, produzindo efeito de tela dentro da tela; a primeira imagem contém controles da gravação.
2. Visual 3D: havia gradientes, animações de entrada e flutuação, mas não uma cena tridimensional estruturada.
3. Checkout: busca por palavras e, sem correspondência, usa o primeiro produto não recorrente. Assim, o título mostrado pode ser do plano selecionado e o preço/ID de outro produto. Também há fallback semelhante no suporte.
4. Formulário: grava em PocketBase e usa noValidate, desativando a validação nativa apesar de marcar campos required.
5. Portfólio: cartões com nomes e gradientes, sem imagens ou links de demonstração. O título prometia soluções “em funcionamento”. Não há material suficiente no ZIP para criar estudos de caso reais.
6. Prova social: “Mais escolhido” não é sustentado por dados no arquivo. Alterado para “Recomendado pela RM”. Não se deve inventar depoimentos nem métricas.
7. Texto técnico visível: resumo dos planos expunha configuração de catálogo, Stripe e limitações do checkout ao visitante.
8. Infraestrutura: o export inclui editor visual, scripts de interceptação de erros/fetch, APIs específicas, banco/binário e catálogo de autopeças sem relação com a oferta atual.
9. SEO: sitemap com caminhos relativos, sem domínio absoluto. Retirado até definir domínio.

## O que foi aplicado

- Base independente, sem endpoints nem mídia hospedada pelo Horizon.
- Mídia local convertida para MP4 de aproximadamente 376 KiB; redução aproximada de 97% em relação ao GIF. Mesmo conteúdo visual, nova entrega.
- Player inline, loop sem áudio, controle de pausa, poster e fallback.
- Composição com profundidade CSS e cartões de sites, loja e automação.
- Texto inicial mais concreto e portfólio antes dos planos.
- Suporte resumido na página inicial; tarefas avulsas em Serviços.
- Fluxo de planos pelo WhatsApp, com resumo preservado e sem cobrança.
- Formulário com validação e confirmação explícita de que ainda falta enviar no WhatsApp.
- Remoção do carrinho, autenticação e assinatura da plataforma; não são funcionalidades migradas.
- Contraste dos textos secundários reforçado, marca e favicon preservados.

## Próxima evolução visual e comercial

Prioridade 1: duas ou três demonstrações reais, com imagem, link, objetivo do cliente e o que foi entregue. Um trabalho próprio pode ser apresentado como projeto próprio.

Prioridade 2: definir escopos por resultado — apresentar empresa, vender produtos, automatizar atendimento — e tabela objetiva de suporte. E-commerce e automações devem ter orçamento próprio quando o escopo varia.

Prioridade 3: substituir a gravação por um vídeo limpo, curto, mostrando site, loja e fluxo de atendimento. Para uma versão cinematográfica com modelos e câmera 3D, planejar uma etapa própria e testar em celular e hardware simples. A estética deve reforçar a demonstração, mantendo textos e WhatsApp fáceis de usar.

Esta avaliação se baseia no código e na mídia anexados, além do contexto da RM já compartilhado. Não é auditoria de conversão com dados de visitantes nem prova de desempenho da versão publicada.
