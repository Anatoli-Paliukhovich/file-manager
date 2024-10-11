import os from "os";
import path from "path";
import fs from "fs/promises";

const homeDirectory = os.homedir();
process.chdir(homeDirectory);

export const showCurDir = () => {
  const currentDirectory = process.cwd();
  console.log(`You are currently in ${currentDirectory}`);
};

export const navigateUp = () => {
  const currentDirectory = process.cwd();
  const rootDirectory = path.dirname(currentDirectory);
  if (currentDirectory === rootDirectory) {
    console.error(`You've already navigated to the root directory!`);
  } else {
    process.chdir(rootDirectory);
  }
};

export const changeDirectory = async (directory) => {
	try {
	  if (directory) {
		 const newDisk = directory.toUpperCase() + `\\`;
		 await fs.access(newDisk);
		 process.chdir(newDisk);
		 showCurDir();
		 return;
	  }
	  const absolutePath = path.resolve(process.cwd(), directory);
	  await fs.access(absolutePath);
	  process.chdir(absolutePath);
	} catch (error) {
	  console.error("There is no such directory!Operation failed!");
	}
 };
