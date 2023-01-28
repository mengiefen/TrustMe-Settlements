import FlashMessage from "@/components/elements/FlashMessage"
import React, { useState, useEffect, useRef } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])
  return windowWidth
}

export const useEthereum = () => {
  const [ethereum, setEthereum] = useState(false)

  useEffect(() => {
    if (window.ethereum) {
      setEthereum(true)
    }
  }, [])

  return ethereum
}

export const useFormatAddress = (address: string) => {
  return address.slice(0, 4) + "..." + address.slice(-3)
}

const useConnectWallet = () => {}

const useDisconnectWallet = () => {
  const { disconnect } = useDisconnect()
}
