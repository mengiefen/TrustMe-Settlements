import { formatEther, parseEther } from "ethers/lib/utils"
import { Alchemy, Network } from "alchemy-sdk"
import { ethers } from "ethers"
import { CONTRACT_ABI } from "./../constants/interact"

const ALCHEMY_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY || ""
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY_ONE || ""

const settings = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
}

const alchemy = new Alchemy(settings)

// Provider
const provider = new ethers.providers.AlchemyProvider("goerli", ALCHEMY_API_KEY)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider)

// Contract
const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.stringify(CONTRACT_ABI), signer)

export const addTrade = async (
  buyerAddress: string,
  tokenToSell: string,
  tokenToBuy: number,
  amountOfTokenToSell: number,
  amountOfTokenToBuy: number,
  deadline: number
) => {
  const tx = await contract.addTrade(
    buyerAddress,
    tokenToSell,
    tokenToBuy,
    amountOfTokenToSell,
    amountOfTokenToBuy,
    deadline
  )

  tx.wait()

  return tx
}

export const cancelTrade = async (tradeID: number) => {
  const tx = await contract.cancelTrade(tradeID)
  tx.wait()
  return tx
}
