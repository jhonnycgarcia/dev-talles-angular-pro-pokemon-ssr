import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { PokemonsService } from './pokemons.service';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';

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

});
