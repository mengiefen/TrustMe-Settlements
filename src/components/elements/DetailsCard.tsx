import React from 'react'
import {BsLink, BsCurrencyDollar} from 'react-icons/bs';
import {RiExchangeDollarLine} from 'react-icons/ri';

type DetailsCardProps = {
  address: string
  amount: number
  symbol: any
}

const DetailsCard = (props :DetailsCardProps) => {
  return (
      <div className='w-11/12 h-[175px] bg-text py-3 border-[1px] border-slate-850 rounded-md'>

        <div className='flex flex-row justify-start items-center'>
          <BsLink className='mx-2 text-xl'/>
          <h5 className='text-dark'> Connected address </h5>
        </div>

        <div className='flex flex-row pl-9'>
          <span className='text-light text-xs mt-[4px]'>{props.address}</span>
        </div>

        <div className='flex flex-row items-center mt-5'>
          <RiExchangeDollarLine className='mx-2'/>
          <h5 className='text-dark ml-1'> Token </h5>
          <span className='ml-4 text-xl justify-center pt-[2px]'>&#45;</span>
          <span className='text-xs pt-[2px] ml-4'> {props.amount} {props.symbol}</span>
        </div>

      </div>
  )
}

export default DetailsCard