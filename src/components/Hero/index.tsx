import React, { useEffect } from "react"
import Image from "next/image"
import HeroImage from "../../assets/9.png"
import Button from "../elements/Button"
import { useAccount, useConnect, useDisconnect, Connector } from "wagmi"
import { InjectedConnector } from "@wagmi/core"
import { useFormatAddress, useEthereum } from "@/hooks/hook"
import { useIsMounted } from "@/hooks/useIsMounted"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { connectWallet, disconnectWallet } from "@/redux/wallet/walletSlice"
import { fetchTrades } from "@/redux/trade/tradesSlice"


const Hero = () => {
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()
  const {
    buttonText,
    address: userAddress,
    connected,
  } = useSelector((state: RootState) => state.wallets)
  const dispatch = useDispatch()

  const { disconnect } = useDisconnect()

  const [flash, setFlash] = React.useState({
    message: "",
    type: "",
  })

  const formattedAddress = useFormatAddress(userAddress)

  const { connectAsync, connectors } = useConnect({
    connector: new InjectedConnector(),
  })

  const handleConnect = async (connector: Connector) => {
    if (isMounted) {
      const data = await connectAsync({ connector })
      await dispatch(connectWallet(data.account))

      if (data.account) {
        dispatch(fetchTrades(data.account))
      }

      setFlash({ ...flash, message: "You successfully connected to Metamask", type: "success" })
    } else {
      setFlash({ ...flash, message: "Please install Metamask", type: "alert" })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    dispatch(disconnectWallet())
  }

  return (
    <div className="flex flex-col items-center justify-around mb-12">
      <div className="flex flex-col items-center justify-center w-[80%] mb-5">
        <Image src={HeroImage} alt="Hero Image" />
        <h1 className="text-3xl font-semibold text-center text-text my-5 tracking-widest leading-10">
          Settle Your Trade & Trust<span className="font-bold text-secondary-500">Me</span>
        </h1>
        <p className="text-center text-text font-light leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt
          luctus, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nisl
          vel tincidunt luctus.
        </p>
      </div>
      {isMounted && (
        <div>
          <Button
            label={buttonText}
            variant="primary"
            onClick={() => {
              if (isConnected) {
                handleDisconnect()
                return
              }
              handleConnect(connectors[0])
            }}
            size="large"
            bg="bg-gradient-to-r from-purplish-800 to-secondary-800"
          />

          <div className="flex flex-col items-center justify-center w-[80%] mt-5">
            <p className="text-center text-text font-light leading-6">{formattedAddress}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero
