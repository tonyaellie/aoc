export const x = '';

const input = await Deno.readTextFile('./input.txt');

const vowels = ['a', 'e', 'i', 'o', 'u'];
const badStrings = ['ab', 'cd', 'pq', 'xy'];

const strings = input.split(/\r?\n/);

const niceStrings = strings.filter((string) => {
  const contains3Vowels =
    string.split('').filter((char) => vowels.includes(char)).length >= 3;
  const containsDoubleLetter = string
    .split('')
    .some((char, i) => char === string[i + 1]);
  const containsBadString = badStrings.some((badString) =>
    string.includes(badString)
  );

  return contains3Vowels && containsDoubleLetter && !containsBadString;
});

console.log(niceStrings.length);
