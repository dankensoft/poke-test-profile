import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPokemon } from '../interfaces/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {

  pokemons: IPokemon[] = [];

  pokemonsSelected: IPokemon[] = [];
  private modelChanged: Subject<string> = new Subject<string>();
  private subscription?: Subscription;
  debounceTime = 500;

  @Output() onLoaded = new EventEmitter<boolean>();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getData();

    this.subscription = this.modelChanged
    .pipe(
      debounceTime(this.debounceTime),
    )
    .subscribe((value) => {
      this.searchPokemon(value);
    });
  }

  async getData() {
    this.pokemons = await this.pokemonService.getPokemons();
    console.log(this.pokemons);
    this.onLoaded.emit(true);
  }

  inputChanged(event: any) {
    this.modelChanged.next(event.target.value)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async searchPokemon(value: string | number) {
    if (value == '') {
      const response: IPokemon[] = await this.pokemonService.getPokemons();
      this.pokemons = response;
    } else {
      const response: IPokemon = await this.pokemonService.getPokemonByNameOrId(value);

      this.pokemons = [ response ];
    }
    
  }
  
  getPokemonImageByUrl(url: string) {
    const id = url.split('/')[6];

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  }

  getPokemonId(url: string) {
    const id = url.split('/')[6];

    return id;
  }

  selectPokemon(pokemon: IPokemon) {
    if (this.pokemonsSelected.indexOf(pokemon) < 0) {
      this.pokemonsSelected = [...this.pokemonsSelected, pokemon];
    } else {
      this.pokemonsSelected = this.pokemonsSelected.filter(p => p.name != pokemon.name);
    }
  }


}
