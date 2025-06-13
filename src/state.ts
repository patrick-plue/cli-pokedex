import { createInterface, type Interface } from 'readline';
import { commandExit, commandHelp, commandMap, commandMapB, commandExplore, commandCatch, commandInspect, commandPokedex} from './commands/index.js';
import { PokeAPI, Pokemon} from './api/pokeapi.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};
export type State = {
    commands: Record<string, CLICommand>;
    rl: Interface;
    PokeAPI: PokeAPI;
    nextLocationUrl: string;
    prevLocationUrl: string;
    pokedex: Record<string,Pokemon>
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
            explore: {
                name: "explore",
                description: "Displays a list of Pokemon in a given area",
                callback: commandExplore
            },
            catch: {
                name: "catch",
                description: "Catches a Pokemon",
                callback: commandCatch
            },
            inspect: {
                name: "inspect",
                description: "Inspects stats for a specific Pokemon",
                callback: commandInspect
            },
            pokedex: {
                name: "pokedex",
                description: "Lists all catched pokemon",
                callback: commandPokedex
            }
        };
    }

    const Pokedex: Record<string,Pokemon>= {}

    return {
        commands: getCommands(),
        rl,
        PokeAPI: new PokeAPI(60000),
        nextLocationUrl: '',
        prevLocationUrl: '',
        pokedex: Pokedex
    };
}
