# Objetivo

Descrever como a IA foi utilizada para auxiliar no desenvolvimento do sistema.

# Abordagem

Nem sempre a IA terá a melhor solução para o problema, portanto para destacar o que foi descartado e alterado foram usadas marcações especiais. Texto tachado para as sugestões descartadas e texto de referência para descrever a solução alternativa adotada ou algumas observações sobre a solução.

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

- Ele modifica automaticamente seu projeto:
- Adiciona o arquivo manifest.webmanifest
- Cria o ngsw-config.json (para o Service Worker)
- Registra o Service Worker no main.ts
- Adiciona ícones padrão
- Atualiza angular.json para incluir os assets do PWA
- Ajusta o index.html com meta tags e links de ícones

✅ Depois disso...

3. Faça o build para produção:
   `ng build --configuration production `

4. Sirva a aplicação com um servidor que suporte HTTPS ou use o Angular CLI com PWA localmente:
   ~~`npx http-server dist/seu-app -p 8080`~~

~~Ou instale globalmente:~~
~~`npm install -g http-server`~~
~~`http-server dist/seu-app`~~  
⚠️ O PWA só funciona corretamente em produção ou com um servidor HTTPS.

> O comando que funcionou foi `npx http-server -p 8080 -c-1 dist/pwa-pokemon/browser` justamente por conta da criação da pasta browser pelo comando `ng build`, conforme recomendado pela documentação do [Angular](https://angular.dev/ecosystem/service-workers/getting-started#service-worker-in-action-a-tour)

🧪 Testar como PWA no navegador

1. Abra o app no Google Chrome.
2. Vá até o menu de DevTools (F12).
3. Vá na aba "Application" > seção "Manifest".
4. Clique em “Install” ou use o botão que aparece na barra de endereço.

🔁 Próximos passos (opcional)

- Personalizar os ícones e nome no arquivo manifest.webmanifest.
- Configurar notificações push (usando o Firebase, por exemplo).
- Ajustar o ngsw-config.json para definir regras de cache específicas.

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

## Como aplicar funcionamento offline com cache das chamadas REST em um PWA com Angular?

### Motivo

Aplicar o cache das chamadas REST com o uso do PWA.

### Resposta

Para aplicar funcionamento offline com cache de chamadas REST em um PWA com Angular, o caminho mais direto e suportado oficialmente é usar:

@angular/service-worker, que integra o Service Worker ao seu app Angular, com configuração automática de cache via ngsw-config.json.

✅ ~~1. Adicionar suporte a PWA~~
Se ainda não fez isso:

`ng add @angular/pwa`
Esse comando:

- Instala o @angular/service-worker
- Adiciona o ngsw-config.json
- Registra automaticamente o service worker no main.ts em produção

✅ ~~2. Habilitar o ServiceWorkerModule (já adicionado com ng add)~~
No seu app.module.ts:

```
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
})
export class AppModule {}
```

> Etapas 1 e 2 já haviam sido realizadas ao instalar o PWA ao projeto Angular.

✅ 3. Configurar o cache das chamadas REST
No arquivo ngsw-config.json (na raiz do projeto), adicione uma entrada em "dataGroups":

```
{
  "dataGroups": [
    {
      "name": "poke-api-cache",
      "urls": [
        "https://pokeapi.co/api/v2/**"
      ],
      "cacheConfig": {
        "strategy": "performance", // ou "freshness"
        "maxSize": 50,
        "maxAge": "1d",
        "timeout": "10s"
      }
    }
  ]
}
```

Explicação:

- "urls": define quais requisições serão interceptadas e cacheadas.
- "strategy":
  - "performance": serve do cache primeiro, depois tenta rede (modo offline-friendly).
  - "freshness": rede primeiro, mas usa cache se rede falhar.
- "maxAge": tempo que os dados são válidos (ex: "1d" = 1 dia).
- "maxSize": número de entradas no cache.
- "timeout": usado no modo "freshness".

✅ 4. Build de produção com Service Worker ativado
`ng build --configuration production`  
Ou com `ng deploy`, se usar alguma ferramenta como `angular-cli-ghpages`.

✅ 5. Testar modo offline localmente
Instale o servidor HTTP que simula produção:

```
npm install -g http-server
http-server ./dist/<nome-do-projeto>
```

Acesse http://localhost:8080, navegue uma vez, e depois desligue a internet.

- Você verá que as páginas e dados REST configurados continuarão carregando (se estiverem em cache).

✅ ~~Extras (opcional):~~  
Você pode verificar se o Service Worker está ativo via:

```
constructor(private swUpdate: SwUpdate) {
  if (swUpdate.isEnabled) {
    swUpdate.available.subscribe(() => {
      if (confirm("Nova versão disponível. Atualizar?")) {
        window.location.reload();
      }
    });
  }
}
```

## Qual o código javascript para reconhecer se o browser está online?

### Motivo

Escutar o evento de reconexão para chamar as requisições que falharam por motivo de desconexão.

### Resposta

Você pode usar a propriedade `navigator.onLine` para verificar se o navegador está online, além de escutar eventos de mudança de status de rede (`online` e `offline`). Aqui está um exemplo simples em JavaScript:

```javascript
// Verifica o status atual da conexão
if (navigator.onLine) {
  console.log("O navegador está online.");
} else {
  console.log("O navegador está offline.");
}

// Escuta mudanças no status de conexão
window.addEventListener("online", () => {
  console.log("Conexão restabelecida: navegador está online.");
});

window.addEventListener("offline", () => {
  console.log("Conexão perdida: navegador está offline.");
});
```

- `navigator.onLine` pode não ser 100% confiável, especialmente em redes com _captive portals_ (ex: Wi-Fi público).
- ~~Para uma verificação mais precisa, você pode tentar fazer uma requisição _fetch_ a um servidor confiável e verificar se ela foi bem-sucedida:~~

```javascript
async function checkInternetConnection() {
  try {
    const response = await fetch("https://www.google.com/favicon.ico", { method: "HEAD", mode: "no-cors" });
    console.log("Conexão ativa com a internet.");
  } catch (err) {
    console.log("Sem conexão com a internet.");
  }
}
```

Essa abordagem é útil em PWAs que precisam tratar o status de rede de forma mais robusta. Se quiser ajuda para integrar isso num app Angular ou PWA, posso te ajudar com isso também.
