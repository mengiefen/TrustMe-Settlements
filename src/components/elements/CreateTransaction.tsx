import React from 'react'
import Tokendrop from '@/components/elements/DropDown/Tokendrop';

const CreateTransaction = () => {
  return (
    <div className='flex items-center justify-center py-5 '>
      <form>
        <div className='w-[310px] h-[470px] bg-text rounded-md flex flex-col border-[1px] px-[15px]'>
          <h3 className='py-5'>Create New Trade</h3>

          <div className='input-fields flex flex-col'>
            <input type='text' className='w-full border-[2px] border-gray-100 rounded-md text-sm py-1 px-2' placeholder='Counter Party Address'></input>
          </div>

          <div className='flex flex-col py-[5px]'>
            <div className='flex flex-row items-center py-1'>
              <input type='text' className='w-7/10 border-[2px] border-gray-100 rounded-md text-sm py-1 px-2' placeholder='Token Amount'></input>
              <Tokendrop/>
            </div>
            <div className='flex flex-row items-center'>
              <input type='text' className='w-7/10 border-[2px] border-gray-100 rounded-md text-sm py-1 px-2' placeholder='CP token Amount'></input>
              <Tokendrop/>
            </div>
          </div>

          <div className='date-time flex flex-row'>
            <div className='w-1/2 h-[32px]'>
              <input className='w-full h-full text-xs pl-2 border-gray-100 rounded-md border-[2px] py-1' type='date'></input>
            </div>
            <div className='w-1/2 h-[32px]'>
              <input className='w-full h-full text-xs pl-2 border-gray-100 rounded-md border-[2px] py-1' type='time'></input>
            </div>
          </div>


          <div className='btn-div mt-[60px]'>
            <button className='w-full h-[30px] bg-secondary-600 rounded-sm'> Create Trade</button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default CreateTransaction