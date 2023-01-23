import fs from "fs";
import path from "path";
import readline from "readline";

const p2 = async () => {
  const fileStream = fs.createReadStream(path.join(__dirname, "input.txt"));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let total = [];
  let temp = [];
  for await (const line of rl) {
    if (Number(line)) {
      temp.push(Number(line));
    } else {
      total.push(temp.length > 1 ? temp.reduce((total, current) => current + total, 0) : temp[0]);
      temp = [];
    }
  }

  return total
    .sort((a, b) => a - b)
    .reverse()
    .splice(0, 3)
    .reduce((total, curr) => total + curr, 0);
};

export default p2;
