import readline from "readline/promises";
import userName, { greetUser } from "./greeting/greet.js";

greetUser();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  switch (line.trim()) {
    case ".exit":
      rl.close();
      break;
  }
});
rl.on("close", () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});
