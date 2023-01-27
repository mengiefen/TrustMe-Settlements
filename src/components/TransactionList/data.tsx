import { FaUserCircle } from "react-icons/fa"
import TradeStatus from "../elements/TradeStatus"

const UserProfile = () => <FaUserCircle className="text-secondary-900 w-[40px] h-[40px]" />

const trades = [
  {
    userPic: UserProfile(),
    ReceiveAmount: "234.23",
    ReceiveTokenId: "ETH",
    TransferAmount: "112.53",
    TransferTokenId: "TKN",
    status: "Pending",
  },
  {
    userPic: UserProfile(),
    ReceiveAmount: "234,23",
    ReceiveTokenId: "ETH",
    TransferAmount: "112.53",
    TransferTokenId: "TKN",
    status: "Completed",
  },
  {
    userPic: UserProfile(),
    ReceiveAmount: "234,23",
    ReceiveTokenId: "ETH",
    TransferAmount: "112.53",
    TransferTokenId: "TKN",
    status: "Pending",
  },
  {
    userPic: UserProfile(),
    ReceiveAmount: "234,23",
    ReceiveTokenId: "ETH",
    TransferAmount: "112.53",
    TransferTokenId: "TKN",
    status: "Completed",
  },

  {
    userPic: UserProfile(),
    ReceiveAmount: "234,23",
    ReceiveTokenId: "ETH",
    TransferAmount: "112.53",
    TransferTokenId: "TKN",
    status: "Expired",
  },
  {
    userPic: UserProfile(),
    ReceiveAmount: "234,23",
    ReceiveTokenId: "ETH",
    TransferAmount: "112.53",
    TransferTokenId: "TKN",
    status: "Cancelled",
  },

  {
    userPic: UserProfile(),
    ReceiveAmount: "234,23",
    ReceiveTokenId: "ETH",
    TransferAmount: "112.53",
    TransferTokenId: "TKN",
    status: "Completed",
  },
]

export default trades
