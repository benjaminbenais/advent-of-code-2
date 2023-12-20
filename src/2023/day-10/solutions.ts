import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  '\n',
);
// const puzzleInput = readFileSync('./sample.txt', import.meta.url).split('\n');

type Pipe = '|' | '-' | 'L' | 'F' | '7' | 'J' | 'S';
type Grid = Pipe[][];
type Location = { x: number; y: number };
type Direction = 'NORTH' | 'SOUTH' | 'WEST' | 'EAST';

const ANIMAL = 'S';
const NORTH_CONNECTIONS = ['|', '7', 'F'];

function locateAnimal(grid: Grid): Location {
  let x = 0;
  let y = 0;

  for (let i = 0; i < grid.length; i++) {
    const currentRow = grid[i];
    const animal = currentRow.indexOf(ANIMAL);
    if (animal !== -1) {
      y = i;
      x = animal;
      break;
    }
  }

  return { x, y };
}

function findLoopDirection(
  grid: Grid,
  animalLocation: Location,
): 'NORTH' | 'SOUTH' {
  const northPipe = grid[animalLocation.y - 1][animalLocation.x];

  let direction: Direction = 'SOUTH'; // Default to South

  if (NORTH_CONNECTIONS.includes(northPipe)) {
    direction = 'NORTH';
  }

  return direction;
}

const DIRECTIONS = {
  NORTH: {
    '|': 'NORTH',
    F: 'EAST',
    '7': 'WEST',
  },
  SOUTH: {
    '|': 'SOUTH',
    L: 'EAST',
    J: 'WEST',
  },
  WEST: {
    '-': 'WEST',
    L: 'NORTH',
    F: 'SOUTH',
  },
  EAST: {
    '-': 'EAST',
    '7': 'SOUTH',
    J: 'NORTH',
  },
} as unknown as { [key in Direction]: { [pipe: string]: Direction } };

function getPipeDirection(pipe: Pipe, direction: Direction): Direction {
  return DIRECTIONS[direction][pipe] as unknown as Direction;
}

function main() {
  const grid = puzzleInput.map((line) => line.split('')) as Grid;
  const animalLocation = locateAnimal(grid);
  const directions = findLoopDirection(grid, animalLocation);

  let [x, y] = [
    animalLocation.x,
    directions === 'NORTH' ? animalLocation.y - 1 : animalLocation.y + 1,
  ];
  let currentDirection: Direction = directions;
  let count = 1;

  while (true) {
    const pipe = grid[y][x];

    if (pipe === 'S') {
      break;
    }

    const nextDirection = getPipeDirection(pipe, currentDirection);
    currentDirection = nextDirection;

    if (nextDirection === 'NORTH') {
      y--;
    } else if (nextDirection === 'SOUTH') {
      y++;
    } else if (nextDirection === 'EAST') {
      x++;
    } else {
      x--;
    }

    count++;
  }

  return count;
}

const p1 = main();
console.log('p1: ', p1 / 2);
