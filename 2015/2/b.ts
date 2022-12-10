export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const presents = input.split(/\r?\n/);

const presentsSurfaceArea = presents.map((present) => {
  const [l, w, h] = present.split('x').map((n) => parseInt(n, 10));
  const lw = 2 * l + 2 * w;
  const wh = 2 * w + 2 * h;
  const hl = 2 * h + 2 * l;
  return l * w * h + Math.min(lw, wh, hl);
});

console.log(presentsSurfaceArea.reduce((a, b) => a + b, 0));
