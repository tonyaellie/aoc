export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const directions = input.split('');

const santaCoords = { x: 0, y: 0 };

const visitedHouses = new Set();

directions.forEach((direction) => {
  switch (direction) {
    // north
    case '^':
      santaCoords.y++;
      break;
    // south
    case 'v':
      santaCoords.y--;
      break;
    // east
    case '>':
      santaCoords.x++;
      break;
    // west
    case '<':
      santaCoords.x--;
      break;
  }

  visitedHouses.add(`${santaCoords.x},${santaCoords.y}`);
});

// get number of unique houses
console.log(visitedHouses.size);
