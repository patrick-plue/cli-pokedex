import { State } from './state.js';

export async function commandExit(state: State) {
    const { rl } = state;
    console.log('Closing the Pokedex... Goodbye!');
    rl.close();
    process.exit(0);
}
