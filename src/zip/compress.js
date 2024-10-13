import { promisify } from "util";
import { createReadStream, createWriteStream, readdir } from "fs";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream";
import { resolve } from "path";

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
  } catch (error) {
    console.error("Invalid input!");
  }
};
