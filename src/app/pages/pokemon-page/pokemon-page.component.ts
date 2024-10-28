import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonPageComponent implements OnInit {

  public pokemon = signal<Pokemon | null>(null);

  private route = inject(ActivatedRoute);
  private pokemonSrv = inject(PokemonsService);

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id') ?? '';
    if(!id) { return; }

    this.pokemonSrv.loadPokemon(id)
      .subscribe((pokemon) => this.pokemon.set(pokemon));
  }

}
