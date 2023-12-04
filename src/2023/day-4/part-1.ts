import { readFileSync } from '../../utils/readFileSync';
import { parseCard } from './utils';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url);

function getCardValue(card: string): number {
  const [winningNumbers, playerNumbers] = parseCard(card);

  let result = 0;

  winningNumbers.forEach((number) => {
    if (playerNumbers.includes(number)) {
      if (result === 0) {
        result++;
      } else {
        result *= 2;
      }
    }
  });

  return result;
}

const result = puzzleInput
  .split('\n')
  .map(getCardValue)
  .reduce((acc, curr) => acc + curr, 0);

console.log('result: ', result);
