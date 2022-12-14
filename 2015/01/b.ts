export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const directions = input.split('');

let currentFloor = 0;

directions.forEach((direction, i) => {
  if (direction === '(') {
    currentFloor++;
  } else if (direction === ')') {
    currentFloor--;
  }

  if (currentFloor === -1) {
    console.log(i + 1);
  }
});

console.log(currentFloor);
