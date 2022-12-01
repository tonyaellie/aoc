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

// get sum that is biggest
const max = Math.max(...sum);

console.log(max);
