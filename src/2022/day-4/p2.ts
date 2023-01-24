import fs from "fs";
import path from "path";
import readline from "readline";

const inRange = (x: number, minmax: number[]) => {
  return (x - minmax[0]) * (x - minmax[1]) <= 0;
};

const p1 = async () => {
  const fileStream = fs.createReadStream(path.join(__dirname, "input.txt"));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let overlapCount = 0;

  for await (const line of rl) {
    const pairs = line.split(",");
    const leftElf = pairs[0].split("-").map((item) => Number(item));
    const rightElf = pairs[1].split("-").map((item) => Number(item));

    if (
      inRange(leftElf[0], rightElf) ||
      inRange(leftElf[1], rightElf) ||
      inRange(rightElf[0], leftElf) ||
      inRange(rightElf[1], leftElf)
    )
      overlapCount++;
  }
  return overlapCount;
};

export default p1;
