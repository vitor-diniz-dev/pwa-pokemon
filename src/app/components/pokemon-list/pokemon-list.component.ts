import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonSearchComponent } from '../pokemon-search/pokemon-search.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    PokemonCardComponent,
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    PokemonSearchComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PokemonListComponent {
  // Nome do Pokemon a ser pesquisado
  protected pokemonSearched: string = '';
  protected pokemons: Pokemon[] = [];

  // Objeto de paginação para controlar a paginação da lista de Pokemons
  protected pagination = {
    page: 1,
    pageSize: 24,
    collectionSize: 0,
  };

  // Variável para controlar o estado de carregamento da lista de Pokemons, gerando o efeito de loading
  protected loadingPokemonList: boolean = false;

  // Dica apresentada
  protected dica: string = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getPokemons();
  }

  // Obtem a lista de Pokemons com base na paginação
  protected getPokemons() {
    const offset = (this.pagination.page - 1) * this.pagination.pageSize;

    this.loadingPokemonList = true;
    this.pokemons = []; // Limpa a lista de Pokemons antes de adicionar novos
    this.api.getPokemons(offset, this.pagination.pageSize).subscribe({
      next: (res) => {
        this.pagination.collectionSize = res.count;
        for (let pokemon of res.results) {
          this.pokemons.push({ name: pokemon.name });
        }
      },
      error: () => {
        this.loadingPokemonList = false;
        this.pokemons = [];
        this.pagination.collectionSize = 0;
        this.dica =
          'Não foi possível carregar a lista de Pokémons. Tente novamente mais tarde.';
      },
      complete: () => {
        this.loadingPokemonList = false;
      },
    });
  }

  protected getPokemon() {
    this.api.getPokemon(this.pokemonSearched).subscribe({
      next: (res) => {
        this.pokemons = [res];
      },
      error: () => {
        this.loadingPokemonList = false;
        this.dica = `Não foi encontrado Pokémon com o nome "${this.pokemonSearched}"`;
      },
      complete: () => {
        this.loadingPokemonList = false;
      },
    });
  }

  // Pesquisa o Pokemon pelo nome inserido no input
  protected searchPokemon(pokemonName: string) {
    this.loadingPokemonList = true;
    this.pokemonSearched = pokemonName;
    this.pokemons = [];

    // Se campo de pesquisa estiver vazio, busca todos os Pokemons
    this.pokemonSearched ? this.getPokemon() : this.getPokemons();
  }
}
