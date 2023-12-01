import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const puzzleInput = fs.readFileSync(
  path.join(__dirname, './puzzle-input.txt'),
  'utf-8',
);
const parsedInput = puzzleInput.split('\n');

const digitsMapping = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
} as const;

const fullMapping = {
  ...digitsMapping,
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
} as const;

type Mapping = typeof digitsMapping | typeof fullMapping;

function getDigitsFromString(mapping: Mapping): (line: string) => number {
  const matchers = Object.keys(mapping) as (keyof Mapping)[];

  return (line) => {
    const digits: { index: number; n: string }[] = [];

    matchers.forEach((matcher) => {
      // Get the index of every matcher's occurences
      // Example for matcher "one" in "oneaone" -> index [[index: 0], [index: 4]]
      const regex = new RegExp(matcher, 'g');
      const matches = [...line.matchAll(regex)];

      // For each match, push the index and matcher in `digits`.
      matches.forEach((match) => {
        digits.push({ index: match.index!, n: mapping[matcher] });
      });
    });

    const sortedDigits = digits.sort((a, b) => a.index - b.index);

    // Extract the first and last digits.
    const first = sortedDigits[0].n;
    const second = sortedDigits[sortedDigits.length - 1].n;

    return Number(first + second);
  };
}

function main(mapping: Mapping) {
  const cb = getDigitsFromString(mapping);

  return parsedInput
    .map(cb)
    .reduce((acc: number, curr: number) => acc + curr, 0);
}

const partOneResult = main(digitsMapping);
const partTwoResult = main(fullMapping);
console.log(partOneResult);
console.log(partTwoResult);
