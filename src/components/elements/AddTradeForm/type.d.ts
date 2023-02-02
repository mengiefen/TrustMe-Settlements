export type FormData = {
  sellerAddress: ReactNode
  buyerAddress: string
  sellerTokenAddress: string
  sellerTokenAmount: string
  buyerTokenAddress: string
  buyerTokenAmount: string
  datePeriod: string
  timePeriod: string
}
export type BuyerAddressType = {
  buyerAddress: string
}
export type SellerTokenAddressType = {
  sellerTokenAddress: string
  sellerTokenAmount: string
}
export type BuyerTokenAddressType = {
  buyerTokenAddress: string
  buyerTokenAmount: string
}
export type TimePeriodType = {
  datePeriod: string
  timePeriod: string
}

export type FormProps1 = BuyerAddressType & {
  updateFields: (fields: Partial<FormData>) => void
}
export type FormProps2 = SellerTokenAddressType & {
  updateFields: (fields: Pick<FormData, "sellerTokenAddress" | "sellerTokenAmount">) => void
}
export type FormProps3 = BuyerTokenAddressType & {
  updateFields: (fields: Partial<FormData>) => void
}
export type FormProps4 = TimePeriodType & {
  updateFields: (fields: Partial<FormData>) => void
}

export type FormWrapperProps = {
  title: string
  children: React.ReactNode
}
export type TokenMetadata = {
  decimals: number
  name: string
  symbol: string
  logo: string
  address: string
}
