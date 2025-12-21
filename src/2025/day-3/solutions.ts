import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  '\n',
);

const part1 = () => {
  return puzzleInput.reduce((total, bank) => {
    let highest = 0;

    for (let i = 0; i < bank.length - 1; i++) {
      const rest = bank.slice(i + 1);

      for (let j = 0; j < rest.length; j++) {
        const joltage = Number(bank[i] + rest[j]);
        highest = Math.max(highest, joltage);
      }
    }

    return total + highest;
  }, 0);
};

console.log(part1());
