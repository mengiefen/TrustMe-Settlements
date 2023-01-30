import React from "react"
import { CgArrowsExchangeAlt } from "react-icons/cg"
import { BsLink, BsPlus, BsPlusCircle } from "react-icons/bs"
import { MdLogout } from "react-icons/md"
import { AiFillPlusCircle } from "react-icons/ai"
import Button from "../elements/Button"
import { UserDetailProps } from "./type"

const UserDetail = (props: UserDetailProps) => {
  return (
    <div className="flex flex-row justify-between items-center mt-3">
      <div className="flex flex-col gap-5 shadow-md  shadow-gray-300 p-3 rounded bg-text border-[0.2px] border-gray-300">
        <div className="flex flex-row gap-5">
          <CgArrowsExchangeAlt className="text-2xl text-secondary-900" />
          <div className="flex flex-col gap-2">
            <h3 className="text-bg-light">Connected Address</h3>
            <h4 className="text-sm text-secondary-800 tracking-wider">{props.userAddress}</h4>
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center">
          <BsLink className="text-2xl text-secondary-900" />
          <h3 className="text-bg-light">
            Transactions - <span>{props.transactionCount}</span>
          </h3>
        </div>
      </div>

      {/* <Button
        label="Exit"
        variant="tertiary"
        bg="bg-red-400 flex flex-row gap-2 items-center justify-center px-1 py-3"
        onClick={() => {}}
      >
        <MdLogout className="text-xl" />
      </Button> */}
      <div className="flex flex-col gap-2 justify-end items-center mt-auto">
        <button
          type="button"
          className="w-[70px] h-[70px] rounded-full p-[3px] bg-secondary-800 text-white outline-none border-none hover:outline-none hover:bg-none focus:outline-none focus:bg-none flex flex-col items-center justify-center"
        >
          <BsPlus className="text-5xl" />
        </button>
        <span className="font-semibold tracking-wide uppercase">Create Trade</span>
      </div>
    </div>
  )
}

export default UserDetail
