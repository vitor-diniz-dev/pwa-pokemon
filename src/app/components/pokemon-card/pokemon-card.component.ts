import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() id: number = 1;
  protected pokemon: Pokemon | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    this.api.getPokemon(this.id).subscribe((res) => {
      this.pokemon = res;
      console.log(this.pokemon);
    });
  }
}
