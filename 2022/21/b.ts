export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const unparsed = input.split(/\r?\n/);

// create a map
const map = new Map<string, number | string>();

unparsed.forEach((line) => {
  const [key, value] = line.split(': ');
  // if key is root replace + with =
  if (key === 'root') {
    map.set(key, value.replace(/\+/g, '='));
    return;
  } else if (key === 'humn') {
    map.set(key, 'x');
    return;
  }
  map.set(key, isNaN(parseInt(value)) ? value : parseInt(value));
});

type Equation = {
  a: number | Equation | 'x';
  opp: '+' | '-' | '*' | '/';
  b: number | Equation | 'x';
};

const decode = (value: number | string): number | Equation | 'x' => {
  if (typeof value === 'number') return value;
  if (value === 'x') return 'x';
  const [a, opp, b] = value.split(' ');
  const aVal = decode(map.get(a)!);
  const bVal = decode(map.get(b)!);
  // if a or b are strings then return
  if (typeof aVal !== 'number' || typeof bVal !== 'number')
    return {
      a: aVal,
      opp: opp as '+' | '-' | '*' | '/',
      b: bVal,
    };
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

const algebra = decode(map.get('root')!) as Equation;

console.log(algebra);

// {
//   a: {
//     a: {
//       a: 247581197056028,
//       opp: "-",
//       b: {
//         a: 2,
//         opp: "*",
//         b: ...
//       }
//     },
//     opp: "/",
//     b: 6
//   },
//   opp: "=",
//   b: 13439547545467
// }

const solve = (equation: Equation): number => {
  let acc = (
    typeof equation.a === 'number' ? equation.a : equation.b
  ) as number;
  console.log(acc);
  let current = typeof equation.a === 'number' ? equation.b : equation.a;

  while (typeof current === 'object') {
    console.log(acc, current);
    const aNum = typeof current.a === 'number';
    const tmpNum = (aNum ? current.a : current.b) as number;
    const tmpEquation = aNum ? current.b : current.a;
    switch (current.opp) {
      case '+':
        acc -= tmpNum;
        break;
      case '-':
        if (aNum) {
          acc = -acc + tmpNum;
        } else {
          acc += tmpNum;
        }
        break;
      case '*':
        acc /= tmpNum;
        break;
      case '/':
        if (aNum) {
          acc = tmpNum / acc;
        } else {
          acc *= tmpNum;
        }
        break;
    }
    current = tmpEquation;
  }
  return acc;
};

console.log(solve(algebra).toString());
