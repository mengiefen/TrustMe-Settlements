import React from 'react'
import TokenData from './Data';
import Image from 'next/image';

const Tokendrop = () => {

  return (
    <div className="inline-block relative w-64">
      <select className="block appearance-none w-full border border-gray-100 px-3 py-[2px] pr-8 rounded ">
        <option>Dai</option>
        <option>Bat</option>
        <option>Tether</option>
        {/* {
          TokenData.map((item) => (
            <div>
              <option className='flex flex-row items-center justify-start text-xm'>
                <small className='text-sm'>{item.Symbol}</small>
              </option>
            </div>
          ))
        } */}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  )
}

export default Tokendrop