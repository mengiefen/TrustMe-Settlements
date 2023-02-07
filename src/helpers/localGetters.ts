// import { formatEther } from "ethers/lib/utils.js";
// import { ethers, Signer } from "ethers";
// import Erc20Abi from "../../erc20Abi.json";
// import TrustMeAbi from "./testAbiTrustMe.json";
// import { fetchSigner } from "@wagmi/core";
// import { ERC20, TrustMe } from "typechain";
// import { alchemy } from "@/connector/connect";

// const TRUSTME_ADDRESS = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";
// const SELLER_TOKEN_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
// const BUYER_TOKEN_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
// const SELLER_NFT_ADDRESS = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9";
// const BUYER_NFT_ADDRESS = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9";

// export const getSigner = async () => {
//   const signer = await fetchSigner();
//   return signer;
// };

// export const getProvider = () => {
//   return new ethers.providers.JsonRpcProvider("http://localhost:8545");
// };

// export const trustMeContract = async () => {
//   const trustMeInstance: TrustMe = new ethers.Contract(
//     TRUSTME_ADDRESS,
//     TrustMeAbi,
//     (await getSigner()) as Signer,
//   ) as TrustMe;
//   return trustMeInstance;
// };

// export const erc20Contract = async (address: string) => {
//   const erc20Instance = new ethers.Contract(
//     address,
//     Erc20Abi,
//     (await getSigner()) as Signer,
//   ) as ERC20;
//   return erc20Instance;
// };

// export async function getPendingTrades() {
//   const trustMe = await trustMeContract();
//   const pendingTradesIDs = await trustMe.getPendingTradesIDs();
//   return pendingTradesIDs;
// }

// export async function getTrade(tradeId: number) {
//   const trustMe = await trustMeContract();
//   const trade = await trustMe.getTrade(tradeId);
//   return trade;
// }

// export const getTradeStatus = async (tradeID: number) => {
//   const trustMe = await trustMeContract();
//   const tradeStatus = await trustMe.getTradeStatus(tradeID);
//   return tradeStatus;
// };
// export const getTradesIDsByUser = async (address: string) => {
//   const trustMe = await trustMeContract();
//   const tradeIds = await trustMe.getTradesIDsByUser(address);

//   return tradeIds;
// };

// export const getUserToTradesIDs = async (userAddress: string, id: number) => {
//   const trustMe = await trustMeContract();
//   const tradeStatus = await trustMe.userToTradesIDs(userAddress, id);
//   return tradeStatus;
// };

// // export const getConnectedUserTokens = async (address: string) => {
// //   const tokenMetadata: any = [];
// //   const balances = await alchemy.core.getTokenBalances(address);

// //   // Remove tokens with zero balance
// //   const nonZeroBalances = balances.tokenBalances.filter((token) => {
// //     return token.tokenBalance !== "0";
// //   });
// //   for (let token of nonZeroBalances) {
// //     // Get balance of token
// //     let balance: number = token.tokenBalance as unknown as number;

// //     // Get metadata of token
// //     const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

// //     // Compute token balance in human-readable format
// //     balance = balance / Math.pow(10, metadata.decimals as number);
// //     balance = balance.toFixed(2) as unknown as number;
// //     tokenMetadata.push({
// //       name: metadata.name,
// //       symbol: metadata.symbol,
// //       balance: balance,
// //       decimals: metadata.decimals,
// //       logo: metadata.logo,
// //       address: token.contractAddress,
// //     });
// //   }
// //   return tokenMetadata;
// // };

// // return balance in ether format
// const getSignerBalance = async (address: string) => {
//   const signer = await getSigner();
//   const balance = await signer?.getBalance();
//   return formatEther(balance as any);
// };

// ========================================================
import { JsonRpcProvider, getNetwork } from "@ethersproject/providers";
import { createClient } from "@wagmi/core";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { hardhat } from "wagmi/dist/chains";

const provider = new JsonRpcProvider(
  "http://127.0.0.1:8545/",
  getNetwork(1337),
);
export const connector = new MetaMaskConnector({ chains: [hardhat] });

export const client = createClient({
  autoConnect: true,
  provider: provider,
  connectors: [connector],
});

// RPC_URL is just the hardhat rpc url so http://127.0.0.1:8545/
// CHAIN_ID is the hardhat network chain id so 1337
