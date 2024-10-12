import readline from "readline/promises";
import userName, { greetUser } from "./greeting/greet.js";
import {
  showCurDir,
  navigateUp,
  changeDirectory,
} from "./navigation/directory.js";
import { listFilesAsync } from "./list/listFiles.js";
import { create, read, remove, copy, rename } from "./fs/basicFsOperations.js";
import { calculate } from "./hash/calculateHash.js";

greetUser();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const pathToDir = line.slice(3).trim();
  const lineArr = line.trim().split(" ");
  switch (lineArr[0]) {
    case ".exit":
      rl.close();
      break;
    case "cd":
      changeDirectory(pathToDir);
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
      } else {
        console.error(`Invalid input`);
      }
      showCurDir();
      break;
    case "add":
      create(pathToDir);
      showCurDir();
      break;
    case "cat":
      read(pathToDir);
      showCurDir();
      break;
    case "rm":
      remove(pathToDir);
      showCurDir();
      break;
    case "cp":
      if (lineArr[1] && lineArr[2]) {
        copy(lineArr[1], lineArr[2]);
      } else {
        console.error(`Invalid input`);
      }
      showCurDir();
      break;
    case "rn":
      if (lineArr[1] && lineArr[2]) {
        rename(lineArr[1], lineArr[2]);
      } else {
        console.error(`Invalid input`);
      }
      showCurDir();
      break;
    case "hash":
      calculate(lineArr[1]);
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
