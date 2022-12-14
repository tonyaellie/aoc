export const x = '';

const stacks = await Deno.readTextFile('./stacks.txt');
const input = await Deno.readTextFile('./input.txt');

// split stacks by empty line
const line = stacks.split(/\r?\n/);

// initiate a list of 9 stacks
const stacksList: string[][] = [[], [], [], [], [], [], [], [], []];
// const stacksList: string[][] = [[], [], []];

// iterate over the line
line.forEach((line) => {
  // split at |
  const values = line.split('|');
  // iterate over the values
  values.forEach((value, index) => {
    // if the value is A-Z add it to the stack
    if (/[A-Z]/.test(value)) {
      stacksList[index].push(value);
    }
  });
});

// console.log(stacksList);

const commands = input.split(/\r?\n/);

commands.forEach((command) => {
  const [number, from, to] = command.split('-');
  // for number of times#
  let values: string[] = [];
  for (let i = 0; i < parseInt(number); i++) {
    // console.log('from', parseInt(from) - 1, 'to', parseInt(to) - 1);
    // pop from stack
    const value = stacksList[parseInt(from) - 1].shift();
    // console.log('value', value);
    if (value) {
      // push to stack
      values.push(value);
    }
  }
  stacksList[parseInt(to) - 1] = values.concat(stacksList[parseInt(to) - 1]);
});

// console.log(stacksList);

// log first value of each stack
stacksList.forEach((stack) => {
  console.log(stack[0]);
});
