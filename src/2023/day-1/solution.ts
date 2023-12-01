import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const puzzleInput = fs.readFileSync(
  path.join(__dirname, './puzzle-input.txt'),
  'utf-8',
);

const mapping = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
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

const partOneRegex = /(\d)/g;
const partTwoRegex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;

function isKeyValid(k: string): k is keyof typeof mapping {
  return k in mapping;
}

function getFirstAndLastMatches(matchers: RegExpMatchArray[]) {
  const firstMatch = matchers[0];
  const lastMatch = matchers[matchers.length - 1];

  const firstKey = firstMatch[1];
  const lastKey = lastMatch[1];

  if (isKeyValid(firstKey) && isKeyValid(lastKey)) {
    return [firstKey, lastKey];
  }

  return [];
}

function processLine(line: string, regex: RegExp): number {
  const matches = [...line.matchAll(regex)];
  const [first, last] = getFirstAndLastMatches(matches);

  if (first && last) {
    return Number(mapping[first] + mapping[last]);
  }

  return 0;
}

function main(regex: RegExp) {
  return puzzleInput
    .split('\n')
    .map((line) => processLine(line, regex))
    .reduce((acc, curr) => acc + curr, 0);
}

const partOneResult = main(partOneRegex);
const partTwoResult = main(partTwoRegex);
console.log('partOneResult: ', partOneResult);
console.log('partTwoResult: ', partTwoResult);
