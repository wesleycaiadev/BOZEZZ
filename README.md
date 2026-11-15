# BOZEZZ Barbearia

Micropágina em HTML, CSS e JavaScript puro, baseada no design aprovado. Não precisa de framework, instalação de pacotes ou etapa de build.

Repositório: [wesleycaiadev/BOZEZZ](https://github.com/wesleycaiadev/BOZEZZ).

## Abrir

Abra `index.html` no navegador ou use um servidor estático local, como o Live Server do editor. Para hospedar, envie `index.html`, `styles.css`, `script.js` e a pasta `assets/`, preservando os caminhos. O envio ao GitHub disponibiliza o código; a hospedagem do site ainda não foi configurada.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Conteúdo e os três links principais |
| `styles.css` | Visual, fontes locais, responsividade e foco |
| `script.js` | Abrir/fechar privacidade e atualizar o ano |
| `assets/` | Logo original, fontes WOFF2 e respectivas licenças |

Os materiais antigos e o ZIP do design aprovado permanecem na pasta local `arquivo/`, ignorada pelo Git. Eles não fazem parte do site nem do repositório.

## Destinos

1. Agendamento: https://cashbarber.com.br/bozezzbarbearia/inicio
2. Avaliação: https://search.google.com/local/writereview?placeid=ChIJeexkuOizGgcRpSuml3Wcl9c
3. Rota: https://www.google.com/maps/dir/?api=1&destination=Bozezz%20Barbearia&destination_place_id=ChIJeexkuOizGgcRpSuml3Wcl9c

Os links estão diretamente no HTML; não é necessário alterar o JavaScript para atualizá-los. O Place ID foi obtido do identificador da ficha fornecida e sua resolução no Maps foi conferida contra o mesmo identificador de estabelecimento e nome BOZEZZ. O link de avaliação redireciona ao login do Google quando o visitante não está autenticado. A tela de publicação após login não foi testada e nenhuma avaliação foi escrita ou enviada.

As ações navegam na mesma aba, permitindo retornar pelo botão Voltar. Não há iframe de mapas ou plataforma de agendamento incorporada.

## Privacidade e acessibilidade

Não há analytics, pixels, cookies, armazenamento local, formulários ou fontes carregadas de terceiros. Por isso, não há banner de cookies. A hospedagem ainda precisa ser escolhida; confirmar seus logs, retenção, operadores e canal de contato antes de publicar uma política definitiva.

O aviso de privacidade usa um diálogo nativo, com fechamento por botão, Escape ou clique fora, foco inicial no título e retorno ao botão ao fechar. As ações principais usam links comuns e continuam funcionando sem JavaScript; nesse caso, o aviso aparece como conteúdo de texto abaixo da página.

Botões com altura mínima de 60 px, gap de 12 px, foco visível, fontes locais e layout sem animações. O texto pode quebrar em mais linhas com zoom ou aumento da fonte. A logo de 150 × 150 px foi preservada e ainda deve ser substituída pela arte oficial de maior resolução antes de uma produção final.

## Fontes

Playfair Display e Inter, armazenadas localmente em WOFF2, sob SIL Open Font License. Licenças em `assets/fonts/`. Origem: repositório oficial [Google Fonts](https://github.com/google/fonts) e distribuição oficial `fonts.gstatic.com`.

## Verificação

A sintaxe do JavaScript foi validada, os seis recursos do site responderam HTTP 200 em um servidor local temporário e as três ações, os IDs e as referências de acessibilidade foram conferidos. Os arquivos de fonte têm assinatura WOFF2 válida.

Agendamento e rota responderam HTTP 200. O Google Maps resolveu o Place ID para o mesmo identificador da ficha fornecida. A avaliação direcionou ao login do Google, preservando o destino de escrita da avaliação. Os formatos de rota seguem a [documentação do Google Maps](https://developers.google.com/maps/documentation/urls/get-started).

O teste visual automatizado no Edge foi interrompido pela ferramenta por não conseguir confirmar a URL atual do navegador; a aparência e o comportamento completo em navegador e celular real ainda precisam de conferência.
