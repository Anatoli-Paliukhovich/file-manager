import fsPromises from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import fs from "fs";
import { showCurDir } from "../navigation/directory.js";

//read file
export const read = async (file) => {
  const filePath = path.resolve(process.cwd(), file);
  try {
    if (!file) {
      console.error();
      return;
    }
    const stream = fs.createReadStream(filePath, { encoding: "utf-8" });
    stream.on("data", (result) => {
      console.log(result);
    });
    stream.on("end", () => {
      showCurDir();
    });
    stream.on("error", (err) => {
      if (err.code === "ENOENT") {
        console.error("Operation failed: there is no such a file!");
        showCurDir();
      }
    });
  } catch (error) {
    console.error("Operation failed: there is no such file!");
    showCurDir();
  }
};

//create empty file
export const create = async (file) => {
  const content = "";
  const filePath = path.resolve(process.cwd(), file);
  try {
    await fsPromises.writeFile(filePath, content, {
      flag: "wx",
    });
    console.log("File has been successfully created!");
    showCurDir();
  } catch (error) {
    if (!file) {
      console.error(`Operation failed: file has not been provided!`);
      showCurDir();
    }
    if (error.code === "EEXIST" && file) {
      console.error(`Operation failed: File has already been created!`);
      showCurDir();
    }
  }
};

//remove file
export const remove = async (file) => {
  const filePath = path.resolve(process.cwd(), file);
  try {
    if (!file) {
      console.error(`Operation failed: file has not been provided!`);
      showCurDir();
      return;
    }
    await fsPromises.rm(filePath);
    showCurDir();
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Operation failed: there is no such a file!");
      showCurDir();
    }
  }
};

//copy
export const copy = async (sourceDir, destDir) => {
  const sourceDirPath = path.resolve(process.cwd(), sourceDir);
  const destDirPath = path.resolve(process.cwd(), destDir);
  try {
    await fsPromises.cp(sourceDirPath, destDirPath, {
      recursive: true,
      errorOnExist: true,
      force: false,
    });
    console.log("File has been successfully copied");
    showCurDir();
  } catch (error) {
    if (error.code === "ERR_FS_CP_EEXIST") {
      console.error("The file has already been copied!");
      showCurDir();
    }
    if (error.code === "ENOENT") {
      console.error(
        "Operation failed: The correct filePath has not been provided!"
      );
      showCurDir();
    }
  }
};

//move
export const move = async (sourceDir, destDir) => {
  const sourceDirPath = path.resolve(process.cwd(), sourceDir);
  const destDirPath = path.resolve(process.cwd(), destDir);
  try {
    const readStream = fs.createReadStream(sourceDirPath);
    const writeStream = fs.createWriteStream(destDirPath);
    await pipeline(readStream, writeStream);
    await fsPromises.rm(sourceDirPath);
  } catch (error) {
    console.error(
      `Operation failed: The correct filePath has not been provided!`
    );
    showCurDir();
  }
};

//rename
export const rename = async (sourceDir, destDir) => {
  const sourceDirPath = path.resolve(process.cwd(), sourceDir);
  const destDirPath = path.resolve(process.cwd(), destDir);
  try {
    await fsPromises.rename(sourceDirPath, destDirPath);
    console.log("File has been successfully renamed");
    showCurDir();
  } catch (error) {
    if (error.code === "ERR_FS_CP_EEXIST") {
      console.error("Operation failed: The file has already been renamed!");
      showCurDir();
    }
    if (error.code === "ENOENT") {
      console.error("Operation failed: There is no such a file!");
      showCurDir();
    }
  }
};
