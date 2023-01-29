import fs from "fs";
import path from "path";
import readline from "readline";

const p1 = async () => {
  const fileStream = fs.createReadStream(path.join(__dirname, "input.txt"));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let positions = {
    head: {
      x: 0,
      y: 0,
    },
    tail: {
      x: 0,
      y: 0,
    },
  };

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
  ]);

  const getHeadTailDifference = () => {
    return `${positions.head.x - positions.tail.x}${positions.head.y - positions.tail.y}`;
  };

  const move = (direction: string, amount: number) => {
    for (let i = 0; i < amount; i++) {
      switch (direction) {
        case "R":
          positions.head.x += 1;
          break;
        case "L":
          positions.head.x -= 1;
          break;
        case "U":
          positions.head.y += 1;
          break;
        case "D":
          positions.head.y -= 1;
      }

      const tailMove = possibleTailMoves.get(getHeadTailDifference()) ?? [0, 0];

      positions.tail.x += tailMove[0];
      positions.tail.y += tailMove[1];
      visited.add(`${positions.tail.x}${positions.tail.y}`);
    }
  };

  for await (const line of rl) {
    const [direction, amount] = line.split(" ");
    move(direction, Number(amount));
  }

  return visited.size;
};

export default p1;
