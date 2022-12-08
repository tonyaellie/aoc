export const x = '';

const input = await Deno.readTextFile('./input.txt');

// mapping
const score = {
  'A X': 3, // rock, lose
  'A Y': 4, // rock, draw
  'A Z': 8, // rock, win
  'B X': 1, // paper, lose
  'B Y': 5, // paper, draw
  'B Z': 9, // paper, win
  'C X': 2, // scissors, lose
  'C Y': 6, // scissors, draw
  'C Z': 7, // scissors, win
} as any;

// split input into lines
const lines = input.split(/\r?\n/);

// map array to score for each round
const scores = lines.map((line) => score[line]);

// sum scores
const totalScore = scores.reduce((a, b) => a + b, 0);

// output
console.log(totalScore);
