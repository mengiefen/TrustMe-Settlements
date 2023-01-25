import React from "react"
import { BsCheck2All } from "react-icons/bs"

type StatusButtonProps = {
  children?: React.ReactNode
  text: string
  bg?: string
}

const StatusButton = ({ text, bg = "bg-green-500 text-white", ...props }: StatusButtonProps) => {
  return (
    <button className={`px-1 py-[2px] font-semibold tracking-wide text-xs ${bg}`}>
      {props.children} {text}
    </button>
  )
}

type TradeStatusProps = {
  status: string
  icon?: React.ReactNode
  style?: string
}

const TradeStatus = ({
  status = "Completed",
  icon = <BsCheck2All />,
  style = "bg-green-300 text-green-900 border-green-700",
}: TradeStatusProps) => {
  return (
    <div className="flex items-center justify-center">
      <StatusButton text={status} bg={` w-24 flex gap-1 items-center border rounded ${style}`}>
        <BsCheck2All className="text-md font-bold" />
      </StatusButton>
    </div>
  )
}

export default TradeStatus
