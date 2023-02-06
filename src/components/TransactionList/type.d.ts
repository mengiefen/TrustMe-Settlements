// export interface Trade {
//   id: number;
//   seller: string;
//   buyer: string;
//   tokenToSell: string;
//   tokenToBuy: string;
//   symbolToSell: string;
//   symbolToBuy: string;
//   amountOfTokenToSell: string;
//   amountOfTokenToBuy: string;
//   deadline: number;
//   status: string;
//   isCreatedByYou: boolean;
// }

export interface Trade {
  id: number;
  seller: string;
  buyer: string;
  nft: {
    addressNFTToSell: string;
    symbolToNFTToSell: string;
    tokenIdNFTToSell: string;
    addressNFTToBuy: string;
    tokenIdNFTToBuy: string;
    symbolToNFTToBuy: string;
  };
  token: {
    tokenToSell: string;
    symbolToSell: string;
    amountOfTokenToSell: string;
    tokenToBuy: string;
    symbolToBuy: string;
    amountOfTokenToBuy: string;
  };
  eth: {
    amountOfETHToSell: string;
    amountOfETHToBuy: string;
  };
  deadline: number;
  dateCreated: number;
  status: string;
  isCreatedByYou: boolean;
}

export interface TradeRow extends Trade {
  userPic?: React.ReactNode | React.ReactElement;
  ReceiveAmount: string;
  ReceiveAssetId?: string;
  TransferAmount: string;
  TransferAssetId?: string;
}

export type UserDetailProps = {
  userAddress: string;
  transactionCount: number;
};

export interface TokenListType {
  currencyBalance: string;
  currencySymbol: string;
  connectedNetwork: string;
  address: string;
  balance: string;
  decimals: number;
  name: string;
  symbol: string;
  logo: string;
}
