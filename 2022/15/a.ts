export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const unparsed = input.split(/\r?\n/);

// e.g.
// Sensor at x=2, y=18: closest beacon is at x=-2, y=15

const row = 2000000;

const calculateManhattanDistance = (
  a: { x: number; y: number },
  b: { x: number; y: number }
) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

// get sensor position and closest beacon position
const sensors = unparsed.map((line) => {
  const [sensor, beacon] = line.split(':').map((part) => {
    const [x, y] = part.match(/x=(-?\d+), y=(-?\d+)/)!.slice(1);
    return { x: parseInt(x), y: parseInt(y) };
  });
  const distance = calculateManhattanDistance(sensor, beacon);
  return { sensor, beacon, distance };
});

// find all sensors that are within range of y=2000000
const inRange = sensors.filter(({ sensor, distance }) => {
  return sensor.y + distance >= row && sensor.y - distance <= row;
});

// find max x and y and min x and y
const maxX = Math.max(
  ...sensors.map(({ sensor, beacon }) => Math.max(sensor.x, beacon.x))
);
const minX = Math.min(
  ...sensors.map(({ sensor, beacon }) => Math.min(sensor.x, beacon.x))
);
const maxRange = Math.max(...sensors.map(({ distance }) => distance));

console.log(maxX + maxRange - (minX - maxRange));

const rowArray: string[] = [];

// for all locations in row 2000000 we check if there in range of any sensor
for (let x = minX - maxRange; x <= maxX + maxRange; x++) {
  if (
    inRange.filter(({ sensor, distance }) => {
      const distanceTo2 = calculateManhattanDistance(sensor, { x, y: row });
      if (distanceTo2 <= distance) {
        return true;
      }
    }).length > 0
  ) {
    rowArray.push('#');
  } else {
    rowArray.push('.');
  }
}

// count number of beacons that are on row 2000000
const beacons = sensors.filter(({ beacon }) => beacon.y === row);
beacons.forEach(({ beacon }) => {
  rowArray[beacon.x - minX + maxRange] = 'B';
});

// console.log(rowArray.join(''));

// count number of # in rowArray
console.log(rowArray.filter((char) => char === '#').length);
