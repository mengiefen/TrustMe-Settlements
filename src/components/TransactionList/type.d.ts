export interface Trade {
  id: number
  seller: string
  buyer: string
  tokenToSell: string
  tokenToBuy: string
  symbolToSell: string
  symbolToBuy: string
  amountOfTokenToSell: string
  amountOfTokenToBuy: string
  deadline: number
  status: string
  isOutgoing: boolean
}

export interface TradeRow extends Trade {
  userPic?: React.ReactNode | React.ReactElement
  ReceiveAmount: string
  ReceiveTokenId?: string
  TransferAmount: string
  TransferTokenId?: string
}

export type UserDetailProps = {
  userAddress: string
  transactionCount: number
}
