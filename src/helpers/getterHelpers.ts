import { Alchemy, Network } from "alchemy-sdk"
import { ethers } from "ethers"
import { formatEther, parseEther } from "ethers/lib/utils"
import { CONTRACT_ABI } from "./../constants/interact"

const ALCHEMY_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY
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
const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.stringify(CONTRACT_ABI), provider)

// addTrade(address,address,address,uint256,uint256,uint256)
// {addTrade(address,address,address,uint256,uint256,uint256): ƒ, cancelTrade(uint256): ƒ, checkExpiredTrades(): ƒ, confirmTrade(uint256): ƒ, getPendingTradesIDs(): ƒ, …}
// cancelTrade(uint256)
// checkExpiredTrades()
// confirmTrade(uint256)
// {addTrade(address,address,address,uint256,uint256,uint256): ƒ, cancelTrade(uint256): ƒ, checkExpiredTrades(): ƒ, confirmTrade(uint256): ƒ, getPendingTradesIDs(): ƒ, …}
// {TradeCanceled(uint256,address,address): ƒ, TradeConfirmed(uint256,address,address): ƒ, TradeCreated(uint256,address,address): ƒ, TradeExpired(uint256,address,address): ƒ, TradeWithdrawn(uint256,address,address): ƒ, …}
// {addTrade(address,address,address,uint256,uint256,uint256): ƒ, cancelTrade(uint256): ƒ, checkExpiredTrades(): ƒ, confirmTrade(uint256): ƒ, getPendingTradesIDs(): ƒ, …}
// getPendingTradesIDs()
// getTrade(uint256)
// Interface {fragments: Array(28), _abiCoder: AbiCoder, functions: {…}, errors: {…}, events: {…}, …}
// pendingTradesIDs(uint256)
// {addTrade(address,address,address,uint256,uint256,uint256): ƒ, cancelTrade(uint256): ƒ, checkExpiredTrades(): ƒ, confirmTrade(uint256): ƒ, getPendingTradesIDs(): ƒ, …}
// AlchemyProvider {_isProvider: true, _events: Array(0), _emitted: {…}, disableCcipRead: false, formatter: Formatter, …}
// resolvedAddress
// Promise {<rejected>: Error: resolver or addr is not configured for ENS name (argument="name", value="", code=INVALID_ARG…}
// signer
// tradeIDToTrade(uint256)

// withdraw(uint256)

// Returns the current block number
export const getBlockNumber = async () => {
  const blockNumber = await alchemy.core.getBlockNumber()
  return blockNumber
}

alchemy.core.getTokenBalances(CONTRACT_ADDRESS).then((balances) => {
  console.log("Balances:", balances)
})

// Returns the token balances for a specific owner address given a list of contracts
export const getTokenBalances = async (ownerAddress: string, contractAddresses: string[]) => {
  const balances = await alchemy.core.getTokenBalances(ownerAddress, contractAddresses)

  return balances
}

export const getTradeStatus = async (tradeID: number) => {
  const tradeStatus = await contract.getTradeStatus(tradeID)
  return tradeStatus
}

export const getTradesIDsByUser = async (address: string) => {
  const tradeStatus = await contract.getTradesIDsByUser(address)
  return tradeStatus
}

export const getUserToTradesIDs = async (userAddress: string, id: number) => {
  const tradeStatus = await contract.userToTradesIDs(userAddress, id)
  return tradeStatus
}
