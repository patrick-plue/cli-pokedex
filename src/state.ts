import { createInterface, type Interface } from 'readline';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap, commandMapB } from './comand_map.js';
import { PokeAPI } from './pokeapi.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};
export type State = {
    commands: Record<string, CLICommand>;
    rl: Interface;
    PokeAPI: PokeAPI;
    nextLocationUrl: string;
    prevLocationUrl: string;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > ',
    });

    function getCommands() {
        return {
            exit: {
                name: 'exit',
                description: 'Exits the pokedex',
                callback: commandExit,
            },
            help: {
                name: 'help',
                description: 'Displays a help message',
                callback: commandHelp,
            },
            map: {
                name: 'map',
                description:
                    'Displays next 20 location areas in the Pokemon world',
                callback: commandMap,
            },
            mapb: {
                name: 'mapb',
                description:
                    'Display previous 20 location areas in the Pokemon world',
                callback: commandMapB,
            },
        };
    }

    return {
        commands: getCommands(),
        rl,
        PokeAPI: new PokeAPI(60000),
        nextLocationUrl: '',
        prevLocationUrl: '',
    };
}
