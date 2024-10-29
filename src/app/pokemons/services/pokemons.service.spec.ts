import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { PokemonsService } from './pokemons.service';
import { SimplePokemon } from '../interfaces';

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'Bulbasaur' },
  { id: '2', name: 'Ivysaur' },
  { id: '3', name: 'Venusaur' },
  { id: '4', name: 'Charmander' },
  { id: '5', name: 'Charmeleon' },
  { id: '6', name: 'Charizard' },
  { id: '7', name: 'Squirtle' },
  { id: '8', name: 'Wartortle' },
  { id: '9', name: 'Blastoise' },
];

const mockPokemon = {
  id: '1',
  name: 'Bulbasaur',
}

describe('PokemonsService', () => {
  let service: PokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
