import { BigNumber } from "ethers"
import { getSymbol } from "@/utils"
import { formatEther } from "ethers/lib/utils.js"

export const getResolvedUserAddress = (
  userAddress: string,
  tradeBuyer: string,
  tradeSeller: string
) => {
  let buyer: string
  let seller: string

  if (tradeSeller === userAddress) {
    buyer = tradeBuyer
    seller = tradeSeller
  } else {
    seller = tradeBuyer
    buyer = tradeSeller
  }

  return { buyer, seller, isCreatedByYou: tradeSeller === userAddress }
}

export const getResolvedTokens = async (
  isCreatedByYou: boolean,
  tokenToBuy: string,
  tokenToSell: string,
  amountOfTokenToBuy: BigNumber,
  amountOfTokenToSell: BigNumber
) => {
  if (isCreatedByYou) {
    return {
      tokenToSell,
      tokenToBuy,
      amountOfTokenToSell: formatEther(amountOfTokenToSell),
      amountOfTokenToBuy: formatEther(amountOfTokenToBuy),
      symbolToBuy: await getSymbol(tokenToBuy),
      symbolToSell: await getSymbol(tokenToSell),
      isCreatedByYou,
    }
  }

  return {
    tokenToSell: tokenToBuy,
    tokenToBuy: tokenToSell,
    amountOfTokenToSell: formatEther(amountOfTokenToBuy),
    amountOfTokenToBuy: formatEther(amountOfTokenToSell),
    symbolToBuy: await getSymbol(tokenToSell),
    symbolToSell: await getSymbol(tokenToBuy),
    isCreatedByYou,
  }
}
