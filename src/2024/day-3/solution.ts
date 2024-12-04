import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url);

function getInstructions(memory: string): RegExpExecArray[] {
  return [...memory.matchAll(/mul\(\d+,\d+\)/g)];
}

function getConditions(memory: string): RegExpExecArray[] {
  return [...memory.matchAll(/(do\(\))|(don't\(\))/g)];
}

function executeInstruction(instruction: string): number {
  const [a, b] = instruction.match(/\d+/g) || [0, 0];
  return +a * +b;
}

function part1(memory: string): number {
  const instructions = getInstructions(memory);

  let result = 0;

  instructions.forEach(([instruction]) => {
    result += executeInstruction(instruction);
  });

  return result;
}

function part2(memory: string): number {
  const instructions = getInstructions(memory);

  let result = 0;

  instructions?.forEach((match) => {
    const instruction = match[0];
    const index = match.index;

    // Extract the portion of the memory that comes before the current instruction
    // as there is no need to check for conditions after the current instruction.
    const partialMemory = memory.slice(0, Math.max(0, index));
    const conditions = getConditions(partialMemory);

    if (conditions.length) {
      const [lastCondition] = conditions[conditions.length - 1];

      if (lastCondition === 'do()') {
        result += executeInstruction(instruction);
      }
    } else {
      result += executeInstruction(instruction);
    }
  });

  return result;
}

console.log('Part 1: ', part1(puzzleInput));
console.log('Part 2: ', part2(puzzleInput));
//   Part 1:  190604937
// Part 2:  82857512
