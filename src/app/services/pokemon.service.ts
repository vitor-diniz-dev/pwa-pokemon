import { Injectable } from '@angular/core';
import { LocalStorageKeys, LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private localStorage: LocalStorageService) {}

  currentFavoritedPokemons = (): string[] =>
    this.localStorage.getData(LocalStorageKeys.favoritedPokemon) || [];

  // Salva o nome do Pokemon a lista de favoritos, se ainda não salvo
  saveFavoritedPokemon(name: string): void {
    // Verifica se o nome já está na lista de favoritos antes de adicionar
    if (!this.currentFavoritedPokemons().includes(name))
      this.localStorage.saveData(LocalStorageKeys.favoritedPokemon, [
        ...this.currentFavoritedPokemons(),
        name,
      ]);
  }

  // Remove o nome da lista de favoritos
  removeFavoritedPokemon(name: string): void {
    this.localStorage.saveData(
      LocalStorageKeys.favoritedPokemon,
      this.currentFavoritedPokemons().filter(
        (pokemon: string) => pokemon !== name
      )
    );
  }
}
