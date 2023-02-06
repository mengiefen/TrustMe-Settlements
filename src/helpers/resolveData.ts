import { BigNumber } from "ethers";
import { getSymbol } from "@/utils";
import { formatEther } from "ethers/lib/utils.js";

export const getResolvedUserAddress = (
  userAddress: string,
  tradeBuyer: string,
  tradeSeller: string,
) => {
  let buyer: string;
  let seller: string;

  if (tradeSeller === userAddress) {
    buyer = tradeBuyer;
    seller = tradeSeller;
  } else {
    seller = tradeBuyer;
    buyer = tradeSeller;
  }

  return {
    buyer,
    seller,
    isCreatedByYou: tradeSeller === userAddress,
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
        symbolToNFTToSell: (await getSymbol(addressNFTToSell)) as string,
        addressNFTToBuy,
        symbolToNFTToBuy: (await getSymbol(addressNFTToBuy)) as string,
        tokenIdNFTToSell: Number(tokenIdNFTToSell).toString(),
        tokenIdNFTToBuy: Number(tokenIdNFTToBuy).toString(),
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
      symbolToBuy: (await getSymbol(tokenToSell)) as string,
      symbolToSell: (await getSymbol(tokenToBuy)) as string,
    },
    nft: {
      addressNFTToSell: addressNFTToBuy,
      symbolToNFTToSell: (await getSymbol(addressNFTToBuy)) as string,
      addressNFTToBuy: addressNFTToSell,
      symbolToNFTToBuy: (await getSymbol(addressNFTToSell)) as string,
      tokenIdNFTToSell: tokenIdNFTToBuy,
      tokenIdNFTToBuy: tokenIdNFTToSell,
    },
    eth: {
      amountOfETHToSell: formatEther(amountOfTokenToBuy),
      amountOfETHToBuy: formatEther(amountOfETHToSell),
    },
  };
};
