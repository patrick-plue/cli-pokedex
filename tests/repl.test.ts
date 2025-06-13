import { cleanInput } from "../src/repl"
import { describe, expect, test } from 'vitest';

describe.each([
    {
        input: '  hello  world  ',
        expected: ['hello', 'world'],
    },
    {
        input: '     salut',
        expected: ['salut'],
    },
    {
        input: 'HELLO WoRlD',
        expected: ['hello', 'world'],
    },
])('cleainInput($input)', ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});
