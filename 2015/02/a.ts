export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const presents = input.split(/\r?\n/);

const presentsSurfaceArea = presents.map((present) => {
  const [l, w, h] = present.split('x').map((n) => parseInt(n, 10));
  const lw = l * w;
  const wh = w * h;
  const hl = h * l;
  return 2 * lw + 2 * wh + 2 * hl + Math.min(lw, wh, hl);
});

console.log(presentsSurfaceArea.reduce((a, b) => a + b, 0));
