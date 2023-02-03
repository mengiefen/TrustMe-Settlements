import React, { ReactComponentElement, ReactElement, useEffect, useState } from "react"
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
import { BigNumber } from "ethers"
import { useAccount } from "wagmi"
import { connectWallet } from "@/redux/wallet/walletSlice"
import { useIsMounted } from "@/hooks/useIsMounted"

type LayoutProps = {
  children: ReactElement<any> | ReactComponentElement<any>
  bg?: string
  logoPrimaryColor?: string
}
const Layout = (props: LayoutProps) => {
  const { connected } = useSelector((state: RootState) => state.wallets)
  const { address, isConnected } = useAccount()
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

  useEffect(() => {
    if (isConnected) dispatch(connectWallet(address))
  }, [dispatch, address, isConnected])

  const isMounted = useIsMounted()

  if (connected) {
    // events
    ;(async () => {
      const _trustMeContract = await trustMeContract()
      _trustMeContract.on(
        "TradeCreated",
        async (tradeId: BigNumber, buyer: string, seller: string) => {
          if (buyer == userAddress || seller == userAddress) {
            if (!tradeCreated.isTradeCreated) {
              await fetchTrade(address as string, Number(tradeId)).then((trade) => {
                dispatch(updateCreatedTrade(trade))
              })
            }

            setTradeCreated({
              isTradeCreated: true,
              tradeId: Number(tradeId),
              buyer: buyer,
              seller: seller,
            })
          }
        }
      )
      setTimeout(() => {
        setTradeWithdraw({
          isTradeWithdrawn: false,
          tradeId: 0,
          buyer: "",
          seller: "",
        })
      }, 3000)
    })()
    ;(async () => {
      const _trustMeContract = await trustMeContract()
      _trustMeContract.once(
        "TradeExpired",
        (tradeId: BigNumber, buyer: string, seller: string) => {
          if (buyer == userAddress || seller == userAddress) {
            if (!tradeExpired.isTradeExpired) {
              dispatch(updateExpiredTrade(Number(tradeId)))
            }
            setTradeExpired({
              isTradeExpired: true,
              tradeId: Number(tradeId),
              buyer: buyer,
              seller: seller,
            })
          }
        }
      )

      setTimeout(() => {
        setTradeWithdraw({
          isTradeWithdrawn: false,
          tradeId: 0,
          buyer: "",
          seller: "",
        })
      }, 3000)
    })()
    ;(async () => {
      const _trustMeContract = await trustMeContract()
      _trustMeContract.once(
        "TradeConfirmed",
        (tradeId: BigNumber, buyer: string, seller: string) => {
          if (buyer == userAddress || seller == userAddress) {
            if (!tradeConfirmed.isTradeConfirmed) {
              dispatch(updateConfirmedTrade(Number(tradeId)))
            }
            setTradeConfirmed({
              isTradeConfirmed: true,
              tradeId: Number(tradeId),
              buyer: buyer,
              seller: seller,
            })
          }
        }
      )

      setTimeout(() => {
        setTradeWithdraw({
          isTradeWithdrawn: false,
          tradeId: 0,
          buyer: "",
          seller: "",
        })
      }, 3000)
    })()
    ;(async () => {
      const _trustMeContract = await trustMeContract()
      _trustMeContract.once(
        "TradeCanceled",
        (tradeId: BigNumber, buyer: string, seller: string) => {
          if (buyer == userAddress || seller == userAddress) {
            if (!tradeCanceled.isTradeCanceled) {
              dispatch(updateCanceledTrade(Number(tradeId)))
            }
            setTradeCanceled({
              isTradeCanceled: true,
              tradeId: Number(tradeId),
              buyer: buyer,
              seller: seller,
            })
          }
        }
      )

      setTimeout(() => {
        setTradeWithdraw({
          isTradeWithdrawn: false,
          tradeId: 0,
          buyer: "",
          seller: "",
        })
      }, 3000)
    })()
    ;(async () => {
      const _trustMeContract = await trustMeContract()
      _trustMeContract.once(
        "TradeWithdrawn",
        (tradeId: BigNumber, buyer: string, seller: string) => {
          if (!tradeWithdrawn.isTradeWithdrawn) {
            dispatch(updateWithdrawnTrade(Number(tradeId)))
          }
          setTradeWithdraw({
            isTradeWithdrawn: true,
            tradeId: Number(tradeId),
            buyer: buyer,
            seller: seller,
          })
        }
      )

      setTimeout(() => {
        setTradeWithdraw({
          isTradeWithdrawn: false,
          tradeId: 0,
          buyer: "",
          seller: "",
        })
      }, 3000)
    })()
  }

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
