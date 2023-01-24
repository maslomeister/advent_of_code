import fs from "fs";
import path from "path";
import readline from "readline";

const generateAlphabet = (capital = false) => {
  return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));
};

const p1 = async () => {
  const fileStream = fs.createReadStream(path.join(__dirname, "input.txt"));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const alphabet = generateAlphabet().concat(generateAlphabet(true));

  let sum = 0;
  for await (const line of rl) {
    const left = line.slice(0, line.length / 2);
    const right = line.slice(line.length / 2, line.length);
    if (left.length === right.length) {
      let leftArr = new Uint8Array(57);
      let rightArr = new Uint8Array(57);

      for (let i = 0; i <= left.length; i++) {
        leftArr[alphabet.indexOf(left[i])] = 1;
        rightArr[alphabet.indexOf(right[i])] = 1;
      }

      for (let i = 0; i <= leftArr.length; i++) {
        if ((leftArr[i] & rightArr[i]) === 1) {
          sum += i + 1;
          break;
        }
      }
    }
  }
  return sum;
};

export default p1;
