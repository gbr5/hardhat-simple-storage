import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-verify"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@typechain/hardhat"
import * as dotenv from "dotenv"

import "./tasks/block-number"

dotenv.config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL! || "https://eth-sepolia"
const PRIVATE_KEY = process.env.PRIVATE_KEY! || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY! || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY! || "key"

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  },
}

export default config
