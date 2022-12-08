export const x = '';

const input = await Deno.readTextFile('./input.txt');

// 30373
// 25512
// 65332
// 33549
// 35390

// convert the input grid to a 2d array
const grid: number[][] = input
  .split(/\r?\n/)
  .map((row) => row.split('').map((char) => parseInt(char, 10)));

// calculate the scenic value of all cells, the scenic value is the number of trees
// until the next taller tree (not including that tree) or the edge of the grid in each
// direction (top, bottom, left, right) multiplied together
const treeMap: number[][] = grid.map((row, y) => {
  return row.map((cell, x) => {
    // get lists of the cells in each direction
    // and count the number of trees until the
    // next taller tree (not including that tree)
    const top = grid
      .map((row) => row[x])
      .slice(0, y)
      .reverse();
    const topScore =
      top.findIndex((cellT) => cellT >= cell) === -1
        ? top.length
        : top.findIndex((cellT) => cellT >= cell) + 1;
    const bottom = grid.map((row) => row[x]).slice(y + 1);
    const bottomScore =
      bottom.findIndex((cellB) => cellB >= cell) === -1
        ? bottom.length
        : bottom.findIndex((cellB) => cellB >= cell) + 1;
    const left = grid[y].slice(0, x).reverse();
    const leftScore =
      left.findIndex((cellL) => cellL >= cell) === -1
        ? left.length
        : left.findIndex((cellL) => cellL >= cell) + 1;
    const right = grid[y].slice(x + 1);
    const rightScore =
      right.findIndex((cellR) => cellR >= cell) === -1
        ? right.length
        : right.findIndex((cellR) => cellR >= cell) + 1;
    return topScore * bottomScore * leftScore * rightScore;
  });
});

// print the grid
grid.forEach((row) => console.log(row.join('')));

// find the cell with the highest scenic value
const max = treeMap.flat().reduce((a, b) => Math.max(a, b));

console.log(max);
