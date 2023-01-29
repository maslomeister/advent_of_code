import fs from "fs";
import path from "path";
import readline from "readline";

const p1 = async () => {
  const fileStream = fs.createReadStream(path.join(__dirname, "input.txt"));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let positions = new Array<number[]>(10).fill([0, 0]).map(() => [0, 0]);

  const head = positions[0];

  const visited = new Set(["00"]);

  const possibleTailMoves = new Map([
    ["21", [1, 1]],
    ["12", [1, 1]],
    ["20", [1, 0]],
    ["2-1", [1, -1]],
    ["1-2", [1, -1]],
    ["0-2", [0, -1]],
    ["-1-2", [-1, -1]],
    ["-2-1", [-1, -1]],
    ["-20", [-1, 0]],
    ["-21", [-1, 1]],
    ["-12", [-1, 1]],
    ["02", [0, 1]],
    ["22", [1, 1]],
    ["-2-2", [-1, -1]],
    ["-22", [-1, 1]],
    ["2-2", [1, -1]],
  ]);

  const getHeadTailDifference = (head: number[], tail: number[]) => {
    return `${head[0] - tail[0]}${head[1] - tail[1]}`;
  };

  const move = (direction: string, amount: number) => {
    for (let i = 0; i < amount; i++) {
      switch (direction) {
        case "R":
          head[0] += 1;
          break;
        case "L":
          head[0] -= 1;
          break;
        case "U":
          head[1] += 1;
          break;
        case "D":
          head[1] -= 1;
      }

      for (let j = 1; j < positions.length; j++) {
        const tailMove = possibleTailMoves.get(getHeadTailDifference(positions[j - 1], positions[j])) ?? [0, 0];

        positions[j][0] += tailMove[0];
        positions[j][1] += tailMove[1];
      }

      visited.add(`${positions[9][0]}${positions[9][1]}`);
    }
  };

  for await (const line of rl) {
    const [direction, amount] = line.split(" ");
    move(direction, Number(amount));
  }

  return visited.size;
};

export default p1;
