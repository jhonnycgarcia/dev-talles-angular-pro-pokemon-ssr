import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

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
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id') ?? '';
    if(!id) { return; }

    this.pokemonSrv.loadPokemon(id)
      .pipe(
        tap((pokemon) => {

          const pageTitle = `#${pokemon.id} - ${pokemon.name}`;
          const pageDescription = `Página del Pokemon ${pageTitle}`;
          const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

          this.title.setTitle(`Pokemon SSR - ${pageTitle}`);
          this.meta.updateTag({ name: 'description', content:  pageDescription});

          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({ name: 'og:description', content:  pageDescription});
          this.meta.updateTag({ name: 'og:image', content: pokemonImage });

        })
      )
      .subscribe((pokemon) => this.pokemon.set(pokemon));
  }

}
