export const x = '';

const input = await Deno.readTextFile('./input.txt');

// mapping
const opponent = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
};
const response = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
};

// split input into lines
const lines = input.split('\n');

// map array to score for each round
const scores = lines.map((line) => {
  const [opponentMove, responseMove] = line.split(' ') as [
    'A' | 'B' | 'C',
    'X' | 'Y' | 'Z'
  ];
  let score = 0;
  // give o if lost 3 if draw 6 if won
  if (opponent[opponentMove] === response[responseMove]) {
    score = 3;
  } else if (
    (opponent[opponentMove] === 1 && response[responseMove] === 2) ||
    (opponent[opponentMove] === 2 && response[responseMove] === 3) ||
    (opponent[opponentMove] === 3 && response[responseMove] === 1)
  ) {
    score = 6;
  }
  // then add score for selected move
  score += response[responseMove];
  return score;
});

// sum scores
const totalScore = scores.reduce((a, b) => a + b, 0);

// output
console.log(totalScore);
