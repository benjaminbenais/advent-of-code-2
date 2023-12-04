import { readFileSync } from '../../utils/readFileSync';
import { parseCard } from './utils';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url);

const cardsPool: Record<number, number> = {};

function registerCard(index: number) {
  if (cardsPool[index] === undefined) {
    cardsPool[index] = 1;
  }
}

function addCard(index: number, amount: number) {
  registerCard(index);
  cardsPool[index] += amount;
}

function processCard(card: string, index: number) {
  const [winningNumbers, playerNumbers] = parseCard(card);
  const currentCardIndex = index + 1;

  registerCard(currentCardIndex);

  let matchingNumbersCount = 0;

  winningNumbers.forEach((n) => {
    if (playerNumbers.includes(n)) {
      matchingNumbersCount++;
    }
  });

  const currentCardCopies = cardsPool[currentCardIndex];

  for (let i = 0; i < matchingNumbersCount; i++) {
    addCard(currentCardIndex + i + 1, currentCardCopies);
  }
}

puzzleInput.split('\n').map(processCard);
const result = Object.values(cardsPool).reduce((acc, curr) => acc + curr, 0);

console.log('result: ', result);
