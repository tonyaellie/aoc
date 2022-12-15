export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const instructions = input.split(/\r?\n/);

let accumulator = 1;
let cycle = 0;
let counter = 0;

const execCycle = () => {
  cycle++;
  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    console.log(cycle, accumulator, cycle * accumulator);
    counter += cycle * accumulator;
  }
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

console.log(counter);
