import { showCurDir } from "../navigation/directory.js";
const userName = process.env.npm_config_username;

export const greetUser = () => {
  if (userName) {
    console.log(`Welcome to the File Manager, ${userName}\n`);
  } else {
    console.log(`The name has not been provided!\n`);
  }
  showCurDir();
};

export default userName;
