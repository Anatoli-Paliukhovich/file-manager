import fs from "fs/promises";
import path from "path";
import { showCurDir } from "../navigation/directory.js";
export const listFilesAsync = async () => {
  try {
    const currentDir = process.cwd();
    const files = await fs.readdir(currentDir);
    const filesArr = [];
    for (let item of files) {
      const absolutePath = path.resolve(currentDir, item);
      const stat = await fs.stat(absolutePath);
      filesArr.push({
        Name: item,
        Type: stat.isDirectory() ? "directory" : "file",
      });
    }
    filesArr.sort((a, b) => {
      if (a.Type === b.Type) {
        return a.Name.localeCompare(b.Name);
      }
      return a.Type === "directory" ? -1 : 1;
    });
    console.table(filesArr);
    showCurDir();
  } catch (error) {
    console.error(
      "Operation failed: There is an error in listing files and folders!"
    );
  }
};
