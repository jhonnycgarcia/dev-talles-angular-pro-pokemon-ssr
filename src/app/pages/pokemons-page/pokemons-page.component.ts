import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'

import { SimplePokemon } from '../../pokemons/interfaces';

import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent implements OnInit {

  public pokemons = signal<SimplePokemon[]>([]);
  private pokemonSrv = inject(PokemonsService);
  private route = inject(ActivatedRoute);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1' ),
      map((page) => (isNaN(+page) ? 1 : +page) ),
      map((page) => Math.max(1, page) )
    )
  );

  // public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // })

  ngOnInit(): void {
    // setTimeout(() => {
    //     this.isLoading.set(false);
    // }, 5000);
    this.loadPokemons();
  }

  public loadPokemons(nextPage: number = 0): void {
    const pageToLoad = this.currentPage()! + nextPage;

    this.pokemonSrv.loadPage(pageToLoad)
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  // ngOnDestroy(): void {
  //   // this.$appState.unsubscribe();
  // }

}
