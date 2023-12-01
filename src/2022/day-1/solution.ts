import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const puzzleInput = fs.readFileSync(
  path.join(__dirname, './puzzle-input.txt'),
  'utf-8',
);

const parsedInput = puzzleInput
  .split('\n\n')
  .map((line) => line.split('\n').map((line) => Number(line)));

const totalCaloresPerElf = parsedInput.flatMap((calories) =>
  calories.reduce((acc: number, curr: number) => acc + curr, 0),
);

const sortedCalories = totalCaloresPerElf.sort((a, b) => b - a);

const solution1 = sortedCalories[0];
const solution2 = sortedCalories
  .slice(0, 3)
  .reduce((acc: number, curr: number) => acc + curr, 0);

console.log(solution1);
console.log(solution2);
