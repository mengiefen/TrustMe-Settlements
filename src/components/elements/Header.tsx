import Image from "next/image"
import React from "react"
import { FiMenu } from "react-icons/fi"
import { GiTwoCoins } from "react-icons/gi"

const Header = () => {
  return (
    <nav className="w-screen h-[70px] flex flex-row justify-between items-center bg-slate-800 px-5 border-b-[0.5px] border-bg">
      <div className="flex flex-row items-center gap-1">
        <GiTwoCoins className="text-3xl" />
        <h1 className="text-2xl text-text font-semibold tracking-wide">
          Trust<span className="text-secondary-500 font-bold">Me</span>
        </h1>
      </div>

      <button type="button" className="outline-none border-none p-0">
        <FiMenu className="text-text text-3xl" />
      </button>
    </nav>
  )
}

export default Header
