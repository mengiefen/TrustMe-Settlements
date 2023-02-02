import React, { ReactComponentElement, ReactElement, useState } from "react"
import Header from "@/components/elements/Header"
import Footer from "@/components/elements/Footer"
import { useRouter } from "next/router"
import FlashMessage from "@/components/FlashMessage"
import { trustMeContract } from "@/helpers/getterHelpers"
import { useSelector, useDispatch } from "react-redux"
import {
  updateCreatedTrade,
  updateExpiredTrade,
  updateConfirmedTrade,
  updateCanceledTrade,
  updateWithdrawnTrade,
} from "@/redux/trade/tradesSlice"
import { RootState } from "@/redux/store"
import { fetchTrade } from "@/helpers/fetchTrade"

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
  const [tradeConfirmed, setTradeConfirmed] = useState({
    isTradeConfirmed: false,
    tradeId: 0,
    buyer: "",
    seller: "",
  })
  const [tradeCanceled, setTradeCanceled] = useState({
    isTradeCanceled: false,
    tradeId: 0,
    buyer: "",
    seller: "",
  })
  const [tradeWithdrawn, setTradeWithdraw] = useState({
    isTradeWithdrawn: false,
    tradeId: 0,
    buyer: "",
    seller: "",
  })

  const { address: userAddress } = useSelector((state: RootState) => state.wallets)
  const dispatch = useDispatch()

  // events
  ;(async () => {
    const _trustMeContract = await trustMeContract()
    _trustMeContract.on("TradeCreated", async (tradeId, buyer, seller) => {
      if (buyer == userAddress || seller == userAddress) {
        setTradeCreated({
          isTradeCreated: true,
          tradeId: tradeId,
          buyer: buyer,
          seller: seller,
        })

        // await fetchTrade(Number(tradeId)).then((trade) => {
        //   dispatch(updateCreatedTrade(trade))
        // })
      }
    })
  })()
  ;(async () => {
    const _trustMeContract = await trustMeContract()
    _trustMeContract.on("TradeExpired", (tradeId, buyer, seller) => {
      if (buyer == userAddress || seller == userAddress) {
        setTradeExpired({
          isTradeExpired: true,
          tradeId: tradeId,
          buyer: buyer,
          seller: seller,
        })

        // dispatch(updateExpiredTrade(tradeId))
      }
    })
  })()
  ;(async () => {
    const _trustMeContract = await trustMeContract()
    _trustMeContract.on("TradeConfirmed", (tradeId, buyer, seller) => {
      console.log("TradeConfirmed", tradeId, buyer, seller)
      if (buyer == userAddress || seller == userAddress) {
        setTradeConfirmed({
          isTradeConfirmed: true,
          tradeId: tradeId,
          buyer: buyer,
          seller: seller,
        })

        // dispatch(updateConfirmedTrade(tradeId))
      }
    })
  })()
  ;(async () => {
    const _trustMeContract = await trustMeContract()
    _trustMeContract.on("TradeCanceled", (tradeId, buyer, seller) => {
      console.log("TradeCanceled", tradeId, buyer, seller)
      if (buyer == userAddress || seller == userAddress) {
        setTradeCanceled({
          isTradeCanceled: true,
          tradeId: tradeId,
          buyer: buyer,
          seller: seller,
        })

        // dispatch(updateCanceledTrade(tradeId))
      }
    })
  })()
  ;(async () => {
    const _trustMeContract = await trustMeContract()
    _trustMeContract.on("TradeWithdrawn", (tradeId, buyer, seller) => {
      console.log("TradeWithdrawn", tradeId, buyer, seller)
      if (buyer == userAddress || seller == userAddress) {
        setTradeWithdraw({
          isTradeWithdrawn: true,
          tradeId: tradeId,
          buyer: buyer,
          seller: seller,
        })

        // dispatch(updateWithdrawnTrade(tradeId))
      }
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
      {tradeCreated.isTradeCreated ? (
        <FlashMessage message="Trade created!" type="success" />
      ) : tradeCanceled.isTradeCanceled ? (
        <FlashMessage message="Trade Canceled!" type="error" />
      ) : tradeConfirmed.isTradeConfirmed ? (
        <FlashMessage message="Trade Confirmed!" type="success" />
      ) : tradeExpired.isTradeExpired ? (
        <FlashMessage message="Trade expired!" type="info" />
      ) : tradeWithdrawn.isTradeWithdrawn ? (
        <FlashMessage message="Trade withdrawn!" type="success" />
      ) : null}

      <Header bg={background} logoPrimaryColor={logoColor} />
      {props.children}
      {router.pathname === "/" && <Footer />}
    </main>
  )
}

export default Layout
