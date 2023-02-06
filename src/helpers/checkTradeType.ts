import { formatEther } from "ethers/lib/utils.js";
import { Trade, TradeData } from "@/components/TransactionList/type";
import { getSymbol } from "@/utils";

export const checkCreateBy = (userAddress: string, tradeSeller: string) => {
  return tradeSeller === userAddress;
};

const isAddress = (address: string) => {
  return (
    address !== "0x0000000000000000000000000000000000000000" &&
    address !== "" &&
    address !== "0x0"
  );
};

const isNotZero = (amount: string) => {
  return amount !== "0" && amount !== "0.0" && amount !== "0.00";
};

const getStatus = (symbol: number) => {
  switch (symbol) {
    case 0:
      return "Pending";
    case 1:
      return "Confirmed";
    case 2:
      return "Canceled";
    case 3:
      return "Expired";
    case 4:
      return "Withdrawn";
    default:
      return "";
  }
};

export const getTradeDataByType = async (trade: Trade, userAddress: string) => {
  if (
    isAddress(trade.nft.addressNFTToSell) &&
    isAddress(trade.token.tokenToBuy)
  ) {
    return await getNftTokenTradeData(
      trade,
      checkCreateBy(userAddress, trade.seller),
    );
  }
  if (
    isAddress(trade.token.tokenToSell) &&
    isAddress(trade.nft.addressNFTToBuy)
  ) {
    console.log("TokenNft");

    return await getTokenNftTradeData(
      trade,
      checkCreateBy(userAddress, trade.seller),
    );
  }
  if (
    isAddress(trade.nft.addressNFTToSell) &&
    isNotZero(trade.eth.amountOfETHToBuy)
  ) {
    console.log("NFTEth");

    return await getNftEthTradeData(
      trade,
      checkCreateBy(userAddress, trade.seller),
    );
  }
  if (
    isNotZero(trade.eth.amountOfETHToSell) &&
    isAddress(trade.nft.addressNFTToBuy)
  ) {
    console.log("EthNft");

    return await getEthNftTradeData(
      trade,
      checkCreateBy(userAddress, trade.seller),
    );
  }
  if (
    isNotZero(trade.token.amountOfTokenToSell) &&
    isNotZero(trade.eth.amountOfETHToBuy)
  ) {
    console.log("TokenEth");

    return await getTokenEthTradeData(
      trade,
      checkCreateBy(userAddress, trade.seller),
    );
  }
  if (
    isNotZero(trade.eth.amountOfETHToSell) &&
    isNotZero(trade.token.amountOfTokenToBuy)
  ) {
    console.log("EthToken");

    return await getEthTokenTradeData(
      trade,
      checkCreateBy(userAddress, trade.seller),
    );
  }

  if (
    isAddress(trade.nft.addressNFTToSell) &&
    isAddress(trade.nft.addressNFTToBuy)
  ) {
    console.log("NftNft");

    return await getNftNftTradeData(
      trade,
      checkCreateBy(userAddress, trade.seller),
    );
  }
  if (
    isNotZero(trade.token.amountOfTokenToBuy) &&
    isNotZero(trade.token.amountOfTokenToSell)
  ) {
    console.log("TokenToken");

    return await getTokenTokenTradeData(
      trade,
      checkCreateBy(userAddress, trade.seller),
    );
  }
};

const exchangeSellerAndBuyer = (trade: TradeData) => {
  return {
    id: trade.id,
    seller: trade.buyer,
    buyer: trade.seller,
    addressAssetToSend: trade.addressAssetToReceive,
    addressAssetToReceive: trade.addressAssetToSend,
    amountOfAssetToSend: trade.amountOfAssetToReceive,
    amountOfAssetToReceive: trade.amountOfAssetToSend,
    symbolAssetToSend: trade.symbolAssetToReceive,
    symbolAssetToReceive: trade.symbolAssetToSend,
    deadline: trade.deadline,
    dateCreated: trade.dateCreated,
    status: trade.status,
    tradeType: trade.tradeType,
    isCreatedByYou: trade.isCreatedByYou,
  };
};

export const getNftNftTradeData = async (
  trade: Trade,
  isCreatedByYou: boolean,
) => {
  const tradeData: TradeData = {
    id: trade.id,
    seller: trade.seller,
    buyer: trade.buyer,
    addressAssetToSend: trade.nft.addressNFTToSell,
    addressAssetToReceive: trade.nft.addressNFTToBuy,
    amountOfAssetToSend: trade.nft.tokenIdNFTToSell,
    amountOfAssetToReceive: trade.nft.tokenIdNFTToBuy,
    symbolAssetToSend: "",
    symbolAssetToReceive: "",
    deadline: trade.deadline,
    dateCreated: trade.dateCreated,
    status: getStatus(trade.status),
    tradeType: "NFT to NFT",
    isCreatedByYou: isCreatedByYou,
  };

  return isCreatedByYou ? tradeData : exchangeSellerAndBuyer(tradeData);
};

export const getTokenTokenTradeData = async (
  trade: Trade,
  isCreatedByYou: boolean,
) => {
  const tradeData: TradeData = {
    id: trade.id,
    seller: trade.seller,
    buyer: trade.buyer,
    addressAssetToSend: trade.token.tokenToSell,
    addressAssetToReceive: trade.token.tokenToBuy,
    amountOfAssetToSend: trade.token.amountOfTokenToSell,
    amountOfAssetToReceive: trade.token.amountOfTokenToBuy,
    symbolAssetToSend: await getSymbol(trade.token.tokenToSell),
    symbolAssetToReceive: await getSymbol(trade.token.tokenToBuy),
    deadline: trade.deadline,
    dateCreated: trade.dateCreated,
    status: getStatus(trade.status),
    tradeType: "Token to Token",
    isCreatedByYou: isCreatedByYou,
  };

  return isCreatedByYou ? tradeData : exchangeSellerAndBuyer(tradeData);
};

