import React from "react"

type StatusButtonProps = {
  text: string
  bg?: string
}

const StatusButton = ({ text, bg = "bg-green-500 text-white" }: StatusButtonProps) => {
  return <button className={`py-1 px-2 text-sm font-semibold tracking-wide ${bg}`}> {text}</button>
}

export default StatusButton
