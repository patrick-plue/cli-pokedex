import { createInterface } from 'node:readline';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { CLICommand } from './command.js';

export function cleanInput(input: string): string[] {
    return input
        .toLocaleLowerCase()
        .split(' ')
        .filter((el) => el !== '');
}

export function getCommands(): Record<string, CLICommand> {
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
    };
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > ',
    });

    rl.prompt();
    rl.on('line', (input) => {
        const userInput = cleanInput(input);
        if (!userInput) {
            rl.prompt();
        }
        const userCommand = userInput[0];
        const commands = getCommands();
        const cmd = commands[userCommand];
        if (cmd) {
            cmd.callback(commands);
        } else {
            console.log('Unknown command');
        }
        rl.prompt();
    });
}
