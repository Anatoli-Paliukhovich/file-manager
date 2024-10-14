import { createHmac } from "crypto";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { showCurDir } from "../navigation/directory.js";
export const calculate = async (source) => {
  try {
    if (!source) {
      console.error(`Operation failed: file has not been provided!`);
      return;
    }
    const sourcePath = resolve(process.cwd(), source);
    const content = await readFile(sourcePath);
    const hash = createHmac("sha256", "abcdefg").update(content).digest("hex");
    console.log(hash);
    showCurDir();
  } catch (error) {
    console.error("Operation failed: there is no such a file!");
  }
};
