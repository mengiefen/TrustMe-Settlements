import "@/styles/globals.css"
import type { AppProps } from "next/app"
import WagmiProvider from "../connector/connect"
import StoreProvider from "@/redux/StoreProvider"
import { useContractEvent } from "wagmi"
import trustMeContractABI from "../constants/abi.json"

const App = ({ Component, pageProps }: AppProps) => {
  useContractEvent({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    eventName: "TradeCreated",
    abi: trustMeContractABI,
    listener: (event) => {
      alert("Trade created!")
    },
  })

  useContractEvent({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    eventName: "TradeExpired",
    abi: trustMeContractABI,
    listener: (event) => {
      alert("Trade Expired!")
    },
  })

  return (
    <main className="font-poppins">
      <StoreProvider>
        <WagmiProvider>
          <Component {...pageProps} />
        </WagmiProvider>
      </StoreProvider>
    </main>
  )
}

export default App
