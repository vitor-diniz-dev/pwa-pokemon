import { Component } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    PokemonCardComponent,
    CommonModule,
    FormsModule,
    NgbPaginationModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  // Nome do Pokemon a ser pesquisado
  protected pokemonSearchName: string = '';
  protected pokemonSearched: string = '';
  protected pokemons: string[] = [];

  protected pagination = {
    page: 1,
    pageSize: 10,
    collectionSize: 0,
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getPokemons();
  }

  // Obtem a lista de Pokemons com base na paginação
  protected getPokemons() {
    const offset = (this.pagination.page - 1) * this.pagination.pageSize;

    this.api.getPokemons(offset, this.pagination.pageSize).subscribe({
      next: (res) => {
        this.pagination.collectionSize = res.count;
        this.pokemons = []; // Limpa a lista de Pokemons antes de adicionar novos
        for (let pokemon of res.results) {
          this.pokemons.push(pokemon.name);
        }
      },
    });
  }

  // Pesquisa o Pokemon pelo nome inserido no input
  protected searchPokemon() {
    this.pokemonSearched = this.pokemonSearchName;
    this.api.getPokemon(this.pokemonSearchName).subscribe({
      next: (res) => {
        this.pokemons = [res.name];
      },
      error: () => {
        this.pokemons = [];
      },
    });
  }
}
