import React, { ReactComponentElement, ReactElement, useEffect, useState } from "react"
import Header from "@/components/elements/Header"
import Footer from "@/components/elements/Footer"
import { useRouter } from "next/router"
import { trustMeContract } from "../constants/interact"
import FlashMessage from "@/components/FlashMessage"
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
    tradeId: "",
    buyer: "",
    seller: "",
  })

  const [tradeExpired, setTradeExpired] = useState({
    isTradeExpired: false,
    tradeId: "",
    buyer: "",
    seller: "",
  })

  const {
    buttonText,
    address: userAddress,
    connected,
  } = useSelector((state: RootState) => state.wallets)

  const isReleavant = (add_seller : string, add_buyer : string, userConnected: string) => {
    if(add_seller.length === 0 || add_buyer.length === 0) return false
    if(add_seller === userConnected || add_buyer === userConnected) return true
    return false
  }

  useEffect(() => {
    trustMeContract.on("TradeCreated", (tradeId, buyer, seller) => {
      setTradeCreated({
        isTradeCreated: true,
        tradeId: tradeId,
        buyer: buyer,
        seller: seller,
      })
    })

    trustMeContract.on("TradeExpired", (tradeId, buyer, seller) => {
      setTradeExpired({
        isTradeExpired: true,
        tradeId: tradeId,
        buyer: buyer,
        seller: seller,
      })
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
      } flex flex-col justify-between items-center overflow-hidden w-screen
       md:px-10 lg:px-20`}
    >
      {tradeCreated.isTradeCreated && isReleavant(tradeCreated.seller, tradeCreated.buyer, userAddress) && <FlashMessage message="Trade created!" type="success" />}
      {tradeExpired.isTradeExpired && isReleavant(tradeCreated.seller, tradeCreated.buyer, userAddress) && <FlashMessage message="Trade expired!" type="error" />}
      <Header bg={background} logoPrimaryColor={logoColor} />
      {props.children}
      {router.pathname === "/" && <Footer />}
    </main>
  )
}

export default Layout
