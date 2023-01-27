import fs from "fs";
import path from "path";
import readline from "readline";

interface IQueue<T> {
  enqueue(item: T): void;
  push(item: T): void;
  dequeue(): T | undefined;
  pop(): T | undefined;
  size(): number;
}

class Queue<T> implements IQueue<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) {}

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  push(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }
    this.storage.unshift(item);
  }

  dequeue(): T | undefined {
    return this.storage.shift();
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  size(): number {
    return this.storage.length;
  }
}

const getBoxes = (line: string) => {
  let output = [];
  let counter = 0;
  for (let i = 0; i <= line.length; i++) {
    if (line[i] === " ") {
      if (counter < 3) {
        counter++;
      } else {
        counter = 0;
        output.push(line[i]);
      }
    } else {
      if (line[i] === "[" && line[i + 2] === "]") {
        output.push(line[i + 1]);
        counter = 0;
        i += 2;
      }
    }
  }

  return output;
};

const p1 = async () => {
  const fileStream = fs.createReadStream(path.join(__dirname, "input.txt"));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  type TQueue<T> = IQueue<T>[];

  const queues: TQueue<string> = [];
  let collectBoxes = true;
  for await (const line of rl) {
    if (line.match(/\d\s*\d\s*\d\s*/)) {
      collectBoxes = false;
    }

    if (collectBoxes) {
      const boxes = getBoxes(line);

      for (let i = 0; i <= boxes.length; i++) {
        if (boxes[i] && boxes[i] !== " ") {
          if (queues[i]) {
            queues[i].enqueue(boxes[i]);
          } else {
            queues[i] = new Queue<string>();
            queues[i].enqueue(boxes[i]);
          }
        }
      }
    } else {
      if (line.match(/\d\s*\d\s*\d\s*/)) {
        continue;
      }

      const move = line.match(/\d+/g)?.map((str) => Number(str));

      if (move) {
        if (move[0] === 1) {
          const removed = queues[move[1] - 1].dequeue();
          if (removed) {
            queues[move[2] - 1].push(removed);
          }
        } else {
          const toBeMoved = new Queue<string>();
          for (let i = 0; i < move[0]; i++) {
            const removed = queues[move[1] - 1].dequeue();
            if (removed) {
              toBeMoved.enqueue(removed);
            }
          }

          const size = toBeMoved.size();

          for (let i = 0; i < size; i++) {
            const removed = toBeMoved.pop();
            if (removed) {
              queues[move[2] - 1].push(removed);
            }
          }
        }
      }
    }
  }

  let result = "";
  for (const queue of queues) {
    result += queue.dequeue();
  }

  return result;
};

export default p1;
