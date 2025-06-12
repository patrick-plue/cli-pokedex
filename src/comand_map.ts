import { State } from './state';
export async function commandMap(state: State) {
    const { PokeAPI } = state;
    const locations = await PokeAPI.fetchLocations(state.nextLocationUrl);
    state.prevLocationUrl = locations.previous;
    state.nextLocationUrl = locations.next;

    console.log(locations.previous)
    console.log(locations.next)
    locations.results.forEach((location) => {
        console.log(location.name);
    });
}

export async function commandMapB(state: State) {
    const { PokeAPI } = state;
    if (!state.prevLocationUrl) {
        console.log('You are on the first page');
        return;
    }
    const locations = await PokeAPI.fetchLocations(state.prevLocationUrl);
    state.nextLocationUrl = locations.next;
    state.prevLocationUrl = locations.previous;
    locations.results.forEach((location) => {
        console.log(location.name);
    });
}
