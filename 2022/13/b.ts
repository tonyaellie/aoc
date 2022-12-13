export const x = '';

const input = await Deno.readTextFile('./input.txt');

// split by line removing empty lines
const lists = input
  .split(/\r?\n/)
  .filter((x) => x)
  .map((x) => JSON.parse(x) as List);

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

// add to list
// [[2]]
// [[6]]

lists.push([[2]], [[6]]);

const sorted = lists.sort((a, b) => {
  const tmp = compare(a, b);
  if (tmp) {
    return -1;
  } else {
    return 1;
  }
});

// get index of [[2]] and [[6]]
const index2 =
  sorted.findIndex(
    (x) => Array.isArray(x) && Array.isArray(x[0]) && x[0][0] === 2
  ) + 1;
const index6 =
  sorted.findIndex(
    (x) => Array.isArray(x) && Array.isArray(x[0]) && x[0][0] === 6
  ) + 1;
console.log(index2 * index6);
