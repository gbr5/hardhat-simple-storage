import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment } from "hardhat/types"
// require("@nomicfoundation/hardhat-toolbox")

export default task(
  "block-number",
  "Prints the current block number"
).setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
  const blockNumber = await hre.ethers.provider.getBlockNumber()
  console.log(`Current block number is: ${blockNumber}`)
  return blockNumber
})
