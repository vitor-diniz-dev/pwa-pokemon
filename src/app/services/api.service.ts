import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

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
}
