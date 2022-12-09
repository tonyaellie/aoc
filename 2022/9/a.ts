export const x = '';

const input = await Deno.readTextFile('./input.txt');

const h = {
  x: 0,
  y: 0,
};

const t = {
  x: 0,
  y: 0,
};

type Cell = {
  visited: boolean;
  start?: boolean;
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
        h.x++;
        break;
      case 'L':
        h.x--;
        break;
      case 'U':
        h.y++;
        break;
      case 'D':
        h.y--;
        break;
    }

    // now if the tail is not within one step of the head
    // move the tail one step in the direction

    // if the head is directly above the tail
    if (h.y - t.y > 1 && h.x - t.x === 0) {
      // move the tail up
      t.y++;
    }

    // if the head is directly below the tail
    if (h.y - t.y < -1 && h.x - t.x === 0) {
      // move the tail down
      t.y--;
    }

    // if the head is directly to the right of the tail
    if (h.x - t.x > 1 && h.y - t.y === 0) {
      // move the tail right
      t.x++;
    }

    // if the head is directly to the left of the tail
    if (h.x - t.x < -1 && h.y - t.y === 0) {
      // move the tail left
      t.x--;
    }

    // if the head is diagonal then move the tail diagonally
    // up 2 and right 1 or up 1 and right 2
    // move the tail up and right
    if (
      (h.y - t.y === 2 && h.x - t.x === 1) ||
      (h.y - t.y === 1 && h.x - t.x === 2)
    ) {
      t.y++;
      t.x++;
    }
    // up 2 and left 1 or up 1 and left 2
    // move the tail up and left
    if (
      (h.y - t.y === 2 && h.x - t.x === -1) ||
      (h.y - t.y === 1 && h.x - t.x === -2)
    ) {
      t.y++;
      t.x--;
    }
    // down 2 and right 1 or down 1 and right 2
    // move the tail down and right
    if (
      (h.y - t.y === -2 && h.x - t.x === 1) ||
      (h.y - t.y === -1 && h.x - t.x === 2)
    ) {
      t.y--;
      t.x++;
    }
    // down 2 and left 1 or down 1 and left 2
    // move the tail down and left
    if (
      (h.y - t.y === -2 && h.x - t.x === -1) ||
      (h.y - t.y === -1 && h.x - t.x === -2)
    ) {
      t.y--;
      t.x--;
    }

    // console.log('head', h);
    // console.log('tail', t);
    // console.log('---');
    visited.push({ x: t.x, y: t.y });
  }
});

// remove duplicates from the visited array
const unique = visited.filter(
  (v, i, a) => a.findIndex((t) => t.x === v.x && t.y === v.y) === i
);

console.log(unique.length);
