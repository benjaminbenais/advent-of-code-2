import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  '\n',
);

type Report = number[];

function getReports(): Report[] {
  return puzzleInput.map((line) => line.split(' ').map(Number));
}

function part1(reports: Report[]): number {
  let safeReports = 0;

  for (let i = 0; i < reports.length; i++) {
    const levels = reports[i];
    let isValid = true;

    for (let j = 0; j < levels.length - 1; j++) {
      const current = levels[j];
      const next = levels[j + 1];

      const diff = Math.abs(current - next);
      if (diff < 1 || diff > 3) {
        isValid = false;
        break;
      }

      if (j === 0) {
        continue;
      }

      const prev = levels[j - 1];

      if (
        (prev < current && next < current) ||
        (prev > current && next > current)
      ) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      safeReports++;
    }
  }

  return safeReports;
}

function main() {
  const reports = getReports();
  console.log('Part 1: ', part1(reports));
}

main();
