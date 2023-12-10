import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  '\n',
);

type Side = 'beginning' | 'end';

function extrapolate(history: number[], side: Side): number {
  const diff: number[] = [];

  for (let i = 0; i < history.length - 1; i++) {
    diff.push(history[i + 1] - history[i]);
  }

  if (diff.every((n) => n === 0)) {
    return history[0];
  }

  const prevN = extrapolate(diff, side);
  if (side === 'beginning') {
    return history[0] - prevN;
  } else {
    return prevN + history[history.length - 1];
  }
}

function main(side: Side) {
  const result = puzzleInput.map((line) => {
    const history = line.split(' ').map(Number);
    return extrapolate(history, side);
  });

  return result.reduce((acc, curr) => acc + curr, 0);
}

const p1 = main('end');
const p2 = main('beginning');
console.log('p1: ', p1);
console.log('p2: ', p2);
