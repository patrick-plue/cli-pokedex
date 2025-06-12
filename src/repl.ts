import { State } from './state.js';

export function cleanInput(input: string): string[] {
    return input
        .toLocaleLowerCase()
        .split(' ')
        .filter((el) => el !== '');
}

export async function startREPL(state: State) {
    const { rl, commands } = state;
    rl.prompt();
    rl.on('line', async (input: string) => {
        const userInput = cleanInput(input);
        if (!userInput) {
            rl.prompt();
        }
        const userCommand = userInput[0];
        const cmd = commands[userCommand];
        if (cmd) {
            try {
                await cmd.callback(state);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            console.log('Unknown command');
        }
        rl.prompt();
    });
}
