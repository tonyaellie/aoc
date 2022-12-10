export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const directions = input.split('');

const santaCoords = { x: 0, y: 0 };
const roboSantaCoords = { x: 0, y: 0 };

const visitedHouses = new Set();

let isSanta = true;

directions.forEach((direction) => {
  switch (direction) {
    // north
    case '^':
      (isSanta ? santaCoords : roboSantaCoords).y++;
      break;
    // south
    case 'v':
      (isSanta ? santaCoords : roboSantaCoords).y--;
      break;
    // east
    case '>':
      (isSanta ? santaCoords : roboSantaCoords).x++;
      break;
    // west
    case '<':
      (isSanta ? santaCoords : roboSantaCoords).x--;
      break;
  }

  visitedHouses.add(
    `${(isSanta ? santaCoords : roboSantaCoords).x},${
      (isSanta ? santaCoords : roboSantaCoords).y
    }`
  );

  isSanta = !isSanta;
});

// get number of unique houses
console.log(visitedHouses.size);
