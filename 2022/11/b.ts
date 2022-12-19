export const x = '';

const input = await Deno.readTextFile('./input.txt');

type Monkey = {
  items: number[];
  operation: string;
  inspections: number;
  test: {
    divisor: number;
    true: number;
    false: number;
  };
};

// split by line
const unparsedMonkeys = input.split(/\r?\n\r?\n/);

const monkeys: Monkey[] = unparsedMonkeys.map((unparsedMonkey) => {
  const [
    ,
    unparsedItems,
    unparsedOperation,
    unparsedTestDivisor,
    unparsedTestTrue,
    unparsedTestFalse,
  ] = unparsedMonkey.split(/\r?\n/);
  // strip '  Starting items:' from items and split by ', '
  const items = unparsedItems.slice(17).split(', ').map(Number);
  // strip '  Operation: new =' from operation
  const operation = unparsedOperation.slice(19);
  // strip '  Test: divisible by ' from testDivisor
  const testDivisor = Number(unparsedTestDivisor.slice(21));
  // strip '    If true: throw to monkey ' from testTrue
  const testTrueValue = Number(unparsedTestTrue.slice(29));
  // strip '    If false: throw to monkey ' from testFalse
  const testFalseValue = Number(unparsedTestFalse.slice(30));
  return {
    items: items,
    operation,
    inspections: 0,
    test: {
      divisor: testDivisor,
      true: testTrueValue,
      false: testFalseValue,
    },
  };
});

// m is the multiple of the divisors
const m = monkeys.reduce((acc, monkey) => {
  return acc * monkey.test.divisor;
}, 1);

for (let i = 0; i < 10000; i++) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      monkey.inspections++;
      const equation = monkey.operation.replaceAll('old', item.toString());
      const [left, operation, right] = equation.split(' ');
      const leftValue = Number(left),
        rightValue = Number(right);
      let result = 0;
      if (operation === '+') {
        result = leftValue + rightValue;
      } else if (operation === '*') {
        result = leftValue * rightValue;
      }
      // divide by 3 and floor
      // const newResult = Math.floor(result / 3);
      if (result % monkey.test.divisor === 0) {
        monkeys[monkey.test.true].items.push(result % m);
      } else {
        monkeys[monkey.test.false].items.push(result % m);
      }
    });
    monkey.items = [];
  });
}

// sport the monkeys by inspections
monkeys.sort((a, b) => a.inspections - b.inspections);

// get the two monkeys with the most inspections
const [first, second] = monkeys.slice(-2);

console.log(first.inspections * second.inspections);
