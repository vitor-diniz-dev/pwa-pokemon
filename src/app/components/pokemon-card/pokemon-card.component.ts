import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

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

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    if (this.name) {
      this.api.getPokemon(this.name).subscribe((res) => {
        this.pokemon = res;
      });
    }
  }

  // Marca ou desmarca o Pokemon como favorito
  protected favoritePokemon() {
    this.favorited = !this.favorited;
  }
}
