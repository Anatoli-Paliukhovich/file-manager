import fsPromises from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import fs from "fs";

//create empty file
export const create = async (file) => {
  const content = "";
  const filePath = path.resolve(process.cwd(), file);
  try {
    await fsPromises.writeFile(filePath, content, {
      flag: "wx",
    });
    console.log("File has been successfully created");
  } catch (error) {
    if (!file) {
      console.error(`Invalid input`);
    }
    if (error.code === "EEXIST" && file) {
      console.error(`File has already been created`);
    }
  }
};

//read file
export const read = async (file) => {
  const filePath = path.resolve(process.cwd(), file);
  const stream = fs.createReadStream(filePath, { encoding: "utf-8" });
  try {
    if (!file) {
      console.error(`Invalid input: file has not been provided!`);
      return;
    }
    await pipeline(stream, process.stdout);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("Invalid input: there is no such a file!");
    }
  }
};

//remove file
export const remove = async (file) => {
  const filePath = path.resolve(process.cwd(), file);
  try {
    if (!file) {
      console.error(`Invalid input: file has not been provided!`);
      return;
    }
    await fsPromises.rm(filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Invalid input: there is no such a file!");
    }
  }
};

//copy
export const copy = async (sourceDir, destDir) => {
  const sourceDirPath = path.resolve(process.cwd(), sourceDir);
  const destDirPath = path.resolve(process.cwd(), destDir);
  try {
    if (!sourceDir || !destDir) {
      console.error(`Invalid input: filePath has not been provided!`);
      return;
    }
    await fsPromises.cp(sourceDirPath, destDirPath, {
      recursive: true,
      errorOnExist: true,
      force: false,
    });
    console.log("File has been successfully copied");
  } catch (error) {
    if (error.code === "ERR_FS_CP_EEXIST") {
      console.error("The file has already been copied!");
    }
    if (error.code === "ENOENT") {
      console.error("Invalid input!");
    }
  }
};

//rename
export const rename = async (sourceDir, destDir) => {
  const sourceDirPath = path.resolve(process.cwd(), sourceDir);
  const destDirPath = path.resolve(process.cwd(), destDir);
  try {
    await fsPromises.rename(sourceDirPath, destDirPath);
    console.log("File has been successfully renamed");
  } catch (error) {
    if (error.code === "ERR_FS_CP_EEXIST") {
      console.error("The file has already been renamed!");
    }
    if (error.code === "ENOENT") {
      console.error("Invalid input: There is no such a file!");
    }
  }
};

//move
