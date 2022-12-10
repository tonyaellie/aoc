import { createHash } from 'https://deno.land/std@0.91.0/hash/mod.ts';

export const x = '';

const input = await Deno.readTextFile('./input.txt');

let hash = '';
let num = 0;

// while hash does not start with 5 zeros
while (!hash.startsWith('000000')) {
  num++;
  hash = createHash('md5')
    .update(input + num.toString())
    .toString();
}

console.log(num);
