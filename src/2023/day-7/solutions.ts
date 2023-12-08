import { readFileSync } from '../../utils/readFileSync';

// const puzzleInput = readFileSync('./sample.txt', import.meta.url).split('\n');
const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  '\n',
);

const FIVE_OF_A_KIND = 6;
const FOUR_OF_A_KIND = 5;
const FULL_HOUSE = 4;
const THREE_OF_A_KIND = 3;
const TWO_PAIRS = 2;
const ONE_PAIR = 1;
const OTHER = 0;

const cardValuesP1 = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
];

const cardValuesP2 = [
  'J',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'Q',
  'K',
  'A',
];

function findOccurences(str: string, joker?: boolean) {
  const occurences: Record<string, number> = {};

  let innerStr = str;

  if (joker) {
    innerStr = str === 'JJJJJ' ? 'AAAAA' : str.replace(/J/g, '');
  }

  innerStr
    .split('')
    .sort()
    .forEach((card) => {
      if (occurences[card] !== undefined) {
        occurences[card] += 1;
      } else {
        occurences[card] = 1;
      }
    });

  const result = Object.entries(occurences).sort((a, b) => b[1] - a[1]);

  if (joker) {
    const indexes = result.map((el) => el[0]);

    let jokerCount = str.length - innerStr.length;

    while (jokerCount > 0) {
      const occurencesCount = result[0][1];
      const groups = result.filter((el) => el[1] === occurencesCount);

      groups.forEach((group) => {
        if (jokerCount > 0) {
          const availableSpace = 5 - group[1];
          if (availableSpace) {
            const index = indexes.indexOf(group[0]);
            const x = Math.min(availableSpace, jokerCount);
            result[index][1] += x;
            jokerCount -= x;
          }
        }
      });
    }
  }

  return result;
}

function getHandType(hand: string, joker?: boolean) {
  const occurences = findOccurences(hand, joker);

  if (occurences[0][1] === 5) {
    return FIVE_OF_A_KIND;
  }

  if (occurences[0][1] === 4) {
    return FOUR_OF_A_KIND;
  }

  if (occurences[0][1] === 3 && occurences[1][1] === 2) {
    return FULL_HOUSE;
  }

  if (occurences[0][1] === 3) {
    return THREE_OF_A_KIND;
  }

  if (occurences[0][1] === 2 && occurences[1][1] === 2) {
    return TWO_PAIRS;
  }

  if (occurences[0][1] === 2) {
    return ONE_PAIR;
  }

  return OTHER;
}

function main(joker?: boolean) {
  const handTypes: [string, string][][] = [[], [], [], [], [], [], []];

  puzzleInput.forEach((line) => {
    const [hand, bid] = line.split(' ');
    const handType = getHandType(hand, joker);
    handTypes[handType].push([hand, bid]);
  });

  const result: [string, string][] = [];

  handTypes.forEach((type) => {
    if (type.length) {
      const sortedHands = type.sort((a, b) => {
        for (let i = 0; i < a[0].length; i++) {
          if (a[0][i] !== b[0][i]) {
            if (joker) {
              return (
                cardValuesP2.indexOf(a[0][i]) - cardValuesP2.indexOf(b[0][i])
              );
            }
            return (
              cardValuesP1.indexOf(a[0][i]) - cardValuesP1.indexOf(b[0][i])
            );
          }
        }

        return 0;
      });

      sortedHands.forEach((hands) => result.push(hands));
    }
  });

  return result.reduce((acc, curr, i) => (acc += Number(curr[1]) * (i + 1)), 0);
}

const partOneResult = main();
const partTwoResult = main(true);
console.log('partOneResult: ', partOneResult);
console.log('partTwoResult: ', partTwoResult);
