export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const instructions = input.split(/\r?\n/);

let accumulator = 1;
let cycle = 0;

// create a 40 by 6 grid
const grid = Array.from(Array(6), (e) => Array.from(Array(40), (e) => '.'));

const printGrid = (grid: string[][]) => {
  grid.forEach((row) => {
    console.log(row.join(''));
  });
};

// printGrid(grid);

const execCycle = () => {
  // here is where the drawing happens
  const row = Math.floor(cycle / 40);
  const col = cycle % 40;
  if (
    col === accumulator ||
    col === accumulator - 1 ||
    col === accumulator + 1
  ) {
    grid[row][col] = '#';
  }
  cycle++;
};

instructions.forEach((instruction) => {
  const [operation, argument] = instruction.split(' ');
  if (operation === 'noop') {
    execCycle();
  } else if (operation === 'addx') {
    execCycle();
    execCycle();
    accumulator += parseInt(argument, 10);
  }
});

printGrid(grid);
