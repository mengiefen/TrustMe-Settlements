import { BigNumber } from "ethers";
import { getSymbol } from "@/utils";
import { formatEther } from "ethers/lib/utils.js";

export const resolveDataType = (trade: any) => {
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
      addressNFTToBuy: trade.nft.addressNFTToBuy,
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

export const getResolvedTokens = async (
  isCreatedByYou: boolean,
  tokenToBuy: string,
  tokenToSell: string,
  amountOfTokenToBuy: BigNumber,
  amountOfTokenToSell: BigNumber,
  addressNFTToBuy: string,
  addressNFTToSell: string,
  tokenIdNFTToBuy: BigNumber,
  tokenIdNFTToSell: BigNumber,
  amountOfETHToBuy: BigNumber,
  amountOfETHToSell: BigNumber,
) => {
  console.log("isCreatedByYou IN", isCreatedByYou);
  if (isCreatedByYou) {
    return {
      token: {
        tokenToSell,
        tokenToBuy,
        amountOfTokenToSell: formatEther(amountOfTokenToSell),
        amountOfTokenToBuy: formatEther(amountOfTokenToBuy),
        symbolToBuy: (await getSymbol(tokenToBuy)) as string,
        symbolToSell: (await getSymbol(tokenToSell)) as string,
      },
      nft: {
        addressNFTToSell,
        symbolToNFTToSell: ((await getSymbol(addressNFTToSell)) ||
          "") as string,
        addressNFTToBuy,
        symbolToNFTToBuy: ((await getSymbol(addressNFTToBuy)) || "") as string,
        tokenIdNFTToSell: Number(tokenIdNFTToSell),
        tokenIdNFTToBuy: Number(tokenIdNFTToBuy),
      },
      eth: {
        amountOfETHToSell: formatEther(amountOfETHToSell),
        amountOfETHToBuy: formatEther(amountOfETHToBuy),
      },
    };
  }

  return {
    token: {
      tokenToSell: tokenToBuy,
      tokenToBuy: tokenToSell,
      amountOfTokenToSell: formatEther(amountOfTokenToBuy),
      amountOfTokenToBuy: formatEther(amountOfTokenToSell),
      symbolToBuy: await getSymbol(tokenToSell),
      symbolToSell: await getSymbol(tokenToBuy),
    },
    nft: {
      addressNFTToSell: addressNFTToBuy,
      // symbolToNFTToSell: ((await getSymbol(addressNFTToBuy)) || "") as string,
      addressNFTToBuy: addressNFTToSell,
      // symbolToNFTToBuy: ((await getSymbol(addressNFTToSell)) || "") as string,
      tokenIdNFTToSell: tokenIdNFTToBuy,
      tokenIdNFTToBuy: tokenIdNFTToSell,
    },

    eth: {
      amountOfETHToSell: formatEther(amountOfETHToBuy),
      amountOfETHToBuy: formatEther(amountOfETHToSell),
    },
  };
};
