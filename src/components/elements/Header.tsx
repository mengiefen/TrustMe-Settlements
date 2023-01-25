import Image from "next/image"
import React from "react"
import { FiMenu } from "react-icons/fi"
import { GiTwoCoins } from "react-icons/gi"

type HeaderProps = {
  bg?: string
  logoPrimaryColor?: string
}

const Header = ({
  bg = "bg-slate-800 border-bg border-b-[0.5px]",
  logoPrimaryColor = "text-text",
}: HeaderProps) => {
  return (
    <nav
      className={`w-screen h-[70px] flex flex-row justify-between items-center ${bg} px-5 ${logoPrimaryColor}}`}
    >
      <div className="flex flex-row items-center gap-1">
        <GiTwoCoins className="text-3xl" />
        <h1 className="text-2xl  font-semibold tracking-wide">
          Trust<span className="text-secondary-600 font-bold">Me</span>
        </h1>
      </div>
      <button type="button" className="outline-none border-none p-0">
        <FiMenu className="text-3xl" />
      </button>
    </nav>
  )
}

export default Header
