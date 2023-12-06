import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  '\n',
);

type Input = { times: number[]; distances: number[] };

const times = puzzleInput[0].replace(/Time\:\s+/, '').match(/\d+/g)!;
const distances = puzzleInput[1].replace(/Distance\:\s+/, '').match(/\d+/g)!;

function getP1Input(): Input {
  return { times: times.map(Number), distances: distances.map(Number) };
}

function getP2Input(): Input {
  return {
    times: [+times.join('')],
    distances: [+distances.join('')],
  };
}

function main(input: Input): number {
  const { times, distances } = input;

  const result = times.map((time, index) => {
    const record = distances[index];

    let wins = 0;

    for (let i = 0; i < time; i++) {
      const holdTime = i;
      const remainingTime = time - i;

      const distanceReached = holdTime * remainingTime;

      if (distanceReached > record) {
        wins++;
      }
    }

    return wins;
  });

  return result.reduce((acc, curr) => acc * curr, 1);
}

const p1 = main(getP1Input());
const p2 = main(getP2Input());
console.log('p1: ', p1);
console.log('p2: ', p2);
