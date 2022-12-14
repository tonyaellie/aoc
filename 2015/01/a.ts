export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const directions = input.split('');

let currentFloor = 0;

directions.forEach((direction) => {
  if (direction === '(') {
    currentFloor++;
  } else if (direction === ')') {
    currentFloor--;
  }
});

console.log(currentFloor);
