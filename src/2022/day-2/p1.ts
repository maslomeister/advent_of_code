import fs from "fs";
import path from "path";
import readline from "readline";

const playerMoves = new Map([
  ["X", 1], // rock
  ["Y", 2], // paper
  ["Z", 3], // scissors
]);
//a rock b paper c scissors

const possibleOutcomes = new Map([
  ["AX", 3],
  ["AY", 6],
  ["AZ", 0],
  ["BX", 0],
  ["BY", 3],
  ["BZ", 6],
  ["CX", 6],
  ["CY", 0],
  ["CZ", 3],
]);

const p1 = async () => {
  const fileStream = fs.createReadStream(path.join(__dirname, "input.txt"));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let totalScore = 0;
  for await (const line of rl) {
    const moves = line.split(" ");

    totalScore += playerMoves.get(moves[1])! + possibleOutcomes.get(moves[0] + moves[1])!;
  }

  return totalScore;
};

export default p1;
