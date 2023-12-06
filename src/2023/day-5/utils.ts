export type Seeds = number[];
export type Group = {
  destination: string;
  maps: number[][];
};

export type Groups = {
  seeds: Seeds;
  groups: Record<string, Group>;
};

function parseSeeds(str: string): number[] {
  return str.split(': ')[1].split(' ').map(Number);
}

function parseGroupHeader(str: string): {
  source: string;
  destination: string;
} {
  const [source, , destination] = str.replace(/\smap\:/g, '').split('-');

  return {
    source,
    destination,
  };
}

function parseNumbers(str: string[]): number[][] {
  return str.map((s) => s.split(' ').map(Number));
}

export function parseGroups(str: string): Groups {
  const [seedsLine, ...rest] = str.split('\n\n');

  const seeds = parseSeeds(seedsLine);

  const groups: Record<string, Group> = {};

  rest.forEach((group) => {
    const [groupTitle, ...numbers] = group.split('\n');
    const { source, destination } = parseGroupHeader(groupTitle);
    const maps = parseNumbers(numbers);

    groups[source] = {
      destination,
      maps,
    };
  });

  return {
    seeds,
    groups,
  };
}
