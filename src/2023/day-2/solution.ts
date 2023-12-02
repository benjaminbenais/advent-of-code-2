import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url);

type Limits = {
  red: number;
  green: number;
  blue: number;
};

type Color = keyof Limits;

const limits = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

function processLine(line: string): number {
  const gameId = line.match(/\d+/)?.[0];

  const cubesRegex = new RegExp(/(\d+\s\w+)/, 'g');
  const cubes = line.match(cubesRegex) || [];

  const isInvalid = cubes.some((cube) => {
    const [n, color] = cube.split(' ') as [number, Color];
    return Number(n) > limits[color];
  });

  return isInvalid ? 0 : Number(gameId);
}

function main() {
  return puzzleInput
    .split('\n')
    .map(processLine)
    .reduce((acc, curr) => acc + curr, 0);
}

const partOneResult = main();
console.log('partOneResult: ', partOneResult);
