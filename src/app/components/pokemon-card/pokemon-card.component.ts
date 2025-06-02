import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() name?: string;
  protected pokemon: Pokemon | null = null;
  // Se o Pokemon foi marcado como favorito
  protected favorited: boolean = false;

  protected loading: boolean = false;

  constructor(
    private api: ApiService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.getPokemon();
    this.checkIfFavorited();
  }

  // Confere se o Pokemon já foi marcado como favorito
  checkIfFavorited() {
    if (this.name)
      this.favorited = this.pokemonService
        .currentFavoritedPokemons()
        .includes(this.name);
  }

  getPokemon() {
    if (this.name) {
      this.loading = true;
      this.api.getPokemon(this.name).subscribe({
        next: (res) => {
          this.pokemon = res;
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  // Marca ou desmarca o Pokemon como favorito
  protected favoritePokemon(event?: MouseEvent) {
    // Previne o comportamento do clique no botão de favorito propague para a div do card
    event?.stopPropagation();

    this.favorited = !this.favorited;

    this.favorited
      ? this.saveFavoritedPokemon()
      : this.removeFavoritedPokemon();
  }

  // Salva o nome do Pokemon favorito no Local Storage através do LocalStorageService
  private saveFavoritedPokemon() {
    if (this.name) this.pokemonService.saveFavoritedPokemon(this.name);
  }

  // Remove o nome do Pokemon favorito no Local Storage através do LocalStorageService
  private removeFavoritedPokemon() {
    if (this.name) this.pokemonService.removeFavoritedPokemon(this.name);
  }
}
