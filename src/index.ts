import fs from "fs";
import { parseHrtimeToMS, getParamValue } from "./utils";
const params = process.argv.slice(2);
// console.log(params);

(async function main() {
  const targetYear = getParamValue(params, "year");
  const targetDay = getParamValue(params, "day");

  console.log("Advent of Code stats:\n");
  const years = (await fs.promises.readdir("./src", { withFileTypes: true }))
    .filter((item) => item.isDirectory())
    .map((dir) => parseInt(dir.name));

  for (const year of years) {
    if (targetYear && targetYear !== year) {
      continue;
    }

    console.log(`	Year: ${year}`);

    const days = (await fs.promises.readdir(`./src/${year}`)).map((val) => parseInt(val.split("-")[1]));

    for (const day of days) {
      if (targetDay && targetDay !== day) {
        continue;
      }

      console.log(`		Day ${day}:`);

      const solutions = (await fs.promises.readdir(`./src/${year}/day-${day}`)).filter((fileName) => fileName.match(/.ts/));

      for (const solution of solutions) {
        const startTime = process.hrtime();

        const result = await import(`./${year}/day-${day}/${solution}`).then((mod) => mod.default());

        const elapsedSeconds = parseHrtimeToMS(process.hrtime(startTime));

        console.log(`			Part ${solution.match(/\d+/)?.[0]}: \n				Result: ${result} \n				Time: ${elapsedSeconds}ms`);
      }
    }
  }
})();
