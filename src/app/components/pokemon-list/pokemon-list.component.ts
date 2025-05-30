import { Component } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

const idsDefault = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent, CommonModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  // Nome do Pokemon a ser pesquisado
  protected pokemonSearchName: string = '';
  protected pokemonSearched: string = '';
  protected pokemonIds: number[] = idsDefault;

  constructor(private api: ApiService) {}

  // Pesquisa o Pokemon pelo nome inserido no input
  protected searchPokemon() {
    this.pokemonSearched = this.pokemonSearchName;
    this.api.getPokemon(this.pokemonSearchName).subscribe({
      next: (res) => {
        this.pokemonIds = [res.id];
      },
      error: () => {
        this.pokemonIds = [];
      },
    });
  }
}
