export const x = '';

const input = await Deno.readTextFile('./input.txt');

const head = {
  x: 0,
  y: 0,
};

const tail = {
  x: 0,
  y: 0,
};

const visited: {
  x: number;
  y: number;
}[] = [];

// split input by line
const instructions = input.split(/\r?\n/);

instructions.forEach((instruction) => {
  // split instruction by direction and distance
  const [direction, distance] = instruction.split(' ');
  // console.log(instruction);

  // for each step in the distance
  for (let i = 0; i < parseInt(distance); i++) {
    // move the head one step in the direction
    switch (direction) {
      case 'R':
        head.x++;
        break;
      case 'L':
        head.x--;
        break;
      case 'U':
        head.y++;
        break;
      case 'D':
        head.y--;
        break;
    }

    // now if the tail is not within one step of the head
    // move the tail one step in the direction

    // if the head is directly above the tail
    if (head.y - tail.y > 1 && head.x - tail.x === 0) {
      // move the tail up
      tail.y++;
    }

    // if the head is directly below the tail
    if (head.y - tail.y < -1 && head.x - tail.x === 0) {
      // move the tail down
      tail.y--;
    }

    // if the head is directly to the right of the tail
    if (head.x - tail.x > 1 && head.y - tail.y === 0) {
      // move the tail right
      tail.x++;
    }

    // if the head is directly to the left of the tail
    if (head.x - tail.x < -1 && head.y - tail.y === 0) {
      // move the tail left
      tail.x--;
    }

    // if the head is diagonal then move the tail diagonally
    // up 2 and right 1 or up 1 and right 2
    // move the tail up and right
    if (
      (head.y - tail.y === 2 && head.x - tail.x === 1) ||
      (head.y - tail.y === 1 && head.x - tail.x === 2)
    ) {
      tail.y++;
      tail.x++;
    }
    // up 2 and left 1 or up 1 and left 2
    // move the tail up and left
    if (
      (head.y - tail.y === 2 && head.x - tail.x === -1) ||
      (head.y - tail.y === 1 && head.x - tail.x === -2)
    ) {
      tail.y++;
      tail.x--;
    }
    // down 2 and right 1 or down 1 and right 2
    // move the tail down and right
    if (
      (head.y - tail.y === -2 && head.x - tail.x === 1) ||
      (head.y - tail.y === -1 && head.x - tail.x === 2)
    ) {
      tail.y--;
      tail.x++;
    }
    // down 2 and left 1 or down 1 and left 2
    // move the tail down and left
    if (
      (head.y - tail.y === -2 && head.x - tail.x === -1) ||
      (head.y - tail.y === -1 && head.x - tail.x === -2)
    ) {
      tail.y--;
      tail.x--;
    }

    // console.log('head', h);
    // console.log('tail', t);
    // console.log('---');
    visited.push({ x: tail.x, y: tail.y });
  }
});

// remove duplicates from the visited array
const unique = visited.filter(
  (v, i, a) => a.findIndex((t) => t.x === v.x && t.y === v.y) === i
);

console.log(unique.length);
