import fs from "fs";
import path from "path";
import readline from "readline";

const p1 = async () => {
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
      total.push(temp.reduce((total, current) => current + total, 0));
      temp = [];
    }
  }

  return Math.max(...total);
};

export default p1;
