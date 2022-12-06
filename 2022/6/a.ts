export const x = '';

const input = await Deno.readTextFile('./input.txt');

const buffer: string[] = [];

let done = false;

input.split('').forEach((char, i) => {
  // if done, return
  if (done) {
    return;
  }
  // add char to buffer
  buffer.push(char);
  // if buffer is more than 4 chars long
  if (buffer.length > 4) {
    // remove first char from buffer
    buffer.shift();
  }
  // if buffer is 4 chars long
  if (buffer.length === 4) {
    // if each char in buffer is different
    if (new Set(buffer).size === 4) {
      console.log(i + 1, buffer.join(''));
      done = true;
    }
  }
});
