import { readFileSync } from '../../utils/readFileSync';
import { extractMatches, generateAdjacentIndexes } from './utils';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url);
const engineSchematic = puzzleInput.split('\n');

function validateEnginePart(lines: string[], indexes: number[][]) {
  return lines.some((line, i) => {
    const specialChars = extractMatches(line, /([^\d\.])/g);
    const specialCharsIndexes = specialChars.map((x) => x[1]);

    return indexes[i].some((index) => specialCharsIndexes.includes(index));
  });
}

function processPartOne() {
  let validEngineParts = 0;

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

    // Extract the number occurences in the current line
    const enginePartsMatches = extractMatches(currentLine, /(\d+)/g);

    // For each number, check is there is an adjacent special character
    enginePartsMatches.forEach(([number, index]) => {
      const [currentLineIndexes, adjacentLinesIndexes] =
        generateAdjacentIndexes(number, index);

      const lines = [currentLine, prevLine, nextLine];

      const isEnginePart = validateEnginePart(lines, [
        currentLineIndexes,
        adjacentLinesIndexes,
        adjacentLinesIndexes,
      ]);

      if (isEnginePart) {
        validEngineParts += Number(number);
      }
    });
  }

  return validEngineParts;
}

const result = processPartOne();
console.log('result: ', result);
