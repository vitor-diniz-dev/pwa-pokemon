# Objetivo

Descrever como a IA foi utilizada para auxiliar no desenvolvimento do sistema.

# Abordagem

Nem sempre a IA terá a melhor solução para o problema, portanto para destacar o que foi descartado e alterado foram usadas marcações especiais. Texto tachado para as sugestões descartadas e texto em itálico para descrever a solução alternativa adotada.

\*IA utilizada: ChatGPT

# Prompts

Prompts utilizados para obter as respostas necessárias.

## O que seria uma PWA?

### Motivo

Compreender melhor o que seria um PWA.

### Resposta

Uma PWA (Progressive Web App) é um tipo de aplicação web que utiliza tecnologias modernas para oferecer experiências semelhantes às de um aplicativo nativo, mas que roda no navegador. Ela combina o melhor da web com o melhor dos apps mobile.

🧠 Em resumo:
PWA = Site + Comportamento de App

✅ Principais características de uma PWA:
Recurso Explicação
Instalável Pode ser "instalado" no dispositivo (desktop ou mobile), como um app.
Offline Funciona mesmo sem conexão com a internet (graças ao Service Worker).
Rápida Usa cache para carregar rapidamente após o primeiro acesso.
Responsiva Funciona bem em telas de todos os tamanhos (PC, tablet, celular).
Notificações push Pode enviar notificações, como apps nativos (com permissão do usuário).
Segura (HTTPS) Roda sob HTTPS, garantindo segurança e privacidade.
Atualizável Sempre acessa a versão mais recente disponível automaticamente.

🛠️ Tecnologias comuns usadas em PWAs:
Service Workers – para cache e funcionamento offline.

Manifesto Web (manifest.json) – define ícone, nome, tema, comportamento ao instalar.

HTTPS – obrigatório para segurança.

Cache Storage + IndexedDB – para armazenamento local.

📱 Exemplo prático
Um site como o Twitter Lite é uma PWA.
Você pode:

Usar pelo navegador normalmente.

Instalar no seu celular como um app.

Usar mesmo sem internet (com limitações).

🚀 Benefícios
Melhora a experiência do usuário

Reduz custos: você não precisa criar apps separados para Android, iOS e Web.

Facilita manutenção e distribuição: atualizações são feitas diretamente no servidor.

---

Se você quiser transformar seu app Angular em uma PWA, posso te mostrar como com um único comando. Quer ver?

## Sim (descrição de como criar um PWA com Angular)

### Motivo

Compreender como criar um app PWA utilizando Angular.

### Resposta

✅ Passo a passo para tornar seu app Angular uma PWA:

1. Vá até o diretório do seu projeto Angular:
   `cd meu-app-angular`
2. Execute o comando para adicionar suporte a PWA:
   `ng add @angular/pwa`

💡 O que esse comando faz:
-Ele modifica automaticamente seu projeto:
-Adiciona o arquivo manifest.webmanifest
-Cria o ngsw-config.json (para o Service Worker)
-Registra o Service Worker no main.ts
-Adiciona ícones padrão
-Atualiza angular.json para incluir os assets do PWA
-Ajusta o index.html com meta tags e links de ícones

✅ Depois disso...

3. Faça o build para produção:
   `ng build --configuration production `

4. Sirva a aplicação com um servidor que suporte HTTPS ou use o Angular CLI com PWA localmente:
   ~~`npx http-server dist/seu-app -p 8080`~~

~~Ou instale globalmente:~~
~~`npm install -g http-server`~~
~~`http-server dist/seu-app`~~
⚠️ O PWA só funciona corretamente em produção ou com um servidor HTTPS.

_O comando que funcionou foi `npx http-server -p 8080 -c-1 dist/pwa-pokemon/browser` justamente por conta da criação da pasta browser pelo comando `ng build`, conforme recomendado pela documentação do [Angular](https://angular.dev/ecosystem/service-workers/getting-started#service-worker-in-action-a-tour)_

🧪 Testar como PWA no navegador

1. Abra o app no Google Chrome.
2. Vá até o menu de DevTools (F12).
3. Vá na aba "Application" > seção "Manifest".
4. Clique em “Install” ou use o botão que aparece na barra de endereço.

🔁 Próximos passos (opcional)
-Personalizar os ícones e nome no arquivo manifest.webmanifest.
-Configurar notificações push (usando o Firebase, por exemplo).
-Ajustar o ngsw-config.json para definir regras de cache específicas.

## Adicionar delay a uma request usando o rxjs

### Motivo

Testar a mudança de estado de certos componentes entre status de carregando e carregado, assim como a apresentação posterior de suas respectivas mensagens de erro.

### Resposta

Para adicionar delay a uma requisição HTTP no Angular, você pode usar operadores do RxJS como delay, delayWhen, ou até timer. Isso é útil para simular latência ou criar efeitos visuais com loaders, por exemplo.

✅ Exemplo com delay
🔹 Serviço Angular (HttpClient + delay)

```

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(delay(1000)); // Delay de 1 segundo
  }
}
```

🧪 Como usar no componente

```

this.pokemonService.getPokemon('pikachu').subscribe(data => {
  console.log('Pokémon recebido após 1 segundo:', data);
});
```

~~🧠 Outros operadores úteis para delay~~

~~🔸 delayWhen (para delays dinâmicos)~~

~~import { of, timer } from 'rxjs';~~
~~import { delayWhen } from 'rxjs/operators';~~

~~getPokemon(name: string) {
~~ return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(delayWhen(() => timer(2000)));~~
