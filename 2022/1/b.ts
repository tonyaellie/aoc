export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split input by empty line
const groups = input.split(/\r?\n\r?\n/);

// for each group map to the sum of them
const sum = groups.map((group) => {
  // split group by new line
  const cals = group.split(/\r?\n/);
  // return sum of cals as number
  return cals.reduce((acc, cal) => acc + Number(cal), 0);
});

// sort by size
const sorted = sum.sort((a, b) => a - b);

// get 3 sums that is biggest
const max = sorted.slice(-3);

console.log(max.reduce((acc, val) => acc + val, 0));
