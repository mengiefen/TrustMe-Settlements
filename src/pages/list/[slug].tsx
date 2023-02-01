import React, { useEffect, useState } from "react"
import Button from "@/components/elements/Button"
import { getTrade } from "@/helpers/getterHelpers"
import { getSymbol } from "../../utils/index"
import router from "next/router"
import Layout from "@/Layout"
import { formatEther } from "ethers/lib/utils.js"
import { BiTransfer } from "react-icons/bi"
import InfoCard from "../TxnDetails/InfoCard"
import { useFormatAddress, useFormatDate } from "@/hooks/hooks"

type Trade = {
  id: number
  seller: string
  buyer: string
  tokenToSell: string
  tokenToBuy: string
  amountOfTokenToSell: string
  amountOfTokenToBuy: string
  deadline: string
  status: string
}

type TransactionDetailProps = {
  tradeId: number
}

const TransactionDetail = (props: TransactionDetailProps) => {
  const [currentTrade, setCurrentTrade] = useState({}) as any

  const fetchTrade = async (id: number) => {
    const trade = await getTrade(id)
    const tradeObj: Trade = {
      id: Number(trade.id),
      status:
        trade.status == 0
          ? "Pending"
          : trade.status == 1
          ? "Confirmed"
          : trade.status == 2
          ? "Cancelled"
          : trade.status == 3
          ? "Expired"
          : "Withdrawn",
      seller: useFormatAddress(trade.seller.toString()),
      buyer: useFormatAddress(trade.buyer.toString()),
      deadline: useFormatDate(Number(trade.deadline)),
      amountOfTokenToSell: formatEther(trade.amountOfTokenToSell),
      amountOfTokenToBuy: formatEther(trade.amountOfTokenToBuy),
      tokenToSell: await getSymbol(trade.tokenToSell),
      tokenToBuy: await getSymbol(trade.tokenToBuy),
    }
    return tradeObj
  }

  useEffect(() => {
    const slug: number = parseInt(router.query.slug as string)

    fetchTrade(slug).then((trade) => {
      setCurrentTrade(trade)
    })
  }, [])

  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-row items-center justify-start w-screenpt-10 pb-2 md:py-5">
          <h3 className="text-dark mx-1 font-semibold text-secondary-900 md:text-2xl">
            Transaction Detail
          </h3>
        </div>
        <div className="grid grid-cols-1 w-full gap-x-2 gap-y-2 md:grid-cols-4 md:gap-x-5">
          <div className="flex flex-row w-full h-[55px] md:flex-col md:h-[200px]">
            <div className="flex flex-row items-center justify-between w-1/2 pr-2 md:w-full md:h-1/2">
              <InfoCard label={"TRANSACTION ID"} value={currentTrade.id} />
            </div>
            <div className="flex flex-row items-center justify-between w-1/2 md:mt-2 md:w-full md:h-1/2">
              <InfoCard label={"TXN STATUS"} value={currentTrade.status} />
            </div>
          </div>

          <div className="flex flex-row w-full h-[55px] md:flex-col md:h-[200px]">
            <div className="flex flex-row items-center justify-between w-1/2 pr-2 md:w-full md:h-1/2">
              <InfoCard label={"YOUR ADDRESS"} value={currentTrade.seller} />
            </div>
            <div className="flex flex-row items-center justify-between w-1/2 md:mt-2 md:w-full md:h-1/2">
              <InfoCard label={"CP ADDRESS"} value={currentTrade.buyer} />
            </div>
          </div>

          <div className="flex flex-row w-full h-[55px] md:flex-col md:h-[200px]">
            <div className="flex flex-row items-center justify-between w-1/2 pr-2 md:w-full md:h-1/2">
              <InfoCard label={"DATE CREATED"} value={currentTrade.deadline} />
            </div>
            <div className="flex flex-row items-center justify-between w-1/2 md:mt-2 md:w-full md:h-1/2">
              <InfoCard label={"EXPIRY DATE"} value={currentTrade.deadline} />
            </div>
          </div>

          <div className="flex flex-row w-full h-[55px] md:flex-col md:h-[200px]">
            <div className="flex flex-row items-center justify-between w-1/2 pr-2 md:w-full md:h-1/2">
              <InfoCard
                label={"TOKEN TO TRANSFER"}
                value={`${currentTrade.tokenToSell}   ${currentTrade.amountOfTokenToSell} `}
              />
            </div>
            <div className="flex flex-row items-center justify-between w-1/2 md:mt-2 md:w-full md:h-1/2">
              <InfoCard
                label={"TOKEN TO RECEIVE"}
                value={`${currentTrade.tokenToBuy}    ${currentTrade.amountOfTokenToBuy}`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-end pt-5">
          <div className="flex items-center justify-center w-full h-11/12 py-10 px-10">
            {/* <Spinner/> */}
          </div>
          <div className="flex flex-row items-center">
            <div className="px-2">
              <Button
                label="Cancel"
                buttonType="submit"
                size="large"
                bg="bg-red-600 hover:bg-red-500 md:px-10"
              />
            </div>
            <div className="px-2">
              <Button
                label="Reject"
                variant="tertiary"
                buttonType="submit"
                size="large"
                bg="bg-red-600 hover:bg-red-500 md:px-10"
              />
            </div>
            <div className="px-2">
              <Button
                label="Withdraw"
                buttonType="submit"
                size="large"
                bg="bg-bg hover:bg-slate-700 md:px-10"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center px-2 mt-3">
            <Button
              label="Transfer"
              buttonType="submit"
              size="large"
              bg="py-4 px-10 flex gap-2 items-center justify-center bg-secondary-800"
              otherClasses="w-full"
            >
              <BiTransfer className="text-xl text-text" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TransactionDetail
