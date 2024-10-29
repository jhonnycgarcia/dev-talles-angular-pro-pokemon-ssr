import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {

    /**
     * @description Si la página es 0 se decrementa para que el API de PokeAPI
     */
    if(page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`)
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
        // tap((pokemons) => console.log('pokemons', pokemons))
      );
  }

  public loadPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        catchError(this.handlerError)
      );
  }

  private handlerError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.log('An error occurred', error.error);
    } else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    const errorMessage = error.error || 'An error occurred';
    return throwError(() => new Error(errorMessage));
  }

}
