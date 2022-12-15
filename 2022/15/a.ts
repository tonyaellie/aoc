export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const unparsed = input.split(/\r?\n/);

// e.g.
// Sensor at x=2, y=18: closest beacon is at x=-2, y=15

// get sensor position and closest beacon position
const sensors = unparsed.map((line) => {
  const [sensor, beacon] = line.split(':').map((part) => {
    const [x, y] = part.match(/x=(-?\d+), y=(-?\d+)/)!.slice(1);
    return { x: parseInt(x), y: parseInt(y) };
  });
  // radius is the distance between the sensor and the beacon
  const radius = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
  return { sensor, beacon, radius };
});

// get the biggest x and y values of sensor or beacon
const max = sensors.reduce(
  (max, { sensor, beacon }) => ({
    x: Math.max(max.x, sensor.x, beacon.x),
    y: Math.max(max.y, sensor.y, beacon.y),
  }),
  { x: 0, y: 0 }
);

// get the smallest x and y values of sensor or beacon
const min = sensors.reduce(
  (min, { sensor, beacon }) => ({
    x: Math.min(min.x, sensor.x, beacon.x, beacon.x),
    y: Math.min(min.y, sensor.y, beacon.y, beacon.y),
  }),
  { x: 0, y: 0 }
);

// create a grid of the size of the biggest x and y values
const grid = Array.from({ length: max.y - min.y + 1 }, () =>
  Array.from({ length: max.x - min.x + 1 }, () => '.')
);

// add sensors and beacons to the grid
sensors.forEach(({ sensor, beacon, radius }) => {
  grid[sensor.y - min.y][sensor.x - min.x] = 'S';
  grid[beacon.y - min.y][beacon.x - min.x] = 'B';
  // add the radius to the grid
  for (let i = 0; i <= radius; i++) {
    
});

// print the grid
grid.forEach((row) => console.log(row.join('')));
