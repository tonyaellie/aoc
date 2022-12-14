export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const lines = input.split(/\r?\n/);

// makes it easier to debug
const shift = 200;
const width = 600;

// x 460 / 529
// y 13 / 170

// sand spawner at 500,0

// # is rock
// . is air
// + is sand spawner
// o is sand

// find max y
const maxY = lines.reduce((acc, line) => {
  const lineParts = line.split(' -> ');
  const lineCoords = lineParts.map((linePart) =>
    Number(linePart.split(',')[1])
  );
  const maxY = lineCoords.reduce((acc, y) => {
    return Math.max(acc, y);
  }, 0);
  return Math.max(acc, maxY);
}, 0);

// create a 200 x 200 grid
const grid = Array.from({ length: maxY + 3 }, () =>
  Array.from({ length: width }, () => '.')
);

const getPos = (x: number, y: number) => {
  return grid[y][x];
};

const setPos = (x: number, y: number, val: string) => {
  grid[y][x] = val;
};

// set sand spawner
setPos(500 - shift, 0, '+');

const printGrid = (grid: string[][]) => {
  grid.forEach((row) => {
    // color yellow if o
    // color blue if #
    console.log(
      row
        .map((x) =>
          x === 'o' ? '\x1b[33mo\x1b[0m' : x === '#' ? '\x1b[34m#\x1b[0m' : x
        )
        .join('')
    );
  });
};

lines.forEach((line) => {
  // split line by ' -> '
  const lineParts = line.split(' -> ');
  const lineCoords = lineParts.map((linePart) => {
    // split line ','
    const [xTmp, yTmp] = linePart.split(',');
    const x = Number(xTmp) - shift;
    const y = Number(yTmp);
    return { x, y };
  });

  // for each coord, get the next coord and fill between with rock
  for (let i = 0; i < lineCoords.length - 1; i++) {
    const { x: x1, y: y1 } = lineCoords[i];
    const { x: x2, y: y2 } = lineCoords[i + 1];

    // if x1 === x2, fill y
    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        setPos(x1, y, '#');
      }
    }
    // if y1 === y2, fill x
    if (y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        setPos(x, y1, '#');
      }
    }
  }
});

// spawn sand
const spawnSand = () => {
  const sandPos = { x: 500 - shift, y: 0 };

  // y = 0 is the top
  // we want to go down
  // if we hit a rock we want to go down and left or down and right
  // if we can't go down and left or down and right then we are settled
  // if y > 180 then we are in the void, return true
  // if we settle then set the sand to o
  let settled = false;
  while (!settled) {
    // if y > maxY then we are in the void
    if (sandPos.y > maxY) {
      return true;
    }
    if (getPos(sandPos.x, sandPos.y + 1) !== '.') {
      // if we can't go down, try left and right
      if (getPos(sandPos.x - 1, sandPos.y + 1) !== '.') {
        if (getPos(sandPos.x + 1, sandPos.y + 1) !== '.') {
          setPos(sandPos.x, sandPos.y, 'o');
          // we are settled
          settled = true;
        } else {
          // go right
          sandPos.x++;
        }
      } else {
        // go left
        sandPos.x--;
      }
    }
    sandPos.y++;
  }
  return false;
};

console.log('starting');

// run until return true
let voided = false;
while (!voided) {
  voided = spawnSand();
}

// print grid
printGrid(grid);

// count the number 'o' in the grid
const count = grid.reduce((acc, row) => {
  return acc + row.filter((val) => val === 'o').length;
}, 0);

console.log('count', count);
