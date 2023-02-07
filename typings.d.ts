export interface TradeLib {
  tradeId: number;
  seller: string;
  buyer: string;
  nft: {
    addressNFTToSell: string;
    tokenIdNFTToSell: number;
    addressNFTToBuy: string;
    tokenIdNFTToBuy: number;
  };
  token: {
    tokenToSell: string;
    amountOfTokenToSell: number;
    tokenToBuy: string;
    amountOfTokenToBuy: number;
  };
  eth: {
    amountOfETHToSell: number;
    amountOfETHToBuy: number;
  };
  deadline: number;
  dateCreated: number;
  status: number;
}