const getTokenEthTradeData = async (trade: Trade, isCreatedByYou: boolean) => {
  const tradeData: TradeData = {
    id: trade.id,
    seller: trade.seller,
    buyer: trade.buyer,
    addressAssetToSend: trade.token.tokenToSell,
    addressAssetToReceive: "",
    amountOfAssetToSend: trade.token.amountOfTokenToSell,
    amountOfAssetToReceive: trade.eth.amountOfETHToBuy,
    symbolAssetToSend: await getSymbol(trade.token.tokenToSell),
    symbolAssetToReceive: "ETH",
    deadline: trade.deadline,
    dateCreated: trade.dateCreated,
    status: getStatus(trade.status),
    tradeType: "Token to ETH",
    isCreatedByYou: isCreatedByYou,
  };

  return isCreatedByYou ? tradeData : exchangeSellerAndBuyer(tradeData);
};

const getEthTokenTradeData = async (trade: Trade, isCreatedByYou: boolean) => {
  const tradeData: TradeData = {
    id: trade.id,
    seller: trade.seller,
    buyer: trade.buyer,
    addressAssetToSend: "",
    addressAssetToReceive: trade.token.tokenToBuy,
    amountOfAssetToSend: trade.eth.amountOfETHToSell,
    amountOfAssetToReceive: trade.token.amountOfTokenToBuy,
    symbolAssetToSend: "ETH",
    symbolAssetToReceive: await getSymbol(trade.token.tokenToBuy),
    deadline: trade.deadline,
    dateCreated: trade.dateCreated,
    status: getStatus(trade.status),
    tradeType: "ETH to Token",
    isCreatedByYou: isCreatedByYou,
  };

  return isCreatedByYou ? tradeData : exchangeSellerAndBuyer(tradeData);
};

const getEthNftTradeData = async (trade: Trade, isCreatedByYou: boolean) => {
  const tradeData: TradeData = {
    id: trade.id,
    seller: trade.seller,
    buyer: trade.buyer,
    addressAssetToSend: "",
    addressAssetToReceive: trade.nft.addressNFTToBuy,
    amountOfAssetToSend: trade.eth.amountOfETHToSell,
    amountOfAssetToReceive: trade.nft.tokenIdNFTToBuy,
    symbolAssetToSend: "ETH",
    symbolAssetToReceive: "",
    deadline: trade.deadline,
    dateCreated: trade.dateCreated,
    status: getStatus(trade.status),
    tradeType: "ETH to NFT",
    isCreatedByYou: isCreatedByYou,
  };

  return isCreatedByYou ? tradeData : exchangeSellerAndBuyer(tradeData);
};

const getNftEthTradeData = async (trade: Trade, isCreatedByYou: boolean) => {
  const tradeData: TradeData = {
    id: trade.id,
    seller: trade.seller,
    buyer: trade.buyer,
    addressAssetToSend: trade.nft.addressNFTToSell,
    addressAssetToReceive: "",
    amountOfAssetToSend: trade.nft.tokenIdNFTToSell,
    amountOfAssetToReceive: trade.eth.amountOfETHToBuy,
    symbolAssetToSend: "",
    symbolAssetToReceive: "ETH",
    deadline: trade.deadline,
    dateCreated: trade.dateCreated,
    status: getStatus(trade.status),
    tradeType: "NFT to ETH",
    isCreatedByYou: isCreatedByYou,
  };

  return isCreatedByYou ? tradeData : exchangeSellerAndBuyer(tradeData);
};

const getNftTokenTradeData = async (trade: Trade, isCreatedByYou: boolean) => {
  const tradeData: TradeData = {
    id: trade.id,
    seller: trade.seller,
    buyer: trade.buyer,
    addressAssetToSend: trade.nft.addressNFTToSell,
    addressAssetToReceive: trade.token.tokenToBuy,
    amountOfAssetToSend: trade.nft.tokenIdNFTToSell,
    amountOfAssetToReceive: trade.token.amountOfTokenToBuy,
    symbolAssetToSend: "",
    symbolAssetToReceive: await getSymbol(trade.token.tokenToBuy),
    deadline: trade.deadline,
    dateCreated: trade.dateCreated,
    status: getStatus(trade.status),
    tradeType: "NFT to Token",
    isCreatedByYou: isCreatedByYou,
  };

  return isCreatedByYou ? tradeData : exchangeSellerAndBuyer(tradeData);
};

const getTokenNftTradeData = async (trade: Trade, isCreatedByYou: boolean) => {
  const tradeData: TradeData = {
    id: trade.id,
    seller: trade.seller,
    buyer: trade.buyer,
    addressAssetToSend: trade.token.tokenToSell,
    addressAssetToReceive: trade.nft.addressNFTToBuy,
    amountOfAssetToSend: trade.token.amountOfTokenToSell,
    amountOfAssetToReceive: trade.nft.tokenIdNFTToBuy,
    symbolAssetToSend: await getSymbol(trade.token.tokenToSell),
    symbolAssetToReceive: "",
    deadline: trade.deadline,
    dateCreated: trade.dateCreated,
    status: getStatus(trade.status),
    tradeType: "Token to NFT",
    isCreatedByYou: isCreatedByYou,
  };

  return isCreatedByYou ? tradeData : exchangeSellerAndBuyer(tradeData);
};
