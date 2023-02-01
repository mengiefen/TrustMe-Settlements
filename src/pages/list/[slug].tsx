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
    const tradeObj : Trade = {
      id : Number(trade.id),
      status: (trade.status == 0) ? "Pending" : (trade.status == 1) ? "Confirmed" : 
      (trade.status == 2) ?"Cancled": (trade.status == 3) ? "Expired" : "Withdrawn",
      seller :  useFormatAddress(trade.seller.toString()),
      buyer : useFormatAddress(trade.buyer.toString()),
      deadline : useFormatDate(Number(trade.deadline)),
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
      <div className='flex flex-col items-center justify-center px-6 md:py-5'>
        <div className='flex flex-row items-center justify-start w-full pt-10 pb-2 md:py-5'>
          <h3 className='text-dark mx-1 font-semibold text-secondary-900 font-roboto'>
            Transaction Detail
          </h3>
        </div>
        <div className='grid grid-cols-1 w-full gap-x-2 gap-y-2 place-content-stretch md:grid-cols-4 md:gap-x-5'>

          <div className='flex flex-row w-full h-[55px] md:flex-col md:h-[200px]'>
            <div className='flex flex-row items-center justify-between w-1/2 pr-2 md:w-full md:h-1/2'>
              <InfoCard label={"TRANSACTION ID"} value={currentTrade.id}/>
            </div>
            <div className='flex flex-row items-center justify-between w-1/2 md:mt-2 md:w-full md:h-1/2'>
              <InfoCard label={"TXN STATUS"} value={currentTrade.status}/>
            </div>
          </div>

          <div className='flex flex-row w-full h-[55px] md:flex-col md:h-[200px]'>
            <div className='flex flex-row items-center justify-between w-1/2 pr-2 md:w-full md:h-1/2'>
              <InfoCard label={"YOUR ADDRESS"} value={currentTrade.seller}/>
            </div>
            <div className='flex flex-row items-center justify-between w-1/2 md:mt-2 md:w-full md:h-1/2'>
              <InfoCard label={"CP ADDRESS"} value={currentTrade.buyer}/>
            </div>
          </div>

          <div className='flex flex-row w-full h-[55px] md:flex-col md:h-[200px]'>
            <div className='flex flex-row items-center justify-between w-1/2 pr-2 md:w-full md:h-1/2'>
              <InfoCard label={"DATE CREATED"} value={currentTrade.deadline}/>
            </div>
            <div className='flex flex-row items-center justify-between w-1/2 md:mt-2 md:w-full md:h-1/2'>
              <InfoCard label={"EXPIRY DATE"} value={currentTrade.deadline}/>
            </div>
          </div>

          <div className='flex flex-row w-full h-[55px] md:flex-col md:h-[200px]'>
            <div className='flex flex-row items-center justify-between w-1/2 pr-2 md:w-full md:h-1/2'>
              <InfoCard label={"TOKEN TO TRANSFER"} value={`${currentTrade.tokenToSell} ${currentTrade.amountOfTokenToSell} `}/>
            </div>
            <div className='flex flex-row items-center justify-between w-1/2 md:mt-2 md:w-full md:h-1/2'>
              <InfoCard label={"TOKEN TO RECEIVE"} value={`${currentTrade.tokenToBuy}  ${currentTrade.amountOfTokenToBuy}`}/>
            </div>
          </div>

        </div>

        <div className='flex flex-col items-center justify-end pt-5'>
          <div className='flex items-center justify-center w-full h-11/12 py-10 px-10'>
            {/* <Spinner/> */}
          </div>
          <div className='flex flex-row items-center'>
            <div className='px-2'>
              <Button label='Cancle' buttonType='submit' size='medium' bg='bg-red-600'/>
            </div>
            <div className='px-2'>
              <Button label='Reject' variant='tertiary' buttonType='submit' size='medium' bg='bg-bg' />
            </div>
            <div className='px-2'> 
              <Button label='Withdraw' buttonType='submit' size='medium' bg='bg-bg'/>
            </div>
          </div>
          <div className='flex flex-row w-full items-center justify-center px-2 mt-3'>
            <button className=' flex flex-row w-full bg-secondary-900 items-center justify-center rounded-sm h-[40px]'>
              <BiTransfer/>
              <span className='text-white px-2 font-medium '>
                Transfer
              </span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TransactionDetail
