import fs from "fs";
import path from "path";
import readline from "readline";

const playerMoves = new Map([
  ["X", 0], // lose
  ["Y", 3], // draw
  ["Z", 6], // win
]);
//a rock - 1 b paper - 2 c scissors -3

const possibleOutcomes = new Map([
  ["AX", 3],
  ["AY", 1],
  ["AZ", 2],
  ["BX", 1],
  ["BY", 2],
  ["BZ", 3],
  ["CX", 2],
  ["CY", 3],
  ["CZ", 1],
]);

const p1 = async () => {
  const fileStream = fs.createReadStream(path.join(__dirname, "input.txt"));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let totalScore = 0;
  for await (const line of rl) {
    const moves = line.split(" ");

    totalScore += playerMoves.get(moves[1])! + possibleOutcomes.get(moves[0] + moves[1])!;
  }

  return totalScore;
};

export default p1;
