import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'

import { SimplePokemon } from '../../pokemons/interfaces';

import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent,
    RouterLink
  ],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent {

  public pokemons = signal<SimplePokemon[]>([]);
  private pokemonSrv = inject(PokemonsService);

  private route = inject(ActivatedRoute);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1' ),
      map((page) => (isNaN(+page) ? 1 : +page) ),
      map((page) => Math.max(1, page) )
    )
  );

  public loadOnPageChange = effect(() => {
    console.log('Página cambio a ', this.currentPage());
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true
  });

  public loadPokemons(nextPage: number = 0): void {

    this.pokemonSrv.loadPage(nextPage)
      .pipe(
        // tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pókemos SSR - Página ${nextPage}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

}
