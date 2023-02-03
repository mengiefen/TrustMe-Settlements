import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { getFormatAddress } from "@/utils"
import { FaCaretDown } from "react-icons/fa"
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi"
import React, { useState } from "react"
import { connectWallet, disconnectWallet } from "@/redux/wallet/walletSlice"

const HeaderDropDown = () => {
  const { address, connected, buttonText } = useSelector((state: RootState) => state.wallets)
  const { disconnect } = useDisconnect()
  const { connectAsync, connectors } = useConnect({})
  const { data } = useBalance({ address })

  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch()

  const handleDisconnect = (e: React.SyntheticEvent) => {
    e.preventDefault()
    disconnect()
    setShowMenu(false)
    sessionStorage.removeItem("persist:trustMe")
    dispatch(disconnectWallet())
  }

  const handleConnect = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const connector = connectors[0]
    const res = await connectAsync({ connector })
    await dispatch(connectWallet(res.account))
    setShowMenu(false)
  }

  return (
    <div className="relative">
      <button
        className="inline-flex items-center md:px-2 min-w-[220px]
        lg:px-2 py-3 mb-3 font-medium text-center text-white 
        bg-gradient-to-r from-purplish-800 to-secondary-800
         md:mb-0 hover:bg-blue-800 focus:ring-4 focus:outline-none
        focus:ring-secondary-300 justify-end"
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        style={{
          fontSize: connected ? "0.9rem" : "1rem",
        }}
      >
        {connected ? `Connected: ${getFormatAddress(address)}` : "Connect Your Wallet"}
        <FaCaretDown className="ml-2" />
      </button>

      <div
        className="py-2 border border-gray-700 shadow-2xl shadow-secondary-500 w-full bg-menu-dark z-100 absolute mt-2"
        style={{ display: showMenu ? "block" : "none" }}
      >
        {connected && (
          <ul className="py-2 text-text-dark bg-transparent">
            <li className="block hover:bg-bg-light hover:text-secondary-400 p-2 px-4">
              Balance:{"  "}
              {`${data?.formatted.substring(0, 6)} ${data?.symbol}`}
            </li>
          </ul>
        )}

        <div className="py-2">
          {!connected ? (
            <a
              href="#"
              className="text-secondary-300 block px-4 py-2 hover:bg-bg-light hover:text-secondary-600 py-2"
              onClick={(e) => handleConnect(e)}
            >
              Connect Wallet
            </a>
          ) : (
            <a
              href="#"
              className="text-red-300 block px-4 py-2 hover:bg-bg-light hover:text-red-600 py-2"
              onClick={(e) => handleDisconnect(e)}
            >
              Disconnect Wallet
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderDropDown
