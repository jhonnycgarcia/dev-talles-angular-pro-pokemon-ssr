import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { provideRouter } from '@angular/router';

const mockPokemons = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
];

describe('PokemonListComponent', () => {

  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement  as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should receive the pokemons signal input', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should render tje pokemon list with ${mockPokemons.length} pokemons card`, () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();

    const pokemonCards = compiled.querySelectorAll('pokemon-card');
    expect(pokemonCards.length).toBe(mockPokemons.length);
  });

  it('should render no pokemons if the pokemons signal input is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    const pokemonCards = compiled.querySelectorAll('pokemon-card');
    expect(pokemonCards.length).toBe(0);

    const noPokemons = compiled.querySelector('div');
    expect(noPokemons?.textContent).toContain('No hay pokemons');
  });

});
