import { ethers, run, network } from "hardhat"
import fs from "fs"
import * as dotenv from "dotenv"
dotenv.config()

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract ... 🚀")

  const simpleStorage = await SimpleStorageFactory.deploy()

  await simpleStorage.waitForDeployment()
  const address = await simpleStorage.getAddress()

  console.log(`Deployed contract to: ${address}`)

  const etherscan_api_key = process.env.ETHERSCAN_API_KEY!

  if (network.config.chainId === 11155111 && etherscan_api_key) {
    console.log(`Waiting 1 minute for Etherscan to see contract transaction.`)
    await sleep(60000)
    await verify(address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value: ${currentValue}`)
  const transactionResponse = await simpleStorage.store(
    "1000000000000000000000"
  )
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value: ${updatedValue}`)
}

async function verify(contractAddress: string, args: any[]) {
  console.log(`Verifying contract ${contractAddress} ...`)
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (err: any) {
    console.log(err)
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
