import Link from 'next/link'
import React from 'react'
import Button from './Button'
import {AiOutlineClose} from 'react-icons/ai';

type menuProps = {
  isactive:boolean
  showmenu:() => (void)
}

const MobileMenu = (props : menuProps) => {

  const {showmenu, isactive} = props;

  return (
    <div className={ 
      isactive ?'w-screen h-screen flex flex-col bg-black bg-opacity-50 items-center justify-start pt-10'
      : 'hidden'
      }
    >
      <div className='flex flex-col bg-black w-11/12 px-[60px] py-5'>

        <div className='flex flex-row justify-end'>
            <ul className='flex flex-col items-end justify-end'>
              <li className='py-1'>
                <Link href='/' className='py-2 text-white text-base'>
                  Home
                </Link>
              </li>
              <li className='py-1'>
                <Link href='/' className='py-2 text-white text-base'>
                  Services
                </Link>
              </li>
              <li className='py-1'>
                <Link href='/' className='py-2 text-white text-base'>
                  About us
                </Link>
              </li>
              <li className='py-1'>
                <Link href='/' className='py-2 text-white text-base'>
                  Contact us
                </Link>
              </li>
              <li className='py-1'>
                <Link href='/1' className='py-2 text-white text-base'>
                  Transactions
                </Link>
              </li>
            </ul>
        </div>

        <div className='btn-div items-center justify-center pl-8 my-5'>
          <Button label='Connect Wallet' onClick={() => {}}></Button>

          <div className=' flex flex-row address pt-10'>
            <small className='flex flex-row text-white'>
              Connected To 
              <span className=' pl-1 pt-[1px]'>&#8208;</span> 
            </small>
          </div>

        </div>

      </div>
    </div>
  )
}

export default MobileMenu