export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const unparsed = input.split(/\r?\n/);

// e.g.
// Sensor at x=2, y=18: closest beacon is at x=-2, y=15

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

console.time('a');
for (let y = 0; y <= 4000000; y++) {
  const inRange = sensors.filter(({ sensor, distance }) => {
    return sensor.y + distance >= y && sensor.y - distance <= y;
  });
  // for all in range find the edges of the range
  const edges = inRange.map(({ sensor, distance }) => {
    // find the furthest left and right within range where it intersects the y
    // distance is the max distance from the sensor
    const distanceTo2 = calculateManhattanDistance(sensor, { x: 0, y });
    const x = Math.sqrt(distance ** 2 - distanceTo2 ** 2);
    return { left: sensor.x - x, right: sensor.x + x };
    // not sure if this is correct
  });

  // find if there is a gap between the edges
  
  // if there is a gap log it

  // check if y % 1000 === 0
  if (y % 1000 === 0) {
    console.log(y);
  }
}
console.timeEnd('a');
