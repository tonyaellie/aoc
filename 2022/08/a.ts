export const x = '';

const input = await Deno.readTextFile('./input.txt');

// convert the input grid to a 2d array
const grid: number[][] = input
  .split(/\r?\n/)
  .map((row) => row.split('').map((char) => parseInt(char, 10)));

// map the grid to a true/false array of whether the cell is a tree visible from the outside
// a cell is only visible from the outside if it is the higher than all the cells in any
// direction (top, bottom, left, right)
const treeMap: boolean[][] = grid.map((row, y) => {
  return row.map((cell, x) => {
    // if the cell is on the edge its visible
    if (y === 0 || y === grid.length - 1 || x === 0 || x === row.length - 1) {
      return true;
    }
    // get lists of the cells in each direction
    const top = grid
      .map((row) => row[x])
      .slice(0, y)
      .some((cellT) => cellT >= cell);
    const bottom = grid
      .map((row) => row[x])
      .slice(y + 1)
      .some((cellB) => cellB >= cell);
    const left = grid[y].slice(0, x).some((cellL) => cellL >= cell);
    const right = grid[y].slice(x + 1).some((cellR) => cellR >= cell);
    return !(top && bottom && left && right);
  });
});

// map to a grid of 1 and 0 for easier debugging
const gridMap = treeMap.map((row) => row.map((cell) => (cell ? 1 : 0)));

// print the grid
gridMap.forEach((row) => console.log(row.join('')));

// count the number of trees visible from the outside
const trees = treeMap.flat().filter((cell) => cell).length;

console.log(trees);
