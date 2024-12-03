import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  '\n',
);

type List = number[];
type Lists = [List, List];

function getLists(rawInput: string[]): Lists {
  const list1: List = [];
  const list2: List = [];

  rawInput.forEach((line) => {
    const [left, right] = line.split('   ');
    list1.push(+left);
    list2.push(+right);
  });

  return [list1.sort(), list2.sort()];
}

function part1(lists: Lists): number {
  const [list1, list2] = lists;

  let result = 0;

  list1.forEach((n, i) => {
    result += Math.abs(n - list2[i]);
  });

  return result;
}

function part2(lists: Lists): number {
  const [list1, list2] = lists;
  let occurences = 0;
  let result = 0;

  list1.forEach((x) => {
    list2.forEach((y) => {
      if (x === y) {
        occurences += 1;
      }
    });

    result += x * occurences;
    occurences = 0;
  });

  return result;
}

function main() {
  const lists = getLists(puzzleInput);

  console.log('Part 1: ', part1(lists));
  console.log('Part 2: ', part2(lists));
}

main();
