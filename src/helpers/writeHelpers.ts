import { formatEther, parseEther } from "ethers/lib/utils"
import { Alchemy, Network } from "alchemy-sdk"
import {Trust_Me_Contract} from '../constants/interact';

const ALECHEMY_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY

const settings = {
  apiKey: ALECHEMY_API_KEY,
  network: Network.ETH_GOERLI,
}


async function getPendingTrades() {
  const pendingTradesIDs = await Trust_Me_Contract.methods.getPendingTradesIDs().call();
  return pendingTradesIDs;
}

async function getTrade(tradeId:number) {
  const trade = await Trust_Me_Contract.methods.getTrade(tradeId).call();
  return trade;
}

async function getTradeIdToTrade(tradeId:number){
  return await Trust_Me_Contract.methods.getTradeIdToTrade(tradeId).call();
}

async function confirmTrade(tradeId:number){
  return await Trust_Me_Contract.methods.confirmTrade(tradeId);
}

async function checkExpiredTrades() {
  return await Trust_Me_Contract.methods.checkExpiredTrades();
}

async function withdraw(tradeId:number) {
  return await Trust_Me_Contract.methods.withdraw(tradeId);
}
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