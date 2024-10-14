import os from "os";

const showEOL = () => {
  console.log(JSON.stringify(os.EOL));
};

const showHomeDir = () => {
  console.log(os.homedir());
};

const showUserName = () => {
  console.log(os.userInfo().username);
};

const showArch = () => {
  console.log(os.arch());
};

const showCpusInfo = () => {
  const cpusLength = os.cpus().length;
  const cpuInfo = os.cpus().map((cpu) => {
    return {
      model: cpu.model,
      speed: Math.round(cpu.speed / 1000),
    };
  });
  console.log(`Overall amount of CPUS: ${cpusLength}\n`, cpuInfo);
};


export { showEOL, showHomeDir, showUserName, showArch, showCpusInfo };
