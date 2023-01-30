import React, { useEffect, useState } from 'react'
import DetailsCard from '@/components/elements/DetailsCard';
import {HiOutlineLogout} from 'react-icons/hi';
import {GrTransaction} from 'react-icons/gr';
import Button from '@/components/elements/Button';
import {BsArrowDown, BsArrowUp} from 'react-icons/bs';
import { getTrade } from '@/helpers/getterHelpers';
import { BigNumber, ethers } from 'ethers';
import { ERC20_ABI, signer } from '@/constants/interact';
import {useToken} from 'wagmi'
import {getSymbol} from '../utils/index'

type Trade = {
  id: number
  seller: string
  buyer: string
  tokenToSell: string
  tokenToBuy: string
  amountOfTokenToSell: number
  amountOfTokenToBuy: number
  deadline: number
  status: string
}

type TransactionDetailProps = {
  tradeId : number
}

const TransactionDetail = (props: TransactionDetailProps) => {

  const [currentTrade, setCurrentTrade] = useState({}) as any
  let symbolBuyToken:string;
  let symbolSelltoken:string;

  const fetchTrade = async (id:number) => {
    const trade = await getTrade(id);
    const tradeObj : Trade = {
      id : Number(trade.id),
      seller : trade.seller.toString(),
      buyer : trade.buyer.toString(),
      tokenToSell: await getSymbol(trade.tokenToSell),
      tokenToBuy: await getSymbol(trade.tokenToBuy),
      amountOfTokenToSell: Number(trade.amountOfTokenToSell),
      amountOfTokenToBuy: Number(trade.amountOfTokenToBuy),
      status: (trade.status == 0) ? "Pending" : (trade.status == 1) ? "Confirmed" : 
      (trade.status == 2) ?"Cancled": (trade.status == 3) ? "Expired" : "Withdrawn",
      deadline : Number(trade.deadline)
    } 
    return tradeObj;
  }


  useEffect(() => {
    fetchTrade(0).then((trade) =>{
      setCurrentTrade(trade)
    })
    // fetchSymbol()
  },[])

  // const fetchSymbol = async() => {
  //   symbolBuyToken =  await getSymbol(currentTrade.tokenToBuy)
  //   symbolSelltoken = await getSymbol(currentTrade.tokenToSell)
  // }


  return (
    <div className=' w-screen flex flex-col bg-white items-center pt-5'>
      <div className='w-screen flex flex-row items-center justify-between px-6 mb-5'>

        <div className='flex flex-row items-center justify-between'>
          <GrTransaction  className='mx-2 text-sm'/>
          <p className='text-light text-xs'>{currentTrade.id}</p>
        </div>

        <Button label='' onClick={()=>{}}>
          <span className='flex flex-row items-center'>disconnect 
            <span className='pl-[5px]'>
              <HiOutlineLogout/>
            </span>
          </span>
        </Button>
      </div>

      <DetailsCard address={currentTrade.seller} amount={currentTrade.amountOfTokenToSell} symbol={currentTrade.tokenToSell}/>
      <div>
        <span className='text-xl h-[20px]'>
          <BsArrowDown/>
        </span>
      </div>
      <div className='flex w-[90px] h-[32px] bg-yellow-300 rounded-md items-center justify-center'>
        <span className=''>{currentTrade.status}</span>
      </div>
      <div>
        <span className='text-xl h-[20px]'>
          <BsArrowUp/>
        </span>
      </div>
      <DetailsCard address={currentTrade.buyer} amount={currentTrade.amountOfTokenToBuy} symbol={currentTrade.tokenToBuy}/>

      <div className='mt-5'>
        <Button label='approve' size='medium' onClick={()=>{}}>
        </Button>
      </div>
    </div>
  )
}

export default TransactionDetail