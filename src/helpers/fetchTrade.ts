import { getTrade } from "./getterHelpers";
import { getResolvedTokens, getResolvedUserAddress } from "./resolveData";

export const fetchTrade = async (userAddress: string, id: number) => {
  const trade = await getTrade(id);

  const { buyer, seller, isCreatedByYou } = getResolvedUserAddress(
    userAddress,
    trade.buyer,
    trade.seller,
  );

  const data = await getResolvedTokens(
    isCreatedByYou,
    trade.token.tokenToBuy,
    trade.token.tokenToSell,
    trade.token.amountOfTokenToBuy,
    trade.token.amountOfTokenToSell,
    trade.nft.addressNFTToBuy,
    trade.nft.addressNFTToSell,
    trade.nft.tokenIdNFTToBuy,
    trade.nft.tokenIdNFTToSell,
    trade.eth.amountOfETHToBuy,
    trade.eth.amountOfETHToSell,
  );

  const tradeObj = {
    id: Number(trade.tradeId),
    status:
      trade.status == 0
        ? "Pending"
        : trade.status == 1
        ? "Confirmed"
        : trade.status == 2
        ? "Canceled"
        : trade.status == 3
        ? "Expired"
        : "Withdrawn",
    seller,
    buyer,
    deadline: Number(trade.deadline),
    dateCreated: Number(trade.dateCreated),
    isCreatedByYou,
    ...data,
  };

  return tradeObj;
};

/// token to eth
/// token to nft
/// eth to nft
/// nft to nft
/// token to token
