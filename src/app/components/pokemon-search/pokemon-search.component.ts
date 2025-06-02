import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-search',
  imports: [FormsModule],
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.scss',
})
export class PokemonSearchComponent {
  protected pokemonSearchName: string = '';
  @Output() pokemonSearched: EventEmitter<string> = new EventEmitter<string>();
}
