import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent implements OnInit {

  private pokemonSrv = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

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
    this.pokemonSrv.loadPage(nextPage)
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  // ngOnDestroy(): void {
  //   // this.$appState.unsubscribe();
  // }

}
