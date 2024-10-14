import { promisify } from "util";
import { createReadStream, createWriteStream, readdir } from "fs";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream";
import { resolve } from "path";
import { showCurDir } from "../navigation/directory.js";
const pipe = promisify(pipeline);

export const compress = async (sourceDir, destDir) => {
  const sourceDirPath = resolve(process.cwd(), sourceDir);
  const destDirPath = resolve(process.cwd(), destDir);
  try {
    const gzip = createBrotliCompress();
    const source = createReadStream(sourceDirPath);
    const destination = createWriteStream(destDirPath);
    await pipe(source, gzip, destination);
    console.log("The file has been successfully compressed!");
    showCurDir();
  } catch (error) {
    console.error(`Operation failed: The correct filePath has not been provided!`);
    showCurDir();
  }
};
