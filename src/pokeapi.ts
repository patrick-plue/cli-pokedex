import { Cache } from "./pokecache.js";
export class PokeAPI {
    private static readonly baseUrl = 'https://pokeapi.co/api/v2';
    private cache: Cache

    constructor(cacheInterval: number) {
      this.cache = new Cache(cacheInterval)
    }

    async fetchLocations(pageUrl?: string): Promise<ShallowLoations> {
        const url = pageUrl || `${PokeAPI.baseUrl}/location-area`
        const cache = this.cache.get(url)
        if (cache){
          console.log("cached response")
          return cache.val
        }
        try {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`)
        }
        const locations: ShallowLoations = await res.json()
        this.cache.add(url, locations )
        
        return locations
        }
        catch(error) {
            throw new Error(`Error fetching locations: ${error.message}`)
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseUrl}/location-area/${locationName}`
  
        const cache = this.cache.get(url)
        if (cache){
          console.log("cached response")
          return cache.val
        }
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
            const location: Location = await res.json()
            this.cache.add(url, location )
            return location

        }catch(error) {
            throw new Error(`Error fetching location '${locationName}': ${error.message}`)


        }
    }
    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseUrl}/pokemon/${pokemonName}`
  
        const cache = this.cache.get(url)
        if (cache){
          return cache.val
        }
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
            const pokemon: any = await res.json()
            this.cache.add(url, pokemon )
            return pokemon

        }catch(error) {
            throw new Error(`Error fetching pokemon '${pokemonName}': ${error.message}`)

        }
    }

}

export type ShallowLoations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
};

export type Location = {
    encounter_method_rates: {
      encounter_method: {
        name: string;
        url: string;
      };
      version_details: {
        rate: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
    game_index: number;
    id: number;
    location: {
      name: string;
      url: string;
    };
    name: string;
    names: {
      language: {
        name: string;
        url: string;
      };
      name: string;
    }[];
    pokemon_encounters: {
      pokemon: {
        name: string;
        url: string;
      };
      version_details: {
        encounter_details: {
          chance: number;
          condition_values: any[];
          max_level: number;
          method: {
            name: string;
            url: string;
          };
          min_level: number;
        }[];
        max_chance: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };

// add types
export type Pokemon = {
  name: string,
  height: string,
  weight: string,
  id: number,
  ["base_experience"]: number
  }