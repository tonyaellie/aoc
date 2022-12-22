export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const unparsed = input.split(/\r?\n/);

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

const outOfRange = (x: number, y: number) =>
  sensors.every(
    ({ sensor, distance }) =>
      Math.abs(sensor.x - x) + Math.abs(sensor.y - y) > distance
  );

for (const { sensor, distance } of sensors) {
  for (const xSector of [-1, 1]) {
    for (const ySector of [-1, 1]) {
      for (let distX = 0; distX <= distance + 1; distX++) {
        const dy = distance + 1 - distX;
        const x = sensor.x + distX * xSector;
        const y = sensor.y + dy * ySector;
        if (
          x >= 0 &&
          y >= 0 &&
          x <= 4000000 &&
          y <= 4000000 &&
          outOfRange(x, y)
        ) {
          console.log(x * 4000000 + y);
          Deno.exit();
        }
      }
    }
  }
}
