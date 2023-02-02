import { ethers, Signer } from "ethers"
import { alchemy } from "@/connector/connect"
import TrustMeAbi from "../../abi.json"
import Erc20Abi from "../../erc20Abi.json"
import { fetchSigner } from "@wagmi/core"
import { ERC20, TrustMe } from "typechain"
import { formatEther } from "ethers/lib/utils.js"

export const getSigner = async () => {
  const signer = await fetchSigner()
  return signer
}
export const TRUST_ME_CONTRACT_ADDRESS = "0xF112F9D64Db9BE8F33Ee2e49c625EB564e58a25E"

export const trustMeContract = async () => {
  const trustMeInstance: TrustMe = new ethers.Contract(
    TRUST_ME_CONTRACT_ADDRESS,
    TrustMeAbi,
    (await getSigner()) as Signer
  ) as TrustMe
  return trustMeInstance
}

export const erc20Contract = async (address: string) => {
  const erc20Instance = new ethers.Contract(
    address,
    Erc20Abi,
    (await getSigner()) as Signer
  ) as ERC20
  return erc20Instance
}
export async function getPendingTrades() {
  const trustMe = await trustMeContract()
  const pendingTradesIDs = await trustMe.getPendingTradesIDs()
  return pendingTradesIDs
}

export async function getTrade(tradeId: number) {
  const trustMe = await trustMeContract()
  const trade = await trustMe.getTrade(tradeId)
  return trade
}

export const getTradeStatus = async (tradeID: number) => {
  const trustMe = await trustMeContract()
  const tradeStatus = await trustMe.getTradeStatus(tradeID)
  return tradeStatus
}
export const getTradesIDsByUser = async (address: string) => {
  const trustMe = await trustMeContract()
  const tradeIds = await trustMe.getTradesIDsByUser(address)

  return tradeIds
}

export const getUserToTradesIDs = async (userAddress: string, id: number) => {
  const trustMe = await trustMeContract()
  const tradeStatus = await trustMe.userToTradesIDs(userAddress, id)
  return tradeStatus
}

export const getConnectedUserTokens = async (address: string) => {
  const tokenMetadata: any = []
  const balances = await alchemy.core.getTokenBalances(address)

  // Remove tokens with zero balance
  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0"
  })
  for (let token of nonZeroBalances) {
    // Get balance of token
    let balance: number = token.tokenBalance as unknown as number

    // Get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress)

    // Compute token balance in human-readable format
    balance = balance / Math.pow(10, metadata.decimals as number)
    balance = balance.toFixed(2) as unknown as number
    tokenMetadata.push({
      name: metadata.name,
      symbol: metadata.symbol,
      balance: balance,
      decimals: metadata.decimals,
      logo: metadata.logo,
      address: token.contractAddress,
    })
  }
  return tokenMetadata
}

// return balance in ether format
const getSignerBalance = async (address: string) => {
  const signer = await getSigner()
  const balance = await signer?.getBalance()
  return formatEther(balance as any)
}
