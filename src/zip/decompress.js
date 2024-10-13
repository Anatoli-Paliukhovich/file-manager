import { promisify } from "util";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream";
import { resolve } from "path";

const pipe = promisify(pipeline);

export const decompress = async (sourceDir, destDir) => {
  const sourceDirPath = resolve(process.cwd(), sourceDir);
  const destDirPath = resolve(process.cwd(), destDir);
  try {
    const unzip = createBrotliDecompress();
    const source = createReadStream(sourceDirPath);
    const destination = createWriteStream(destDirPath);
    await pipe(source, unzip, destination);
	 console.log('The file has been successfully decompressed!')
  } catch (error) {
    console.error("Invalid input!");
  }
};

