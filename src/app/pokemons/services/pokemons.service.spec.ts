import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { PokemonsService } from './pokemons.service';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';
import { catchError } from 'rxjs';

const mockPokeResponse: PokeAPIResponse = {
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
  "previous": null,
  "results": [
      {
          "name": "bulbasaur",
          "url": "https://pokeapi.co/api/v2/pokemon/1/"
      },
      {
          "name": "ivysaur",
          "url": "https://pokeapi.co/api/v2/pokemon/2/"
      }
  ]
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' }
];

const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
}

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', async () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
    expect(req.request.method).toBe('GET');

    // Establecer el mock de respuesta
    req.flush(mockPokeResponse);
  });


  it('should load a page 5 of Pokemos', async () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=80`);
    expect(req.request.method).toBe('GET');

    // Establecer el mock de respuesta
    req.flush(mockPokeResponse);
  });

  it('should load a Pokemon by ID', async () => {
    service.loadPokemon(mockPokemon.id).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon as any);
      expect(pokemon.id).toBe(mockPokemon.id);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${mockPokemon.id}`);
    expect(req.request.method).toBe('GET');

    // Establecer el mock de respuesta
    req.flush(mockPokemon);
  });

  it('should load a Pkemon by Name', async () => {
    service.loadPokemon(mockPokemon.name).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon as any);
      expect(pokemon.name).toBe(mockPokemon.name);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${mockPokemon.name}`);
    expect(req.request.method).toBe('GET');

    // Establecer el mock de respuesta
    req.flush(mockPokemon);
  });

  // Disparar errores
  it('should load a Pokemon by ID', async () => {
    service.loadPokemon(mockPokemon.id).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon as any);
      expect(pokemon.id).toBe(mockPokemon.id);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${mockPokemon.id}`);
    expect(req.request.method).toBe('GET');

    // Establecer el mock de respuesta
    req.flush(mockPokemon);
  });

  it('should catch error if the Pokemon does not exist', async () => {
    const pokemonName = 'unknown-pokemon';
    service.loadPokemon(pokemonName)
    .pipe(
      catchError((err) => {
        expect(err.message).toContain('Pokemons not found');
        return [];
      })
    )
    .subscribe();

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    expect(req.request.method).toBe('GET');

    // Establecer el mock de respuesta
    req.flush('Pokemons not found', {
      status: 404,
      statusText: 'Not Found'
    });
  });

});
