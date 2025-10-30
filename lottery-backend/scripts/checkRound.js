import { ethers } from "ethers";
import fs from "fs";

// 本地 Hardhat 网络
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// 读取 ABI
const abiFile = JSON.parse(fs.readFileSync("./artifacts/contracts/lotteryPool.sol/LotteryPool.json", "utf8"));
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f641830aa";
const pool = new ethers.Contract(contractAddress, abiFile.abi, provider);

const main = async () => {
  console.log("BetCount:", (await pool.getBetCount(1)).toString());
  console.log(await pool.getRoundInfo(1));
};

main();
