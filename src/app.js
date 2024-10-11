import readline from "readline/promises";
import userName, { greetUser } from "./greeting/greet.js";
import {
  showCurDir,
  navigateUp,
  changeDirectory,
} from "./navigation/directory.js";

greetUser();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const lineArr = line.trim().split(" ");
  switch (lineArr[0]) {
    case ".exit":
      rl.close();
      break;
    case "cd":
      changeDirectory(lineArr[1]);
      break;
    case "up":
      navigateUp();
      showCurDir();
      break;
    default:
      console.error(`Invalid input`);
      showCurDir();
  }
});
rl.on("close", () => {
  if (userName) {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  } else {
    console.log(`Thank you for using File Manager, Username, goodbye!`);
  }
  process.exit(0);
});
