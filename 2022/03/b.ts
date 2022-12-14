export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split input by newlines
const rucksacks = input.split(/\r?\n/);
// split into groups of 3
const groups = rucksacks.reduce((acc: string[][], cur, i) => {
  if (i % 3 === 0) {
    acc.push([]);
  }
  acc[acc.length - 1].push(cur);
  return acc;
}, []);

console.log(groups[0]);

// for each rucksack map to priority of items in rucksack
const priorites = groups.map(([rucksack1, rucksack2, rucksack3]) => {
  // find duplicate between all 3 rucksacks
  const badge = rucksack1
    .split('')
    .filter(
      (item) =>
        rucksack2.split('').includes(item) && rucksack3.split('').includes(item)
    )[0];

  // get ascii value to get priority
  return badge.charCodeAt(0) > 96
    ? badge.charCodeAt(0) - 96
    : badge.charCodeAt(0) - 38;
});

// sum all priorities
const totalScore = priorites.reduce((a, b) => a + b, 0);

// output
console.log(totalScore);
