export type FormData = {
  sellerAddress: string;
  buyerAddress: string;
  sellerTokenAddress: string;
  sellerTokenAmount: string;
  buyerTokenAddress: string;
  buyerTokenAmount: number;
  sellerNftAddress: string;
  sellerNftTokenId: number;
  buyerNftAddress: string;
  buyerNftTokenId: number;
  sellerEthAmount: number;
  buyerEthAmount: number;
  datePeriod: string;
  timePeriod: string;
};
export type BuyerAddressType = {
  buyerAddress: string;
};
export type SellerTokenAddressType = {
  sellerTokenAddress: string;
  sellerTokenAmount: string;
};
export type BuyerTokenAddressType = {
  buyerTokenAddress: string;
  buyerTokenAmount: string;
};
export type TimePeriodType = {
  datePeriod: string;
  timePeriod: string;
};
export type SellerEthAmount = {
  sellerEthAmount: string;
};
export type BuyerEthAmount = {
  buyerEthAmount: string;
};
export type BuyerNft = {
  buyerNftAddress: string;
  buyerNftTokenId: string;
};
export type SellerNft = {
  sellerNftAddress: string;
  sellerNftTokenId: string;
};

export type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export type TokenMetadata = {
  decimals: number;
  name: string;
  symbol: string;
  logo: string;
  address: string;
  balance: string;
};
