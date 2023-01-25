import React from 'react'
import DetailsCard from '@/components/elements/DetailsCard';
import {HiOutlineLogout} from 'react-icons/hi';
import {GrTransaction} from 'react-icons/gr';
import Button from '@/components/elements/Button';
import arrow_svg from '@/assets/arrow_svg.svg';
import Image from 'next/image';
import {BsArrowDown, BsArrowUp} from 'react-icons/bs';

const TransactionDetail = () => {
  return (
    <div className=' w-screen flex flex-col bg-white items-center pt-5'>
      <div className='w-screen flex flex-row items-center justify-between px-6 mb-5'>

        <div className='flex flex-row items-center justify-between'>
          <GrTransaction  className='mx-2 text-sm'/>
          <p className='text-light text-xs'>0x98ehbn......798y3uh</p>
        </div>

        <Button label='' onClick={()=>{}}>
          <span className='flex flex-row items-center'>disconnect 
            <span className='pl-[5px]'>
              <HiOutlineLogout/>
            </span>
          </span>
        </Button>
      </div>

      <DetailsCard/>
      <div>
        <span className='text-xl h-[20px]'>
          <BsArrowDown/>
        </span>
      </div>
      <div className='flex w-[90px] h-[32px] bg-yellow-300 rounded-md items-center justify-center'>
        <span className=''>Pending</span>
      </div>
      <div>
        <span className='text-xl h-[20px]'>
          <BsArrowUp/>
        </span>
      </div>
      <DetailsCard/>

      <div className='mt-5'>
        <Button label='approve' size='medium' onClick={()=>{}}>
        </Button>
      </div>
    </div>
  )
}

export default TransactionDetail