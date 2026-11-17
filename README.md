# BOZEZZ Barbearia

Micropágina em HTML, CSS e JavaScript puro, baseada no design aprovado. Não precisa de framework, instalação de pacotes ou etapa de build.

Repositório: [wesleycaiadev/BOZEZZ](https://github.com/wesleycaiadev/BOZEZZ).

## Abrir

Abra `index.html` no navegador ou use um servidor estático local, como o Live Server do editor. Para hospedar somente a página principal, envie `index.html`, `styles.css`, `script.js` e a pasta `assets/`, preservando os caminhos. Para executar também `/qr`, publique o repositório na Vercel incluindo `api/` e `vercel.json`, conforme a configuração abaixo.

## Rota estável do QR Code na Vercel

O QR Code impresso deve apontar para **https://bozezz.vercel.app/qr**. A Vercel encaminha internamente `/qr` para a função `api/qr.js`, que devolve HTTP **307**, cabeçalho `Location` e corpo vazio. Não há tela, HTML, JavaScript de redirecionamento nem alteração na página principal.

O destino padrão é `https://bozezz.vercel.app/`. Para mudar o destino:

1. Na Vercel, abra o projeto BOZEZZ e acesse **Settings → Environment Variables**.
2. Defina `QR_REDIRECT_URL` com uma URL completa HTTP(S), por exemplo `https://bozezz.vercel.app/`.
3. Selecione **Production** e faça um novo deploy. Mudanças de variável só entram em novos deployments, conforme a [documentação da Vercel](https://vercel.com/docs/environment-variables).

O endereço impresso continua sendo `/qr`; não é necessário gerar outro QR Code. A variável é lida exclusivamente no servidor a cada requisição, sem prefixo `NEXT_PUBLIC_`. Uma variável ausente ou vazia usa o padrão. Uma URL inválida responde 500 sem redirecionar. Não configure como destino o próprio `/qr`, para evitar um ciclo de redirecionamentos. `Cache-Control: no-store` evita guardar um destino antigo no navegador ou CDN.

Este repositório continua em HTML/CSS/JavaScript, conforme confirmado. A rota é uma [Vercel Function Node.js](https://vercel.com/docs/functions/runtimes/node-js), mapeada por `vercel.json`, sem migração para Next.js. Um servidor de arquivos estáticos como Live Server não executa essa função; para testar a integração de deploy, use a Vercel com **Framework Preset: Other**, raiz neste repositório e sem diretório de saída personalizado.

Teste automatizado, sem instalar dependências (validado com Node.js 24):

```sh
node --test --test-isolation=none tests/qr.test.cjs
```

Após o deploy, confira a primeira resposta sem seguir o redirecionamento:

```sh
curl -I https://bozezz.vercel.app/qr
```

O resultado esperado é `307` com `Location: https://bozezz.vercel.app/` (ou o valor de `QR_REDIRECT_URL`).

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Conteúdo e os três links principais |
| `styles.css` | Visual, fontes locais, responsividade e foco |
| `script.js` | Abrir/fechar privacidade e atualizar o ano |
| `assets/` | Logo original, fontes WOFF2 e respectivas licenças |
| `api/qr.js` | Resposta HTTP 307 com destino configurável no servidor |
| `vercel.json` | Encaminhamento interno de `/qr` para a função |
| `.env.example` | Exemplo da variável `QR_REDIRECT_URL` |
| `tests/qr.test.cjs` | Testes HTTP da função e conferência do mapeamento |

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
