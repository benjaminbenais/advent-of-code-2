import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  '\n',
);

type Rotation = [string, number];
const RIGHT = 'R';

const getRotations = (input: string[]): Rotation[] => {
  const regex = /^(L|R)(\d+)/;

  return input.map((line) => {
    const match = line.match(regex);
    return [match![1], +match![2]];
  });
};

const rotations = getRotations(puzzleInput);

const part1 = (): number => {
  let current = 50;
  let result = 0;

  rotations.forEach(([direction, count]) => {
    const remainder = count % 100;
    if (direction === RIGHT) {
      current += remainder;
      if (current > 99) {
        current = current - 100;
      }
    } else {
      current -= remainder;
      if (current < 0) {
        current = 100 - Math.abs(current);
      }
    }

    if (current === 0) {
      result++;
    }
  });

  return result;
};

const part2 = (): number => {
  let current = 50;
  let result = 0;

  rotations.forEach(([direction, count]) => {
    const completeRotations = Math.trunc(count / 100);
    result += completeRotations;

    const remainder = count % 100;

    if (direction === RIGHT) {
      current += remainder;
      if (current > 99) {
        result++;
        current = current - 100;
      }
    } else {
      if (current === 0) {
        current = 100 - Math.abs(remainder);
      } else {
        current -= remainder;
        if (current <= 0) {
          result++;
          if (current !== 0) {
            current = 100 - Math.abs(current);
          }
        }
      }
    }
  });

  return result;
};

console.log('part 1:', part1());
console.log('part 2:', part2());
