import Layout from "@/Layout"
import React from "react"
import TableComponent from "./TableComponent"
import UserDetail from "./UserDetail"
import { MdOutlineArrowForward } from "react-icons/md"
import { FaUserCircle } from "react-icons/fa"
import SearchBox from "./SearchBox"
import TradeList from "./TradeList"

const ArrowRight = (
  <MdOutlineArrowForward className="text-secondary-900 hover:translate-x-[1px] transition duration-300" />
)

const UserCircle = (
  <FaUserCircle className="text-secondary-900 hover:translate-x-[1px] transition duration-300 w-[40px] h-[40px]" />
)

const TransactionList = () => {
  return (
    <Layout bg="bg-bg border-bg  border-b-[0.5px]">
      <div className="px-5">
        <TradeList />
      </div>
    </Layout>
  )
}

export default TransactionList

const data = [
  {
    user: UserCircle,
    txId: "World",
    amount: "Hello",
    status: "World",
    arrow: ArrowRight,
  },
  {
    user: UserCircle,
    txId: "rocks",
    amount: "Hello",
    status: "World",
    arrow: ArrowRight,
  },
  {
    user: UserCircle,
    txId: "you want",
    amount: "Hello",
    status: "World",
    arrow: ArrowRight,
  },
  {
    user: UserCircle,
    txId: "World",
    amount: "Hello",
    status: "World",
    arrow: ArrowRight,
  },
  {
    user: UserCircle,
    txId: "rocks",
    amount: "Hello",
    status: "World",
    arrow: ArrowRight,
  },
  {
    user: UserCircle,
    txId: "you want",
    amount: "Hello",
    status: "World",
    arrow: ArrowRight,
  },
]
