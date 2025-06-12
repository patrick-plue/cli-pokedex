import { CLICommand } from './command';

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log('Welcome to the Pokedex!');
    console.log('Usage \n');

    Object.values(commands).forEach((command) => {
        console.log(`${command.name}: ${command.description} `);
    });
    console.log('');
}
