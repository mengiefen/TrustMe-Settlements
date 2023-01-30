import React, { useEffect } from "react"
import Image from "next/image"
import HeroImage from "../../assets/9.png"
import Button from "../elements/Button"
import { useAccount, useConnect, useDisconnect, Connector } from "wagmi"
import { InjectedConnector } from "@wagmi/core"
import { useFormatAddress, useEthereum } from "@/hooks/hooks"
import { useIsMounted } from "@/hooks/useIsMounted"
import FlashMessage from "../FlashMessage"

const Hero = () => {
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()

  const { disconnect } = useDisconnect()
  const [buttonText, setButtonText] = React.useState("Connect Wallet")
  const [flash, setFlash] = React.useState({
    message: "",
    type: "",
  })

  const formattedAddress = useFormatAddress(address || "")

  const { connectAsync, connectors } = useConnect({
    connector: new InjectedConnector(),
  })

  const handleConnect = async (connector: Connector) => {
    if (isMounted) {
      await connectAsync({ connector })
      setFlash({ ...flash, message: "You successfully connected to Metamask", type: "success" })
      setButtonText("Disconnect Wallet")
    } else {
      setFlash({ ...flash, message: "Please install Metamask", type: "alert" })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setButtonText("Connect Wallet")
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
          <div className="flex items-center justify-center w-[80%] mt-5 flex-wrap gap-3">
            {connectors.map((connector) => {
              return (
                <button
                  onClick={() => handleConnect(connector)}
                  key={connector.id}
                  className="bg-bg p-2 rounded-md text-text border border-white"
                >
                  {connector.name}
                </button>
              )
            })}

            <button
              onClick={() => handleDisconnect()}
              className="bg-bg p-2 rounded-md text-text border border-white"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero
