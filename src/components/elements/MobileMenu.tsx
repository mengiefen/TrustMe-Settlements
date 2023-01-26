import React from 'react'
import Button from './Button'

const MobileMenu = () => {
  return (
    <div className='w-screen h-screen flex flex-col bg-black bg-opacity-50 items-center justify-start pt-10 z-10'>

      <div className='flex flex-col bg-black w-11/12 px-[60px] py-5'>

        <div className='flex flex-row justify-end'>
          <div className='flex flex-col items-end justify-end'>
            <a className='py-2'>
              <h3 className='text-white'>Home</h3>
            </a>
            <a className='py-2'>
              <h3 className='text-white'>Services</h3>
            </a>
            <a className='py-2'>
              <h3 className='text-white'>Contact us</h3>
            </a>
            <a className='py-2'>
              <h3 className='text-white'>About us</h3>
            </a>
            <a className='py-2'>
              <h3 className='text-white'>Transactions</h3>
            </a>
          </div>
        </div>

        <div className='btn-div items-center justify-center pl-8 mt-5'>
          <Button label='Connect Wallet' onClick={() => {}}></Button>

          <div className=' flex flex-row address pt-5'>
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