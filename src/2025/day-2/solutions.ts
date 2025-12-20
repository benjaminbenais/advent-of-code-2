import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  ',',
);

type Range = [string, string];
const parsedInput = puzzleInput.map((item) => item.split('-')) as Range[];

type validate = (id: string) => boolean;

const getInvalidIds = (ranges: Range[], validate: validate): number => {
  return ranges.reduce((acc, [start, end]): number => {
    let result = 0;

    for (let i = +start; i <= +end; i++) {
      const id = i.toString();
      if (validate(id)) {
        result += i;
      }
    }

    return acc + result;
  }, 0);
};

const validatePart1 = (id: string) =>
  id.slice(0, id.length / 2) === id.slice(id.length / 2);

const validatePart2 = (id: string, n: number): boolean => {
  if (id.length / 2 < n) {
    return false;
  }

  if (id.length % n !== 0) {
    return validatePart2(id, n + 1);
  }

  for (let i = 0; i < id.length / n - 1; i++) {
    const a = id.slice(i * n, i * n + n);
    const b = id.slice(i * n + n, i * n + n + n);
    if (a !== b) {
      return validatePart2(id, n + 1);
    }
  }

  return true;
};

const part1 = getInvalidIds(parsedInput, validatePart1);
const part2 = getInvalidIds(parsedInput, (id) => validatePart2(id, 1));

console.log('part 1:', part1);
console.log('part 2:', part2);
