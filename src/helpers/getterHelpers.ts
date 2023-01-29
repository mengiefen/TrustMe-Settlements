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
  const pendingTradesIDs = await trustMeContract.methods.getPendingTradesIDs().call()
  return pendingTradesIDs
}

export async function getTrade(tradeId: number) {
  const trade = await trustMeContract.methods.getTrade(tradeId).call()
  return trade
}

export async function getTradeIdToTrade(tradeId: number) {
  return await trustMeContract.methods.getTradeIdToTrade(tradeId).call()
}

export const getTradeStatus = async (tradeID: number) => {
  const tradeStatus = await trustMeContract.getTradeStatus(tradeID)
  return tradeStatus
}

export const getTradesIDsByUser = async (address: string) => {
  console.log("================================")
  console.log("Contract", trustMeContract)
  const tradeStatus = await trustMeContract.getTradesIDsByUser(address)

  return tradeStatus
}

export const getUserToTradesIDs = async (userAddress: string, id: number) => {
  const tradeStatus = await trustMeContract.userToTradesIDs(userAddress, id)
  return tradeStatus
}
