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

## Instruções para testes offline

1. Abra o app instalado ou atualmente em execução no localhost.
2. Navegue por determinadas páginas da listagem. As requisições executadas por essas páginas devem ser aquelas armazenadas em cache após o app ficar offline.
3. Para habilitar o offline, acesse as ferramentas de desenvolvedor do navegador (F12 para o Chrome).
4. Acesse a aba Network.
5. Clique no ícone de rede, representado por 3 barras curvas ![ícone de rede](public/images/image.png).
6. Modifique a seleção 'Network throttling' para **Offline**.
7. Ao navegar pelas páginas e Pokémons anteriormente buscados, eles deverão ser exibidos normalmente, sendo recuperados do cache. Enquanto as demais páginas e Pokémons não pesquisados apresentarão uma mensagem de erro ao carregar.
8. Habilite a conexão novamente, alterando a seleção para **No throttling**.
9. Agora online, os Pokémons devem ser carregados automáticamente.
