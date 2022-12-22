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

let count = 0;

const seenXs = new Set();
inRange.forEach(({ sensor, beacon, distance }) => {
  if (sensor.y === row) seenXs.add(sensor.x);
  if (beacon.y === row) seenXs.add(beacon.x);

  for (let x = sensor.x - distance; x <= sensor.x + distance; x++) {
    if (
      !seenXs.has(x) &&
      Math.abs(sensor.x - x) + Math.abs(sensor.y - row) <= distance
    ) {
      seenXs.add(x);
      count++;
    }
  }
});

console.log(count);
