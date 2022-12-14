export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split input by empty line
const pairs = input.split(/\r?\n/);

const expand = (range: string) => {
  const [start, end] = range.split('-').map(Number);
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};

const print = (original: string) => {
  const arr = expand(original);
  const rows = [];
  for (let i = 1; i < 11; i += 1) {
    rows.push(arr.includes(i) ? '_' : '.');
  }
  console.log(`${rows.join('')}   ${original}`);
};

// for each pair check if one of the pair cotains the other
const valid = pairs.filter((pair) => {
  console.log('---');
  const [a, b] = pair.split(',');
  print(a);
  print(b);

  // check if the first of a is bigger than the first of b and the last of a is smaller than the last of b
  const [aStart, aEnd] = a.split('-').map(Number);
  const [bStart, bEnd] = b.split('-').map(Number);
  const aContainsB =
    (aStart <= bStart && bStart <= aEnd) || (aEnd >= bEnd && bEnd >= aStart);
  const bContainsA =
    (bStart <= aStart && aStart <= bEnd) || (bEnd >= aEnd && aEnd >= bStart);
  console.log(aContainsB || bContainsA);
  return aContainsB || bContainsA;
});

console.log(valid.length);
