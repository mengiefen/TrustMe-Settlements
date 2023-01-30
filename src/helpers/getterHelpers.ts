import { getStatus } from "@/utils"
import { formatEther } from "ethers/lib/utils.js"
import { getSymbol } from "@/utils"
import { Trade } from "./../components/TransactionList/type"
import { BigNumber } from "ethers"
import { trustMeContract } from "../constants/interact"
// import { Alchemy, Network } from "alchemy-sdk"

// const ALCHEMY_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || ""

// const settings = {
//   apiKey: ALCHEMY_API_KEY,
//   network: Network.ETH_GOERLI,
// }

// const alchemy = new Alchemy(settings)

// // Returns the current block number
// export const getBlockNumber = async () => {
//   const blockNumber = await alchemy.core.getBlockNumber()
//   return blockNumber
// }

// alchemy.core.getTokenBalances(CONTRACT_ADDRESS).then((balances) => {
//   console.log("Balances:", balances)
// })

// // Returns the token balances for a specific owner address given a list of contracts
// export const getTokenBalances = async (ownerAddress: string, contractAddresses: string[]) => {
//   const balances = await alchemy.core.getTokenBalances(ownerAddress, contractAddresses)

//   return balances
// }

export async function getPendingTrades() {
  const pendingTradesIDs = await trustMeContract.getPendingTradesIDs()
  return pendingTradesIDs
}

export async function getTrade(tradeId: number) {
  const trade = await trustMeContract.getTrade(tradeId)
  return trade
}

export async function getTradeIdToTrade(tradeId: number) {
  return await trustMeContract.getTradeIdToTrade(tradeId)
}

export const getTradeStatus = async (tradeID: number) => {
  const tradeStatus = await trustMeContract.getTradeStatus(tradeID)
  return tradeStatus
}

export const getTradesIDsByUser = async (address: string) => {
  const tradeIds = await trustMeContract.getTradesIDsByUser(address)

  return tradeIds
}

export const getUserToTradesIDs = async (userAddress: string, id: number) => {
  const tradeStatus = await trustMeContract.userToTradesIDs(userAddress, id)
  return tradeStatus
}

export const getTradesList = async (amount: number) => {
  const userAddress = "0x2306dA564868c47bb2C0123A25943cD54e6e8e2F"
  const tradeIds = await getTradesIDsByUser(userAddress)

  const trades: Trade[] = []
  tradeIds.slice(0, amount).map(async (tradeId: BigNumber) => {
    const trade = await getTrade(Number(tradeId._hex))
    await trades.push({
      id: Number(trade.id),
      seller: trade.seller,
      buyer: trade.buyer,
      tokenToSell: getSymbol(trade.tokenToSell),
      tokenToBuy: getSymbol(trade.tokenToBuy),
      amountOfTokenToSell: formatEther(trade.amountOfTokenToSell),
      amountOfTokenToBuy: formatEther(trade.amountOfTokenToBuy),
      deadline: Number(trade.deadline),
      status: getStatus(trade.status),
    })
  })

  return trades
}
