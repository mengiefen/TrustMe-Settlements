import { BigNumber } from "ethers";
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

export interface TradeLib {
  id: number;
  seller: string;
  buyer: string;
  deadline: number;
  dateCreated: number;
  status: string;
  isCreatedByYou: boolean;
}

export interface Nft {
  addressNFTToSell: string;
  tokenIdNFTToSell: BigNumber | string;
  addressNFTToBuy: string;
  tokenIdNFTToBuy: BigNumber | string;
}

export interface Token {
  tokenToSell: string;
  tokenToBuy: string;
  amountOfTokenToSell: string;
  amountOfTokenToBuy: string;
  symbolToSell: string;
  symbolToBuy: string;
}

export interface Eth {
  amountOfETHToSell: string;
  amountOfETHToBuy: string;
}

export interface EthToNftTrade extends TradeLib {
  nft: Nft;
  eth: Eth;
}

export interface NftToTokenTrade extends TradeLib {
  nft: Nft;
  token: Token;
}

export interface TokenToEthTrade extends TradeLib {
  token: Token;
  eth: Eth;
}

export interface EthToTokenTrade extends TradeLib {
  token: Token;
  eth: Eth;
}

export interface TokenToTokenTrade extends TradeLib {
  token: Token;
}

export interface NftToNftTrade extends TradeLib {
  nft: Nft;
}

export interface TradeData {
  id: number;
  seller: string;
  buyer: string;
  addressAssetToSend: string;
  addressAssetToReceive: string;
  amountOfAssetToSend: string;
  amountOfAssetToReceive: string;
  symbolAssetToSend: string;
  symbolAssetToReceive: string;
  deadline: number;
  dateCreated: number;
  status: string;
  tradeType: string;
  isCreatedByYou: boolean;
}

export interface Trade {
  id: number;
  seller: string;
  buyer: string;
  deadline: number;
  dateCreated: number;
  status: number;
  nft: {
    addressNFTToSell: string;
    tokenIdNFTToSell: string;
    addressNFTToBuy: string;
    tokenIdNFTToBuy: string;
  };
  token: {
    tokenToBuy: string;
    tokenToSell: string;
    amountOfTokenToSell: string;
    amountOfTokenToBuy: string;
  };

  eth: {
    amountOfETHToSell: string;
    amountOfETHToBuy: string;
  };
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
