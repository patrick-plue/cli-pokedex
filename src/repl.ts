import { createInterface } from 'node:readline';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';

export function cleanInput(input: string): string[] {
    return input
        .toLocaleLowerCase()
        .split(' ')
        .filter((el) => el !== '');
}

export function startREPL(state) {
    const { rl, commands } = state;
    rl.prompt();
    rl.on('line', (input: string) => {
        const userInput = cleanInput(input);
        if (!userInput) {
            rl.prompt();
        }
        const userCommand = userInput[0];
        const cmd = commands[userCommand];
        if (cmd) {
            cmd.callback(state);
        } else {
            console.log('Unknown command');
        }
        rl.prompt();
    });
}
