import { trustMeContract } from "../constants/interact";

async function confirmTrade(tradeId: number) {
  return await trustMeContract.confirmTrade(tradeId);
}

async function checkExpiredTrades() {
  return await trustMeContract.checkExpiredTrades();
}

async function withdraw(tradeId: number) {
  return await trustMeContract.withdraw(tradeId);
}

export const addTrade = async (
  buyerAddress: string,
  tokenToSell: string,
  tokenToBuy: number,
  amountOfTokenToSell: number,
  amountOfTokenToBuy: number,
  deadline: number,
) => {
  const tx = await trustMeContract.addTrade(
    buyerAddress,
    tokenToSell,
    tokenToBuy,
    amountOfTokenToSell,
    amountOfTokenToBuy,
    deadline,
  );

  tx.wait();

  return tx;
};

export const cancelTrade = async (tradeID: number) => {
  const tx = await trustMeContract.cancelTrade(tradeID);
  tx.wait();
  return tx;
};
