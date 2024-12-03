import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  '\n',
);

function isAscending(a: number, b: number, c: number) {
  return a < b && b < c;
}

function isDescending(a: number, b: number, c: number) {
  return a > b && b > c;
}

function isAscendingOrDescending(a: number, b: number, c: number) {
  return isAscending(a, b, c) || isDescending(a, b, c);
}

type Report = number[];

function getReports(): Report[] {
  return puzzleInput.map((line) => line.split(' ').map(Number));
}

function validateReport(levels: Report) {
  for (let i = 0; i < levels.length - 1; i++) {
    const currentLevel = levels[i];
    const nextLevel = levels[i + 1];

    const diff = Math.abs(currentLevel - nextLevel);

    if (diff < 1 || diff > 3) {
      return false;
    }

    if (i === 0) {
      continue;
    }

    const prevLevel = levels[i - 1];

    if (!isAscendingOrDescending(prevLevel, currentLevel, nextLevel)) {
      return false;
    }
  }

  return true;
}

// === Solutions ===
function part1(reports: Report[]): number {
  let safeReportsCount = 0;

  for (let i = 0; i < reports.length; i++) {
    const levels = reports[i];

    if (validateReport(levels)) {
      safeReportsCount++;
    }
  }

  return safeReportsCount;
}

function part2(reports: Report[]): number {
  let safeReportsCount = 0;

  for (let i = 0; i < reports.length; i++) {
    const levels = reports[i];

    if (validateReport(levels)) {
      safeReportsCount++;
    } else {
      for (let j = 0; j < reports.length; j++) {
        const newReport = [...levels];
        newReport.splice(j, 1);

        if (validateReport(newReport)) {
          safeReportsCount++;
          break;
        }
      }
    }
  }

  return safeReportsCount;
}

function main() {
  const reports = getReports();
  console.log('Part 1: ', part1(reports));
  console.log('Part 2: ', part2(reports));
}

main();
