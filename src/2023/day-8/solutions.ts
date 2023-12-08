import { readFileSync } from '../../utils/readFileSync';

const puzzleInput = readFileSync('./puzzle-input.txt', import.meta.url).split(
  '\n',
);

/*

  Disclaimer:

  Final result of part two was found by inserting
  the iterations count in Google Sheets and using the
  builtin `LCM` function.

  Still gotta get the correct numbers to input ;)

*/

type Map = {
  directions: number[];
  nodes: Record<string, [string, string]>;
};

function generateMap(): Map {
  const [rawDirections, , ...rawNodes] = puzzleInput;
  const directions = rawDirections.split('').map((el) => (el === 'L' ? 0 : 1));
  const nodes: Map['nodes'] = {};

  rawNodes.forEach((node) => {
    const [key, next] = node.split(' = ');
    const formattedDirections = next.replace(/\(|\)/g, '').split(', ') as [
      string,
      string,
    ];

    nodes[key] = formattedDirections;
  });

  return { directions, nodes };
}

function findNodes(
  directions: Map['directions'],
  nodes: Map['nodes'],
  endingNodes: string[],
) {
  return (startingNode: string) => {
    let currentNode = startingNode;
    let count = 0;

    while (true) {
      for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        currentNode = nodes[currentNode][direction];
        count++;

        if (endingNodes.includes(currentNode)) {
          return count;
        }
      }
    }
  };
}

function part1() {
  const { directions, nodes } = generateMap();
  const endingNodes = ['ZZZ'];
  return findNodes(directions, nodes, endingNodes)('AAA');
}

function part2() {
  const { directions, nodes } = generateMap();

  const startingNodes = Object.keys(nodes).filter((node) => node.endsWith('A'));
  const endingNodes = Object.keys(nodes).filter((node) => node.endsWith('Z'));

  const cb = findNodes(directions, nodes, endingNodes);
  return startingNodes.map(cb);
}

const p1 = part1();
const p2 = part2();
console.log('p1: ', p1);
console.log('p2: ', p2);
