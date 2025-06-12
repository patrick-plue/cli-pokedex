import { State } from './state';

export function commandHelp(state: State) {
    const { commands } = state;
    console.log('Welcome to the Pokedex!');
    console.log('Usage \n');

    Object.values(commands).forEach((command) => {
        console.log(`${command.name}: ${command.description} `);
    });
    console.log('');
}
