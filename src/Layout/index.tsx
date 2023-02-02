import React, { ReactComponentElement, ReactElement, useState } from "react"
import Header from "@/components/elements/Header"
import Footer from "@/components/elements/Footer"
import { useRouter } from "next/router"
import FlashMessage from "@/components/FlashMessage"
import { trustMeContract } from "@/helpers/getterHelpers"
import TrustMeContractAbi from "@/constants/abi.json"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

type LayoutProps = {
  children: ReactElement<any> | ReactComponentElement<any>
  bg?: string
  logoPrimaryColor?: string
}
const Layout = (props: LayoutProps) => {
  const [tradeCreated, setTradeCreated] = useState({
    isTradeCreated: false,
    tradeId: 0,
    buyer: "",
    seller: "",
  })

  const [tradeExpired, setTradeExpired] = useState({
    isTradeExpired: false,
    tradeId: 0,
    buyer: "",
    seller: "",
  })

  const {
    buttonText,
    address: userAddress,
    connected,
  } = useSelector((state: RootState) => state.wallets)

  const isUsersAvailableEvent = (addressSeller : string, addressBuyer : string, connectedAddress: string) => {
    if(addressSeller.length === 0 || addressBuyer.length === 0) return false
    if(addressSeller === connectedAddress || addressBuyer === connectedAddress) return true
    return false
  }

  // events
  ;(async () => {
    const _trustMeContract = await trustMeContract()
    _trustMeContract.on("TradeCreated", (tradeId, buyer, seller) => {
      console.log("TradeCreated", tradeId, buyer, seller)
      setTradeCreated({
        isTradeCreated: true,
        tradeId: tradeId,
        buyer: buyer,
        seller: seller,
      })
    })
  })()
  ;(async () => {
    const _trustMeContract = await trustMeContract()
    _trustMeContract.on("TradeExpired", (tradeId, buyer, seller) => {
      console.log("TradeExpired", tradeId, buyer, seller)
      setTradeExpired({
        isTradeExpired: true,
        tradeId: tradeId,
        buyer: buyer,
        seller: seller,
      })
    })
  })()

  const router = useRouter()
  const pathname = router.pathname
  const background = pathname !== "/" ? `bg-text${props.bg}` : ""
  const logoColor = pathname !== "/" ? `text-bg${props.logoPrimaryColor}` : ""

  return (
    <main
      className={`${
        router.pathname === "/" ? "bg-bg text-text" : "bg-text text-bg"
      } flex flex-col justify-between items-center overflow-hidden w-screen
       md:px-10 lg:px-20`}
    >
      {tradeCreated.isTradeCreated && isUsersAvailableEvent(tradeCreated.seller, tradeCreated.buyer, userAddress) && <FlashMessage message="Trade created!" type="success" />}
      {tradeExpired.isTradeExpired && isUsersAvailableEvent(tradeCreated.seller, tradeCreated.buyer, userAddress) && <FlashMessage message="Trade expired!" type="error" />}
      <Header bg={background} logoPrimaryColor={logoColor} />
      {props.children}
      {router.pathname === "/" && <Footer />}
    </main>
  )
}

export default Layout
