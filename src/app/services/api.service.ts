import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // Obtem um Pokemon específico pelo ID ou por seu nome
  getPokemon(pokemon: number | string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(
      'https://pokeapi.co/api/v2/pokemon/' + pokemon
    );
  }
}
