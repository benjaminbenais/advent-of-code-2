import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url);

const rounds: string[] = puzzleInput.split('\n').filter((line) => !!line);

function getTotalScore(scores: number[]): number {
  return scores.reduce((acc: number, curr: number) => acc + curr, 0);
}

const roundsMapping = {
  // Lose
  X: {
    A: 'Z',
    B: 'X',
    C: 'Y',
  },
  // Draw
  Y: {
    A: 'X',
    B: 'Y',
    C: 'Z',
  },
  // Win
  Z: {
    A: 'Y',
    B: 'Z',
    C: 'X',
  },
} as const;

const matchingScores = {
  X: 1,
  Y: 2,
  Z: 3,
} as const;

const outcomeScores = {
  X: 0,
  Y: 3,
  Z: 6,
} as const;

function partTwo(): number {
  type FirstPLayerPlays = 'A' | 'B' | 'C';
  type Outcome = 'X' | 'Y' | 'Z';

  const scores: number[] = rounds.map((round) => {
    const [playA, outcome] = round.split(' ') as [FirstPLayerPlays, Outcome];

    const playB = roundsMapping[outcome][playA];
    return matchingScores[playB] + outcomeScores[outcome];
  });

  return getTotalScore(scores);
}

function partOne() {
  // A / X -> Rock
  // B / Y-> Paper
  // C / Z -> Scissors

  type FirstPLayerPlays = 'A' | 'B' | 'C';
  type SecondPlayerPlays = 'X' | 'Y' | 'Z';

  const scores: number[] = rounds.map((round) => {
    const [playA, playB] = round.split(' ') as [
      FirstPLayerPlays,
      SecondPlayerPlays,
    ];

    // Draw
    if (
      (playA === 'A' && playB === 'X') ||
      (playA === 'B' && playB === 'Y') ||
      (playA === 'C' && playB === 'Z')
    ) {
      return matchingScores[playB] + 3;
    }

    // Check for loss
    if (
      (playA === 'A' && playB === 'Z') ||
      (playA === 'B' && playB === 'X') ||
      (playA === 'C' && playB === 'Y')
    ) {
      return matchingScores[playB];
    }

    return matchingScores[playB] + 6;
  });

  return getTotalScore(scores);
}

const solution1 = partOne();
const solution2 = partTwo();
console.log('Solution 1: ', solution1);
console.log('Solution 2: ', solution2);
