import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LotteryPoolModule = buildModule("LotteryPoolModule", (m) => {
  const lottery = m.contract("LotteryPool");
  return { lottery };
});

export default LotteryPoolModule;
