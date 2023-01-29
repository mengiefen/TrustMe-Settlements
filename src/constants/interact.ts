import { ethers } from "ethers"

export const CONTRACT_ABI = [
  { inputs: [], name: "CannotTradeSameToken", type: "error" },
  { inputs: [], name: "CannotTradeWithSelf", type: "error" },
  { inputs: [], name: "InsufficientAllowance", type: "error" },
  { inputs: [], name: "InsufficientBalance", type: "error" },
  { inputs: [], name: "InvalidAddress", type: "error" },
  { inputs: [], name: "InvalidAmount", type: "error" },
  { inputs: [], name: "OnlyBuyer", type: "error" },
  { inputs: [], name: "OnlySeller", type: "error" },
  { inputs: [], name: "TradeIsExpired", type: "error" },
  { inputs: [], name: "TradeIsNotExpired", type: "error" },
  { inputs: [], name: "TradeIsNotPending", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tradeID", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
    ],
    name: "TradeCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tradeID", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
    ],
    name: "TradeConfirmed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tradeID", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
    ],
    name: "TradeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tradeID", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
    ],
    name: "TradeExpired",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tradeID", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
    ],
    name: "TradeWithdrawn",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_buyer", type: "address" },
      { internalType: "address", name: "_tokenToSell", type: "address" },
      { internalType: "address", name: "_tokenToBuy", type: "address" },
      { internalType: "uint256", name: "_amountOfTokenToSell", type: "uint256" },
      { internalType: "uint256", name: "_amountOfTokenToBuy", type: "uint256" },
      { internalType: "uint256", name: "_tradePeriod", type: "uint256" },
    ],
    name: "addTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tradeID", type: "uint256" }],
    name: "cancelTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "checkExpiredTrades",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tradeID", type: "uint256" }],
    name: "confirmTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingTradesIDs",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tradeID", type: "uint256" }],
    name: "getTrade",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "seller", type: "address" },
          { internalType: "address", name: "buyer", type: "address" },
          { internalType: "address", name: "tokenToSell", type: "address" },
          { internalType: "address", name: "tokenToBuy", type: "address" },
          { internalType: "uint256", name: "amountOfTokenToSell", type: "uint256" },
          { internalType: "uint256", name: "amountOfTokenToBuy", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "enum TrustMe.TradeStatus", name: "status", type: "uint8" },
        ],
        internalType: "struct TrustMe.Trade",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tradeID", type: "uint256" }],
    name: "getTradeStatus",
    outputs: [{ internalType: "enum TrustMe.TradeStatus", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getTradesIDsByUser",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "pendingTradesIDs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "tradeIDToTrade",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "address", name: "buyer", type: "address" },
      { internalType: "address", name: "tokenToSell", type: "address" },
      { internalType: "address", name: "tokenToBuy", type: "address" },
      { internalType: "uint256", name: "amountOfTokenToSell", type: "uint256" },
      { internalType: "uint256", name: "amountOfTokenToBuy", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "enum TrustMe.TradeStatus", name: "status", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "userToTradesIDs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tradeID", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]

const ALCHEMY_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY || ""
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", ALCHEMY_API_KEY) // Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)
export const trustMeContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  JSON.stringify(CONTRACT_ABI),
  signer
)
