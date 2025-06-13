import { State } from "../state";

export async function commandExplore(state: State, location: string){
    const {PokeAPI} = state
    console.log("Exploring " + location + "...")
    const result = await PokeAPI.fetchLocation(location)
    console.log("Found Pokemon:")
    result.pokemon_encounters.forEach((encounter) => {
        console.log(encounter.pokemon.name)
    })

}