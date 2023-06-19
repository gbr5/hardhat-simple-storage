import { ethers } from "ethers"
import fs from "fs"
import * as dotenv from "dotenv"
dotenv.config()

async function main() {
  const private_key = process.env.PRIVATE_KEY!
  const private_key_password = process.env.PRIVATE_KEY_PASSWORD!
  const wallet = new ethers.Wallet(private_key)
  const encryptedJsonKey = await wallet.encrypt(private_key_password)
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey)
  console.log(`Private key encrypted for the wallet ${wallet.address} 🚀`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
