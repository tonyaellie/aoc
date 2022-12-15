export const x = '';

const input = await Deno.readTextFile('./input.txt');

type Point = {
  x: number;
  y: number;
  name: string;
};

const rope: Point[] = [
  { x: 0, y: 0, name: 'H' },
  { x: 0, y: 0, name: '2' },
  { x: 0, y: 0, name: '3' },
  { x: 0, y: 0, name: '4' },
  { x: 0, y: 0, name: '5' },
  { x: 0, y: 0, name: '6' },
  { x: 0, y: 0, name: '7' },
  { x: 0, y: 0, name: '8' },
  { x: 0, y: 0, name: '9' },
  { x: 0, y: 0, name: 'T' },
];

const visited: {
  x: number;
  y: number;
}[] = [];

const calcPoint = (head: Point, tail: Point) => {
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

  // these === don't work because the head and tail are not always
  // exactly one step apart

  // if the head is diagonal then move the tail diagonally
  // up 2 and right 1 or up 1 and right 2
  // move the tail up and right
  if (
    (head.y - tail.y === 2 && head.x - tail.x === 1) ||
    (head.y - tail.y === 1 && head.x - tail.x === 2) ||
    (head.y - tail.y === 2 && head.x - tail.x === 2)
  ) {
    tail.y++;
    tail.x++;
  }
  // up 2 and left 1 or up 1 and left 2
  // move the tail up and left
  if (
    (head.y - tail.y === 2 && head.x - tail.x === -1) ||
    (head.y - tail.y === 1 && head.x - tail.x === -2) ||
    (head.y - tail.y === 2 && head.x - tail.x === -2)
  ) {
    tail.y++;
    tail.x--;
  }
  // down 2 and right 1 or down 1 and right 2
  // move the tail down and right
  if (
    (head.y - tail.y === -2 && head.x - tail.x === 1) ||
    (head.y - tail.y === -1 && head.x - tail.x === 2) ||
    (head.y - tail.y === -2 && head.x - tail.x === 2)
  ) {
    tail.y--;
    tail.x++;
  }
  // down 2 and left 1 or down 1 and left 2
  // move the tail down and left
  if (
    (head.y - tail.y === -2 && head.x - tail.x === -1) ||
    (head.y - tail.y === -1 && head.x - tail.x === -2) ||
    (head.y - tail.y === -2 && head.x - tail.x === -2)
  ) {
    tail.y--;
    tail.x--;
  }

  return tail;
};

// split input by line
const instructions = input.split(/\r?\n/);

instructions.forEach((instruction) => {
  // split instruction by direction and distance
  const [direction, distance] = instruction.split(' ');

  // for each step in the distance
  for (let i = 0; i < parseInt(distance); i++) {
    // move the head one step in the direction
    switch (direction) {
      case 'R':
        rope[0].x++;
        break;
      case 'L':
        rope[0].x--;
        break;
      case 'U':
        rope[0].y++;
        break;
      case 'D':
        rope[0].y--;
        break;
    }

    rope.forEach((tail, i) => {
      // if i is 0 then we are at the head
      if (tail.name === 'H') return;
      // get the head
      const head = rope[i - 1];
      tail = calcPoint(head, tail);
      // if name is T then add the point to the visited array
      if (tail.name === 'T') {
        visited.push({ x: tail.x, y: tail.y });
      }
    });
  }
});

// remove duplicates from the visited array
const unique = visited.filter(
  (v, i, a) => a.findIndex((tail) => tail.x === v.x && tail.y === v.y) === i
);

console.log(unique.length);
