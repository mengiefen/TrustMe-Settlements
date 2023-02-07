import { ethers, Signer } from "ethers";
import { alchemy } from "@/connector/connect";
import TrustMeAbi from "../../abi.json";
import Erc20Abi from "../../erc20Abi.json";
import { erc721ABI, fetchSigner } from "@wagmi/core";
import { ERC20, ERC721, TrustMe } from "typechain";
import { formatEther } from "ethers/lib/utils.js";

export const getSigner = async () => {
  const signer = await fetchSigner();
  return signer;
};
export const TRUST_ME_CONTRACT_ADDRESS =
  "0x466f95C9cd9CaB50689E45D19974FC6718679a2c";

export const trustMeContract = async () => {
  const trustMeInstance: TrustMe = new ethers.Contract(
    TRUST_ME_CONTRACT_ADDRESS,
    TrustMeAbi,
    (await getSigner()) as Signer,
  ) as TrustMe;
  return trustMeInstance;
};

export const erc20Contract = async (address: string) => {
  const erc20Instance = new ethers.Contract(
    address,
    Erc20Abi,
    (await getSigner()) as Signer,
  ) as ERC20;
  return erc20Instance;
};

export const erc721Contract = async (address: string) => {
  const erc721Instance = new ethers.Contract(
    address,
    erc721ABI,
    (await getSigner()) as Signer,
  ) as ERC721;
  return erc721Instance;
};

export async function getPendingTrades() {
  const trustMe = await trustMeContract();
  const pendingTradesIDs = await trustMe.getPendingTradesIDs();
  return pendingTradesIDs;
}

export async function getTrade(tradeId: number) {
  const trustMe = await trustMeContract();
  const trade = await trustMe.getTrade(tradeId);
  return trade;
}

export const getTradeStatus = async (tradeID: number) => {
  const trustMe = await trustMeContract();
  const tradeStatus = await trustMe.getTradeStatus(tradeID);
  return tradeStatus;
};

export const getTradesIDsByUser = async (address: string) => {
  const trustMe = await trustMeContract();
  const tradeIds = await trustMe.getTradesIDsByUser(address);

  return tradeIds;
};

export const getUserToTradesIDs = async (userAddress: string, id: number) => {
  const trustMe = await trustMeContract();
  const tradeStatus = await trustMe.userToTradesIDs(userAddress, id);
  return tradeStatus;
};

export const getConnectedUserTokens = async (address: string) => {
  const tokenMetadata: any = [];
  const balances = await alchemy.core.getTokenBalances(address);

  // Remove tokens with zero balance
  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });
  for (let token of nonZeroBalances) {
    // Get balance of token
    let balance: number = token.tokenBalance as unknown as number;

    // Get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    // Compute token balance in human-readable format
    balance = balance / Math.pow(10, metadata.decimals as number);
    balance = balance.toFixed(2) as unknown as number;
    tokenMetadata.push({
      name: metadata.name,
      symbol: metadata.symbol,
      balance: balance,
      decimals: metadata.decimals,
      logo: metadata.logo,
      address: token.contractAddress,
    });
  }
  return tokenMetadata;
};
export interface NftDetails {
  quantity: number;
  address: string;
  title: string;
  description: string;
  media: { raw: string }[];
  tokenId: number;
  tokenUri: string | undefined;
}
export const getNftsMetadata = async (address: string) => {
  console.log(address);
  try {
    const result = await alchemy.nft.getNftsForOwner(address, {
      omitMetadata: false,
    });
    let formattedResult: NftDetails[] = [] as NftDetails[];
    for (let nfts of result.ownedNfts) {
      let formatData = {
        title: nfts.title,
        quantity: nfts.balance,
        description: nfts.description,
        media: nfts.media,
        address: nfts.contract.address,
        tokenId: Number(nfts.tokenId),
        tokenUri: nfts.tokenUri?.raw,
      };
      formattedResult.push(formatData);
    }
    console.log(formattedResult);
    return formattedResult;
  } catch (error) {
    console.log(error);
  }
};

// return balance in ether format
const getSignerBalance = async (address: string) => {
  const signer = await getSigner();
  const balance = await signer?.getBalance();
  return formatEther(balance as any);
};
