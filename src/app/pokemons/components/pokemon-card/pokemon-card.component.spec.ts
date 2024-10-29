import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';

const mockPokemon = {
  id: 1,
  name: 'Bulbasaur',
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
      }
    }
  }
};

describe('PokemonCardComponent', () => {

  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();

    compiled = fixture.nativeElement  as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    // console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon as any);
  });

  it('should have the pokemon name and image correctly', () => {
    const image = compiled.querySelector('img')!;
    expect(image).toBeDefined();

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`
    expect(imageUrl).toBe(image.src);

    const pokemonName = compiled.querySelector('h2')!;
    expect(pokemonName).toBeDefined();
    expect(pokemonName.textContent!.trim()).toBe(mockPokemon.name);
  });

  it('should have the proper ng-reflext-router-link', () => {
    const divWithLink = compiled.querySelector('div')!;
    expect(divWithLink.querySelector('a'))
    .toBeDefined();

    expect(divWithLink.attributes.getNamedItem('ng-reflect-router-link'))
      .toBeDefined();

    console.log(divWithLink.attributes.getNamedItem('ng-reflect-router-link')!.value);

    expect(divWithLink.attributes.getNamedItem('ng-reflect-router-link')!.value)
      .toBe(`/pokemons,${mockPokemon.name}`);
  });

});
