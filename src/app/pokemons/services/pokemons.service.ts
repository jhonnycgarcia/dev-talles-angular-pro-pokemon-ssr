import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {

    /**
     * @description Si la página es 0 se decrementa para que el API de PokeAPI
     */
    if(page === 0) { --page; }

    page = Math.max(0, page);

    return this.http.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 10}`)
      .pipe(
        map((res) => {
          const simplePokemons: SimplePokemon[] = res.results.map(
            (row) => ({
              id: row.url.split('/').at(-2) ?? '',
              name: row.name
            })
          );

          return simplePokemons;
        }),
        tap((pokemons) => console.log('pokemons', pokemons))
      );
  }

}
