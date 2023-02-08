import { BigNumber } from "ethers";
import { getSymbol } from "@/utils";
import { formatEther } from "ethers/lib/utils.js";

export const resolveDataType = (trade: any) => {
  console.log("trade", {
    id: Number(trade.tradeId),
    status: Number(trade.status),
    seller: trade.seller,
    buyer: trade.buyer,
    deadline: Number(trade.deadline),
    dateCreated: Number(trade.dateCreated),
    nft: {
      addressNFTToSell: trade.nft.addressNFTToSell,
      tokenIdNFTToSell: formatEther(trade.nft.tokenIdNFTToSell),
      //symbolToNFTToBuy: (await getSymbol(trade.nft.addressNFTToBuy)) as string,
      addressNFTToBuy: trade.nft.addressNFTToBuy,
      // symbolToNFTToBuy: (await getSymbol(trade.nft.addressNFTToBuy)) as string,
      tokenIdNFTToBuy: formatEther(trade.nft.tokenIdNFTToBuy),
    },
  });
  return {
    id: Number(trade.tradeId),
    status: Number(trade.status),
    seller: trade.seller,
    buyer: trade.buyer,
    deadline: Number(trade.deadline),
    dateCreated: Number(trade.dateCreated),
    nft: {
      addressNFTToSell: trade.nft.addressNFTToSell,
      tokenIdNFTToSell: formatEther(trade.nft.tokenIdNFTToSell),
      //symbolToNFTToBuy: (await getSymbol(trade.nft.addressNFTToBuy)) as string,
      addressNFTToBuy: trade.nft.addressNFTToBuy,
      // symbolToNFTToBuy: (await getSymbol(trade.nft.addressNFTToBuy)) as string,
      tokenIdNFTToBuy: formatEther(trade.nft.tokenIdNFTToBuy),
    },

    token: {
      tokenToSell: trade.token.tokenToSell,
      tokenToBuy: trade.token.tokenToBuy,
      amountOfTokenToSell: formatEther(trade.token.amountOfTokenToSell),
      amountOfTokenToBuy: formatEther(trade.token.amountOfTokenToBuy),
    },

    eth: {
      amountOfETHToSell: formatEther(trade.eth.amountOfETHToSell),
      amountOfETHToBuy: formatEther(trade.eth.amountOfETHToBuy),
    },
  };
};
