import { readFileSync } from '../../utils/readFileSync';
import { parseGroups } from './utils';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url);

const { seeds, groups } = parseGroups(puzzleInput);

function isInRange(n: number, min: number, max: number): boolean {
  return n >= min && n <= max;
}

function findSeedLocation(seed: number): number {
  let nextDestination = 'seed';
  let nextValue = seed;

  Object.keys(groups).forEach(() => {
    const { destination, maps } = groups[nextDestination];

    const map = maps.find(([, d, r]) => isInRange(nextValue, d, d + r));

    if (map) {
      const [s, d] = map;
      nextValue = nextValue - d + s;
    }

    nextDestination = destination;
  });

  return nextValue;
}

function main(): number {
  const locations = seeds.map(findSeedLocation);
  return Math.min(...locations);
}

const result = main();
console.log('result: ', result);
