import { Injectable } from '@angular/core';
import { IPokemon } from '../components/interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  baseUrl = 'https://pokeapi.co/api/v2/';


  async getPokemons(): Promise<IPokemon[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}pokemon?limit=9`, {
          headers: { 'Accept': 'application/json' }
        })

        const body: any = await response.json();


        const pokemons: IPokemon[] = body.results;

        resolve(pokemons);
      } catch (e) {
        reject(e);
      }
    })
  }

  async getPokemonByNameOrId(value: string | number): Promise<IPokemon> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}pokemon/${value}`, {
          headers: { 'Accept': 'application/json' }
        })

        const body: any = await response.json();

        const pokemon: IPokemon = {
          url: `https://pokeapi.co/api/v2/pokemon/${body.id}/`,
          name: body.name
        }

        resolve(pokemon);
      } catch (e) {
        reject(e);
      }
    })
  }
}
