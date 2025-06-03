import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Requisição pendente para ser reenviada quando o usuário voltar a estar online
  private pendingRequest: (() => void) | null = null;

  constructor(private httpClient: HttpClient) {
    this.listenToOnlineEvent();
  }

  // Escuta o evento de reconexão com a internet para reenviar requisições pendentes
  listenToOnlineEvent() {
    window.addEventListener('online', () => {
      console.log('Você está online novamente!');
      if (this.pendingRequest) {
        console.log('Reenviando requisição pendente...');
        this.pendingRequest();
        this.pendingRequest = null;
      }
    });
  }

  // Obtem uma lista de Pokemons com paginação
  getPokemons(
    offset = 0,
    limit = 20
  ): Observable<{ results: { name: string }[]; count: number }> {
    return this.httpClient.get<{ results: { name: string }[]; count: number }>(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );
  }

  // Obtem um Pokemon específico pelo ID ou por seu nome
  getPokemon(pokemon: number | string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(
      'https://pokeapi.co/api/v2/pokemon/' + pokemon
    );
  }

  // Adiciona uma requisição como pendente para ser executada quando o usuário voltar a estar online
  addPendingRequest(request: () => void): void {
    this.pendingRequest = request;
  }
}
