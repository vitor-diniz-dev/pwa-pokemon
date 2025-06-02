import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../../models/pokemon.model';
import { ApiService } from '../../../services/api.service';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon | null = null;
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
    if (this.pokemon?.name)
      this.favorited = this.pokemonService
        .currentFavoritedPokemons()
        .includes(this.pokemon?.name);
  }

  // Recupera as demais informações do Pokemon além de seu nome
  getPokemon() {
    // Caso o Pokemon já tenha suas informações carregadas (através da pesquisa por nome), não faz a requisição novamente
    if (this.pokemon?.name && (!this.pokemon.sprites || !this.pokemon?.id)) {
      this.loading = true;
      this.api.getPokemon(this.pokemon.name).subscribe({
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
    if (this.pokemon?.name)
      this.pokemonService.saveFavoritedPokemon(this.pokemon.name);
  }

  // Remove o nome do Pokemon favorito no Local Storage através do LocalStorageService
  private removeFavoritedPokemon() {
    if (this.pokemon?.name)
      this.pokemonService.removeFavoritedPokemon(this.pokemon.name);
  }
}
