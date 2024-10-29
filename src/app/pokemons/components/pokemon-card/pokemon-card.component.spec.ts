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

});
