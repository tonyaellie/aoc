export const x = '';

const input = await Deno.readTextFile('./input.txt');

const lines = input.split(/\r?\n/);

let starts: string[] = [];
let target: string = '0,0';

const vals: any = {
  S: 0,
  E: 26,
};

type Node = {
  x: number;
  y: number;
};

const heightMap: number[][] = lines.map((line, y) => {
  const row = line.split('').map((char, x) => {
    if (char === 'S' || char === 'a') {
      console.log('S', { x, y });
      starts.push(`${x},${y}`);
    }
    if (char === 'E') {
      console.log('E', { x, y });
      target = `${x},${y}`;
    }
    // if lower case ascii char
    if (char.charCodeAt(0) > 96) {
      return char.charCodeAt(0) - 96;
    }

    return vals[char] || 0;
  });
  return row;
});

const routes = new Map<string, string[]>();

// console.log('heightMap', target, start);
// // log heightmap
// heightMap.forEach((row) => {
//   console.log(row.map((node) => node.toString().padStart(2, '0')).join(' '));
// });

// for each node in the heightmap add valid paths
heightMap.forEach((row, y) => {
  row.forEach((node, x) => {
    const key = `${x},${y}`;

    const paths: string[] = [];

    const up = heightMap[y - 1]?.[x];
    const down = heightMap[y + 1]?.[x];
    const left = heightMap[y]?.[x - 1];
    const right = heightMap[y]?.[x + 1];

    if (up && up - 1 <= node) {
      paths.push(`${x},${y - 1}`);
    }
    if (down && down - 1 <= node) {
      paths.push(`${x},${y + 1}`);
    }
    if (left && left - 1 <= node) {
      paths.push(`${x - 1},${y}`);
    }
    if (right && right - 1 <= node) {
      paths.push(`${x + 1},${y}`);
    }

    routes.set(key, paths);
  });
});

const bfs = (start: string) => {
  const visited = new Set<string>();
  const queue: {
    node: string;
    path: string[];
  }[] = [{ node: start, path: [] }];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      console.log('no current');
      continue;
    }
    const destinations = routes.get(current.node);
    if (!destinations) {
      console.log('no destinations');
      continue;
    }
    for (const destination of destinations) {
      if (destination === target) {
        console.log('found target');
        return current;
      }
      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push({
          node: destination,
          path: [...current.path, destination],
        });
      }
    }
  }
};

const paths = starts
.map((start) => {
    const route=bfs(start);
    if(!route) {
return;
    }
    return [start,...route!.path,target];
})
// remove undefined
.filter((path) => path) as unknown as string[];

const shortestPath = paths.sort((a, b) => a.length - b.length)[0];

// print grid with path
heightMap.forEach((row, y) => {
  const line = row.map((node, x) => {
    const key = `${x},${y}`;
    if (shortestPath.includes(key)) {
      return '#';
    }
    return '.';
  });
  console.log(line.join(''));
});

console.log('path', shortestPath.length - 1);
