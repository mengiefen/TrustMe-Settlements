import { CONTRACT_ADDRESS } from "./../constants/interact"
import { formatEther, parseEther } from "ethers/lib/utils"
import { Alchemy, Network } from "alchemy-sdk"

const ALECHEMY_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY
const settings = {
  apiKey: ALECHEMY_API_KEY,
  network: Network.ETH_GOERLI,
}

const alchemy = new Alchemy(settings)

alchemy.core.getBlockNumber().then((blockNumber) => {
  console.log("Current block number:", blockNumber)
})

alchemy.core.getTokenBalances(CONTRACT_ADDRESS).then((balances) => {
  console.log("Balances:", balances)
})
