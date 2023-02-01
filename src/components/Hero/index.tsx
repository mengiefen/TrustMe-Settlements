import React, { useEffect } from "react"
import Image from "next/image"
import HeroImage from "../../assets/9.png"
import Button from "../elements/Button"
import {
  useAccount,
  useConnect,
  useDisconnect,
  Connector,
  useWebSocketProvider,
  useContractEvent,
} from "wagmi"
import { useFormatAddress } from "@/hooks/hooks"
import { useIsMounted } from "@/hooks/useIsMounted"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { connectWallet, disconnectWallet } from "@/redux/wallet/walletSlice"
import ensRegistryABI from "./ab.json"

const Hero = () => {
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      // update the store with this state variables
      console.log("Connected", { address, connector, isReconnected })
    },

    onDisconnect() {
      //Update the store with this event
      console.log("Disconnected")
    },
  })

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

  const { connectAsync, connectors, data } = useConnect({
    onSuccess(data) {
      console.log("Connected", data)
    },

    onSettled(data, error) {
      console.log("Settled", { data, error })
    },

    onMutate(connector) {
      console.log("Before connect", connector)
    },

    onError(error) {
      console.log("Error", error)
    },
  })

  const webSocketProvider = useWebSocketProvider({
    chainId: 5,
  })

  console.log(webSocketProvider)

  useContractEvent({
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    abi: ensRegistryABI,
    eventName: "Transfer",
    listener(node, label, owner) {
      console.log(node, label, owner)
    },
  })

  const handleConnect = async (connector: Connector) => {
    if (isMounted) {
      const data = await connectAsync({ connector })
      await dispatch(connectWallet(data.account))
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
    <div className="flex flex-col items-center justify-around mb-12 lg:min-h-screen md:py-5">
      <div
        className="flex flex-col md:flex-row-reverse items-center justify-center w-[80%]
                       mb-5 md:gap-5 lg:gap-10 md:w-[90%]"
      >
        <div className="sm:max-w-[70%] lg:max-w-[55%] md:h-full md:my-auto">
          <Image src={HeroImage} alt="Hero Image" />
        </div>

        <div className="lg:max-w-[45%] md:max-w[55%] flex flex-col gap-3 md:gap-5">
          <h1
            className="text-3xl font-semibold text-center text-text my-5 tracking-widest 
                      md:tracking-wider md:text-4xl lg:text-5xl md:gap-10"
          >
            Settle your Trade with Trust
            <span className="font-bold text-secondary-500 ">Me</span>
          </h1>
          <p className="text-center text-text font-light leading-6 md:text-lg md:font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel
            tincidunt luctus, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet lorem.
          </p>

          {isMounted && (
            <div className="mt-5 flex flex-col justify-center items-center md:mt-10">
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
                bg="bg-gradient-to-r from-purplish-800 to-secondary-800 md:py-4 md:px-20 md:text-lg md:tracking-widest"
              />

              <div className="flex flex-col items-center justify-center w-[80%] mt-5">
                <p className="text-center text-text font-light leading-6 md:tracking-wider md:text-lg md:font-bold">
                  {formattedAddress}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero

// const useConnectAndUpdateStore = () => {
//   const account = useAccount({
//   	onConnect({address, connector, isConnected}){
//   		console.log(connected, {address, connector, isReconnected});
//   	}

//   	onDisconnect() {
//   		console.log(disconnected)
//   	}
//   })

// }
