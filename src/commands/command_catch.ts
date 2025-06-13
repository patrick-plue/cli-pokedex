import { State } from "../state.js";

export async function commandCatch(state: State ,name: string){
    const {PokeAPI, pokedex} = state
    if (pokedex[name]){
        console.log("You have already catched " + name)
        return; 
    }
    console.log("Throwing a Pokeball at " + name + "...")

    const pokemon = await PokeAPI.fetchPokemon(name)
    const baseExperience = pokemon["base_experience"]

    const catched = determineOutcome(baseExperience) 
    if (catched){
        console.log(`${name} catched`)
        pokedex[name] = pokemon
    } else {
        console.log(`${name} escaped`)
    }
}


function determineOutcome(num: number): boolean{
    const randomNumber = Math.floor(Math.random() * num) 
    console.log(randomNumber)
    if (randomNumber < 40){
        return true
    } else {
        return false
    }
}