export const x = '';

const input = await Deno.readTextFile('./input.txt');

const strings = input.split(/\r?\n/);

const niceStrings = strings.filter((string) => {
  const letterPairs = string
    .split('')
    .slice(0, -1)
    .map((char, i) => char + string[i + 1]);
  const letterPair = letterPairs.some((letterPair, i) =>
    // remove overlapping pairs
    letterPairs.slice(i + 2).includes(letterPair)
  );
  const letterSandwich = string
    .split('')
    .some((char, i) => char === string[i + 2]);

  return letterPair && letterSandwich;
});

console.log(niceStrings.length);
