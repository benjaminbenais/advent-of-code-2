import { readFileSync } from '../../utils/readFileSync';
import { parseGroups } from './utils';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url);

const { seeds, groups } = parseGroups(puzzleInput);

type Range = [number, number];

function getRanges(sourceRange: Range, maps: number[][]): Range[] {
  const ranges: Range[] = [];

  const mapMin = Math.min(...maps.map((map) => map[1]));
  const mapMax = Math.max(...maps.map((map) => map[1] + map[2] - 1));

  if (sourceRange[0] < mapMin) {
    ranges.push([sourceRange[0], Math.min(mapMin - 1, sourceRange[1])]);
  }

  if (sourceRange[1] > mapMax) {
    ranges.push([Math.max(mapMax + 1, sourceRange[0]), sourceRange[1]]);
  }

  maps.forEach((map) => {
    if (sourceRange[0] <= map[1] + map[2] - 1 && sourceRange[1] >= map[1]) {
      const a = Math.max(sourceRange[0], map[1]);
      const b = Math.min(sourceRange[1], map[1] + map[2] - 1);
      const c = map[0] + a - map[1];
      ranges.push([c, c + b - a]);
    }
  });

  return ranges;
}

function findRanges(ranges: Range[], destination: string): Range[] {
  if (!groups[destination]) {
    return ranges;
  }

  const result: Range[] = [];
  ranges.forEach((range) => {
    const { maps, destination: nextDestination } = groups[destination];

    const innerRanges = getRanges(range, maps);

    result.push(...findRanges(innerRanges, nextDestination));
  });

  return result;
}

function main() {
  const groupedSeeds: Range[] = [];

  for (let i = 0; i < seeds.length; i += 2) {
    groupedSeeds.push([seeds[i], seeds[i] + seeds[i + 1]]);
  }

  const locations = findRanges(groupedSeeds, 'seed');
  return Math.min(...locations.flat());
}

const result = main();
console.log('result: ', result);
