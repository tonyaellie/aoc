export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split input by newlines
const rucksacks = input.split(/\r?\n/);

// for each rucksack map to priority of items in rucksack
const priorites = rucksacks.map((rucksack) => {
  // convert rucksack to array of items
  const items = rucksack.split('');
  // split rucksack in half
  const halfPoint = items.length / 2;
  const left = items.slice(0, halfPoint);
  const right = items.slice(halfPoint);
  // find all duplicated items
  const duplicates = [...new Set(left.filter((item) => right.includes(item)))];
  // get ascii value to get priority then sum
  const priority = duplicates
    .map((item) =>
      item.charCodeAt(0) > 96
        ? item.charCodeAt(0) - 96
        : item.charCodeAt(0) - 38
    )
    .reduce((a, b) => a + b, 0);
  return priority;
});

// sum all priorities
const totalScore = priorites.reduce((a, b) => a + b, 0);

// output
console.log(totalScore);
