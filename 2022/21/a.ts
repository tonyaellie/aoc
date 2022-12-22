export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const unparsed = input.split(/\r?\n/);

// create a map
const map = new Map<string, number | string>();

unparsed.forEach((line) => {
  const [key, value] = line.split(': ');
  // if value is a number, then add to map
  // if value is an expression, then add to map
  map.set(key, isNaN(parseInt(value)) ? value : parseInt(value));
});

const decode = (value: number | string): number => {
  if (typeof value === 'number') return value;
  const [a, opp, b] = value.split(' ');
  const aVal = decode(map.get(a)!);
  const bVal = decode(map.get(b)!);
  // if + then add, if * then multiply
  // if - then subtract, if / then divide
  switch (opp) {
    case '+':
      return aVal + bVal;
    case '*':
      return aVal * bVal;
    case '-':
      return aVal - bVal;
    case '/':
      return aVal / bVal;
  }
  throw new Error('Invalid operator');
};

console.log(decode(map.get('root')!));
