import fs from 'fs';

const puzzleInput = fs.readFileSync('./puzzle-input.txt', 'utf-8');
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

function getDigitsFromString(line: string, mapping: Mapping): number {
  const keys = Object.keys(mapping) as (keyof Mapping)[];
  const digits: { idx: number; n: string }[] = [];

  keys.forEach((key) => {
    const idx = [...line.matchAll(new RegExp(key, 'g'))];
    idx.forEach((item) => {
      digits.push({ idx: item.index!, n: mapping[key] });
    });
  });

  const final = digits
    .filter((v) => v.idx !== -1)
    .sort((a, b) => a.idx - b.idx);

  const first = final[0].n;
  const second = final[final.length - 1].n;

  console.log(first, second);

  return Number(first + second);
}

function main(mapping: Mapping) {
  return parsedInput
    .map((line) => getDigitsFromString(line, mapping))
    .reduce((acc: number, curr: number) => acc + curr, 0);
}

const partOneResult = main(digitsMapping);
const partTwoResult = main(fullMapping);
console.log('partOneResult: ', partOneResult);
console.log('partTwoResult: ', partTwoResult);
