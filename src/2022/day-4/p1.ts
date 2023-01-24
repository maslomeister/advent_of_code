import fs from "fs";
import path from "path";
import readline from "readline";

const isOverlaps = (firstRange: number[], secondRange: number[]) => {
  return firstRange[0] <= secondRange[0] && secondRange[1] <= firstRange[1];
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

    if (isOverlaps(leftElf, rightElf) || isOverlaps(rightElf, leftElf)) overlapCount++;
  }
  return overlapCount;
};

export default p1;
