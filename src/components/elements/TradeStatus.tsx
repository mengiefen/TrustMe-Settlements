import React from "react"
import { BsCheck2All, BsCheckCircle } from "react-icons/bs"
import { MdCancel, MdOutlineCancel, MdOutlineLockClock, MdPendingActions } from "react-icons/md"

type StatusButtonProps = {
  children?: React.ReactNode
  // text: string
  bg?: string
}

const StatusButton = ({ bg = "bg-green-500 text-white", ...props }: StatusButtonProps) => {
  return (
    <div className={`px-1 py-[2px] font-semibold tracking-wide text-xs ${bg}`}>
      {props.children}
    </div>
  )
}

type TradeStatusProps = {
  status: string
  icon?: React.ReactNode
}

const color = (status = "Expired") => {
  switch (status) {
    case "Completed":
      return "text-green-600 "
    case "Pending":
      return "border-yellow-700 text-yellow-900"
    case "Cancelled":
      return "border-red-400"
    default:
      return "text-gray-700 border-gray-700"
  }
}

const ButtonIcon = (status = "Expired") => {
  switch (status) {
    case "Completed":
      return <BsCheckCircle className="text-green-600" />
    case "Pending":
      return <MdPendingActions className="text-yellow-600" />
    case "Cancelled":
      return <MdOutlineCancel className="text-red-600" />
    default:
      return <MdOutlineLockClock className="text-gray-700" />
  }
}

const TradeStatus = ({ status = "Completed", icon = <BsCheck2All /> }: TradeStatusProps) => {
  return (
    <div className="flex items-center justify-center">
      <StatusButton
        bg={`flex gap-1 text-xl items-center border-none outline-none ${color(status)}`}
      >
        {ButtonIcon(status)}
      </StatusButton>
    </div>
  )
}

export default TradeStatus
