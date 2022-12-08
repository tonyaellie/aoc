export const x = '';

const input = await Deno.readTextFile('./input.txt');

// mapping
const opponent = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
};
const scoreMap = {
  X: 0, // lose
  Y: 3, // draw
  Z: 6, // win
};

// split input into lines
const lines = input.split(/\r?\n/);

// map array to score for each round
const scores = lines.map((line) => {
  const [opponentMove, win] = line.split(' ') as [
    'A' | 'B' | 'C',
    'X' | 'Y' | 'Z'
  ];
  let score = 0;
  // add score
  score += scoreMap[win];
  if (win === 'Y') {
    // if draw add score for selected move
    score += opponent[opponentMove];
  } else if (win === 'Z') {
    // if win add score for selected move
    let tmpScore = opponent[opponentMove] + 1;
    if (tmpScore > 3) {
      tmpScore = 1;
    }
    score += tmpScore;
  } else {
    // if lose add score for selected move
    let tmpScore = opponent[opponentMove] - 1;
    if (tmpScore < 1) {
      tmpScore = 3;
    }
    score += tmpScore;
  }
  return score;
});

// sum scores
const totalScore = scores.reduce((a, b) => a + b, 0);

// output
console.log(totalScore);
