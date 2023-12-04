import { readFileSync } from '../../utils/readFileSync';
import { extractMatches, generateAdjacentIndexes } from './utils';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url);
const engineSchematic = puzzleInput.split('\n');

function getGearRatio(lines: string[], gearIndexes: number[][]) {
  const matches: number[] = [];

  lines.forEach((line, i) => {
    const engineParts = extractMatches(line, /(\d+)/g);

    if (engineParts.length) {
      engineParts.forEach((enginePart) => {
        const engineStartingIndex = enginePart[1];
        const engineEndingIndex = enginePart[0].length + enginePart[1] - 1;

        const isValid = gearIndexes[i].some(
          (gearIndex) =>
            gearIndex >= engineStartingIndex && gearIndex <= engineEndingIndex,
        );

        if (isValid) {
          matches.push(Number(enginePart[0]));
        }
      });
    }
  });

  if (matches.length === 2) {
    return matches[0] * matches[1];
  }

  return 0;
}

function main() {
  let engineParts = 0;

  for (let i = 0; i < engineSchematic.length; i++) {
    const currentLine = engineSchematic[i];
    let prevLine = '';
    let nextLine = '';

    if (i > 0) {
      prevLine = engineSchematic[i - 1];
    }

    if (i < engineSchematic.length - 1) {
      nextLine = engineSchematic[i + 1];
    }

    const gearMatches = extractMatches(currentLine, /(\*)/g);

    gearMatches.forEach(([number, index]) => {
      const [currentLineIndexes, adjacentLinesIndexes] =
        generateAdjacentIndexes(number, index);

      const lines = [currentLine, prevLine, nextLine];

      const result = getGearRatio(lines, [
        currentLineIndexes,
        adjacentLinesIndexes,
        adjacentLinesIndexes,
      ]);

      if (result) {
        engineParts += result;
      }
    });
  }

  return engineParts;
}

const result = main();
console.log('result: ', result);
