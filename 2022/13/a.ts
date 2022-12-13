export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line
const pairs = input.split(/\r?\n\r?\n/);

type List = (number | List)[];

const compare = (left: List, right: List, root = true) => {
  // loop through list
  // if both items are integers
  //  if left is smaller -> order is correct
  //  if right is smaller -> order is incorrect
  //  if both are equal -> check next item
  // if both items are lists
  //  call compare on lists
  // if one item is integer and one is list
  //  convert item to list and call compare on lists
  // if run out of left items -> order is correct
  // if run out of right items -> order is incorrect

  // for loop with index
  for (const [index, leftItem] of left.entries()) {
    const rightItem = right[index];
    if (typeof leftItem === 'number' && typeof rightItem === 'number') {
      if (leftItem < rightItem) {
        return true;
      } else if (rightItem < leftItem) {
        return false;
      } else {
        // check next item
      }
    } else if (Array.isArray(leftItem) && Array.isArray(rightItem)) {
      const tmp: any = compare(leftItem, rightItem, false);
      // if not continue -> return
      if (tmp !== 'continue') {
        return tmp;
      }
    } else if (typeof leftItem === 'number' && Array.isArray(rightItem)) {
      // convert item to list and call compare on lists
      const tmp: any = compare([leftItem], rightItem, false);
      if (tmp !== 'continue') {
        return tmp;
      }
    } else if (Array.isArray(leftItem) && typeof rightItem === 'number') {
      // convert item to list and call compare on lists
      const tmp: any = compare(leftItem, [rightItem], false);
      if (tmp !== 'continue') {
        return tmp;
      }
    } else {
      // run out of left items -> order is correct
      // run out of right items -> order is incorrect
    }
  }
  if (left.length < right.length) {
    return true;
  }
  // if root and same length return 'continue'
  if (!root && left.length === right.length) {
    return 'continue';
  }
  return false;
};

const mapped = pairs.map((pair) => {
  // split by line
  const [unparsedLeft, unparsedRight] = pair.split(/\r?\n/);
  const left = JSON.parse(unparsedLeft);
  const right = JSON.parse(unparsedRight);
  return compare(left, right);
});

// we then print the sum of the index+1 for true
const sum = mapped.reduce((acc, curr, i) => {
  if (curr) {
    return acc + (i + 1);
  }
  return acc;
}, 0);

console.log(sum);
