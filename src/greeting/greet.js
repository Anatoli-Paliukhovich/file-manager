const userName = process.env.npm_config_username;

export const greetUser = () => {
  if (userName) {
    console.log(`Welcome to the File Manager, ${userName}`);
  } else {
    console.log(`The name is not provided!`);
  }
};

export default userName;
