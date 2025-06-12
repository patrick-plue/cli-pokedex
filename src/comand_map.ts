import { State } from './state';
export async function commandMap(state: State) {
    const { PokeAPI } = state;
    const locations = await PokeAPI.fetchLocations(state.nextLocationUrl);
    state.nextLocationUrl = locations.next;
    state.prevLocationUrl = locations.previous;

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
