# PwaPokemon

Esse projeto se trata de uma SPA (Single Page Application) em Angular 18+ que consome uma API pública e funciona como um PWA (Progressive Web App) com suporte offline e sincronização. Ele foi criado como solução para um teste técnico.

## Instruções para execução

**Pré-requisitos**

- Angular 19.2.14
- Node.js 22.15.1

1. Clone o projeto em sua máquina.
2. Instale as depêndencias do projeto executando o comando `npm install` na raiz do projeto.
3. Faça o build em produção através do comando `ng build --configuration production`.
4. Inicialize o PWA através do comando `npx http-server -p 8080 -c-1 dist/pwa-pokemon/browser`.
5. No navegador Chrome, navegue até a url: `http://localhost:8080`.
6. Para instalar o app, clique no botão de instalação que aparece ao final da barra de pesquisa do navegador.
