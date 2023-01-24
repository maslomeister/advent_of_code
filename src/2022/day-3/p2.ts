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

  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let sum = 0;
  let firstBatch = [];
  let secondBatch = [];

  for await (const line of rl) {
    let arr = new Uint8Array(alphabet.length);

    for (let i = 0; i <= line.length; i++) {
      arr[alphabet.indexOf(line[i])] = 1;
    }

    if (firstBatch.length < 3) {
      firstBatch.push(arr);
    } else {
      secondBatch.push(arr);
    }

    if (firstBatch.length === 3 && secondBatch.length === 3) {
      let res = [0, 0];
      for (let i = 0; i <= alphabet.length; i++) {
        if ((firstBatch[0][i] & firstBatch[1][i] & firstBatch[2][i]) === 1) res[0] = i + 1;

        if ((secondBatch[0][i] & secondBatch[1][i] & secondBatch[2][i]) === 1) res[1] = i + 1;

        if (res[0] > 0 && res[1] > 0) {
          break;
        }
      }

      sum += res.reduce((prev, curr) => prev + curr, 0);
      firstBatch = [];
      secondBatch = [];
    }
  }
  return sum;
};

export default p1;
