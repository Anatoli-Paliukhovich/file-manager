import { createHmac } from "crypto";
import { readFile } from "fs/promises";
import { resolve } from "path";

export const calculate = async (source) => {
  try {
    if (!source) {
      console.error(`Invalid input: file has not been provided!`);
      return;
    }
    const sourcePath = resolve(process.cwd(), source);
    const content = await readFile(sourcePath);
    const hash = createHmac("sha256", "abcdefg").update(content).digest("hex");
    console.log(hash);
  } catch (error) {
    console.error("Invalid input: there is no such a file!");
  }
};
