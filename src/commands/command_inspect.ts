import { State } from "../state.js";

export async function commandInspect(state: State, name: string) {
    const {pokedex} = state

    if (!pokedex[name]){
        console.log("You haven't catched this pokemon yet.")
        return;
    }

    const pokemon= pokedex[name]

    console.log(`
Name: ${pokemon.name}
Base Experience: ${pokemon.base_experience}
Height: ${pokemon.height}
Weight: ${pokemon.weight}
Id: ${pokemon.id}
`)
}