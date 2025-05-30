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
  @Input() id: number = 1;
  protected pokemon: Pokemon | null = null;
  // Se o Pokemon foi marcado como favorito
  protected favorited: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    this.api.getPokemon(this.id).subscribe((res) => {
      this.pokemon = res;
    });
  }

  // Marca ou desmarca o Pokemon como favorito
  protected favoritePokemon() {
    this.favorited = !this.favorited;
  }
}
