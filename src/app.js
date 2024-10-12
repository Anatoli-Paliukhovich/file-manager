import readline from "readline/promises";
import userName, { greetUser } from "./greeting/greet.js";
import {
  showCurDir,
  navigateUp,
  changeDirectory,
} from "./navigation/directory.js";
import { listFilesAsync } from "./list/listFiles.js";

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
      if (lineArr.length === 2) {
        changeDirectory(lineArr[1]);
      } else {
        console.error(`Invalid input`);
      }
      break;
    case "up":
      if (lineArr.length === 1) {
        navigateUp();
        showCurDir();
      } else {
        console.error(`Invalid input`);
      }
      break;
    case "ls":
      if (lineArr.length === 1) {
        listFilesAsync();
        showCurDir();
      } else {
        console.error(`Invalid input`);
      }
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
