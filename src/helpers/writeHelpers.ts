import { formatEther, parseEther } from "ethers/lib/utils"
import { Alchemy, Network } from "alchemy-sdk"

const ALECHEMY_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY
const settings = {
  apiKey: ALECHEMY_API_KEY,
  network: Network.ETH_GOERLI,
}
