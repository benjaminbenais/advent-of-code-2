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

function getGameId(line: string) {
  return line.match(/\d+/)?.[0];
}

function getCubes(line: string) {
  const r = new RegExp(/(\d+\s\w+)/, 'g');
  return line.match(r) || [];
}

function parseCube(cube: string): [number, Color] {
  const [count, color] = cube.split(' ') as [number, Color];
  return [Number(count), color];
}

function processPartOne(line: string): number {
  const gameId = getGameId(line);
  const cubes = getCubes(line);

  const isGameImpossible = cubes.some((cube) => {
    const [count, color] = parseCube(cube);
    return Number(count) > limits[color];
  });

  return isGameImpossible ? 0 : Number(gameId);
}

function processPartTwo(line: string): number {
  const cubes = getCubes(line);

  let maxRed = 0;
  let maxBlue = 0;
  let maxGreen = 0;

  cubes.forEach((cube) => {
    const [count, color] = parseCube(cube);

    if (color === 'red' && count > maxRed) {
      maxRed = count;
    } else if (color === 'green' && count > maxGreen) {
      maxGreen = count;
    } else if (color === 'blue' && count > maxBlue) {
      maxBlue = count;
    }
  });

  return maxRed * maxGreen * maxBlue;
}

function main(fn: (line: string) => number) {
  return puzzleInput
    .split('\n')
    .map(fn)
    .reduce((acc, curr) => acc + curr, 0);
}

const partOneResult = main(processPartOne);
console.log('partOneResult: ', partOneResult);

const partTwoResult = main(processPartTwo);
console.log('partTwoResult: ', partTwoResult);
