export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const directions = input.split(/\r?\n/);

// create a 1000 x 1000 grid
const grid: boolean[][] = Array.from({ length: 1000 }, () =>
  Array.from({ length: 1000 }, () => false)
);

directions.forEach((direction) => {
  const [change, start, end] = direction.split(' ');
  const [startX, startY] = start.split(',').map((n) => parseInt(n));
  const [endX, endY] = end.split(',').map((n) => parseInt(n));

  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      if (change === 'on') {
        grid[x][y] = true;
      } else if (change === 'off') {
        grid[x][y] = false;
      } else if (change === 'toggle') {
        grid[x][y] = !grid[x][y];
      }
    }
  }
});

// count the number of lights that are on
const lightsOn = grid.reduce((acc, row) => {
  return acc + row.reduce((acc, light) => (light ? acc + 1 : acc), 0);
}, 0);

console.log(lightsOn);
