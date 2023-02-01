import React, { ReactComponentElement, ReactElement, useEffect } from "react"
import Header from "@/components/elements/Header"
import Footer from "@/components/elements/Footer"
import { useRouter } from "next/router"
import trustMeContractABI from "../constants/abi.json"
import { useContractEvent } from "wagmi"
import { alchemy } from "../connector/mainnet_connect"
import { utils } from "ethers"
import { trustMeContract } from "../constants/interact"

type LayoutProps = {
  children: ReactElement<any> | ReactComponentElement<any>
  bg?: string
  logoPrimaryColor?: string
}
const Layout = (props: LayoutProps) => {
  // useContractEvent({
  //   address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  //   eventName: "TradeCreated",
  //   abi: trustMeContractABI,
  //   listener: (event) => {
  //     alert("Trade created!")
  //   },
  // })

  // useContractEvent({
  //   address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  //   eventName: "TradeExpired",
  //   abi: trustMeContractABI,
  //   listener(node, label, owner) {
  //     alert("Trade Expired!")
  //   },
  // })

  useEffect(() => {
    // alchemy.ws.on(
    //   {
    //     address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    //     topics: [utils.id("TradeCreated(uint256,address,address)")],
    //   },
    //   () => {
    //     alert("Trade created!")
    //   }
    // )

    // alchemy.ws.on(
    //   {
    //     address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    //     topics: [utils.id("TradeExpired(uint256,address,address)")],
    //   },
    //   () => {
    //     alert("Trade Expired!")
    //   }
    // )

    trustMeContract.on("TradeCreated", (tradeId, buyer, seller) => {
      alert("Trade created!")
      console.log(tradeId, buyer, seller)
    })
  }, [])

  const router = useRouter()
  const pathname = router.pathname
  const background = pathname !== "/" ? `bg-text${props.bg}` : ""
  const logoColor = pathname !== "/" ? `text-bg${props.logoPrimaryColor}` : ""
  return (
    <main
      className={`${
        router.pathname === "/" ? "bg-bg text-text" : "bg-text text-bg"
      } flex flex-col justify-between items-center overflow-hidden w-screen md:px-10 lg:px-20`}
    >
      <Header bg={background} logoPrimaryColor={logoColor} />
      {props.children}
      {router.pathname === "/" && <Footer />}
    </main>
  )
}

export default Layout
