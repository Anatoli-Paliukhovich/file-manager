import readline from "readline/promises";
import userName, { greetUser } from "./greeting/greet.js";
import {
  showCurDir,
  navigateUp,
  changeDirectory,
} from "./navigation/directory.js";
import {
  showEOL,
  showUserName,
  showHomeDir,
  showArch,
  showCpusInfo,
} from "./os/osOperations.js";
import {
  create,
  read,
  remove,
  copy,
  rename,
  move,
} from "./fs/basicFsOperations.js";
import { listFilesAsync } from "./list/listFiles.js";

import { calculate } from "./hash/calculateHash.js";
import { compress } from "./zip/compress.js";
import { decompress } from "./zip/decompress.js";

greetUser();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const pathToDir = line.slice(3).trim();
  const lineArr = line.trim().split(" ");
  switch (lineArr[0]) {
    case "cd":
      changeDirectory(pathToDir);
      break;
    case "up":
      lineArr.length === 1 ? navigateUp() : console.error(`Invalid input`);
      break;
    case "ls":
      lineArr.length === 1 ? listFilesAsync() : console.error(`Invalid input`);
      break;
    case "cat":
      lineArr.length === 2
        ? read(lineArr[1])
        : console.error(`Operation failed: provide the name of the file!`);
      break;
    case "add":
      create(pathToDir);
      break;
    case "rm":
      remove(pathToDir);
      break;
    case "cp":
      lineArr[1] && lineArr[2]
        ? copy(lineArr[1], lineArr[2])
        : console.error(
            `Operation failed: The correct filePath has not been provided!`
          );
      break;
    case "mv":
      lineArr[1] && lineArr[2]
        ? move(lineArr[1], lineArr[2])
        : console.error(
            `Operation failed: The correct filePath has not been provided!`
          );
      showCurDir();
      break;
    case "rn":
      lineArr[1] && lineArr[2]
        ? rename(lineArr[1], lineArr[2])
        : console.error(
            `Operation failed: The correct filePath has not been provided!`
          );
      break;
    case "os":
      lineArr[1] === "--EOL"
        ? showEOL()
        : lineArr[1] === "--cpus"
        ? showCpusInfo()
        : lineArr[1] === "--homedir"
        ? showHomeDir()
        : lineArr[1] === "--username"
        ? showUserName()
        : lineArr[1] === "--architecture"
        ? showArch()
        : console.error("Invalid input");
      showCurDir();
      break;
    case "hash":
      calculate(lineArr[1]);
      break;
    case "compress":
      lineArr[1] && lineArr[2]
        ? compress(lineArr[1], lineArr[2])
        : console.error(
            `Operation failed: The correct filePath has not been provided!`
          );
      break;
    case "decompress":
      lineArr[1] && lineArr[2]
        ? decompress(lineArr[1], lineArr[2])
        : console.error(
            `Operation failed: The correct filePath has not been provided!`
          );
      break;
    case ".exit":
      rl.close();
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
