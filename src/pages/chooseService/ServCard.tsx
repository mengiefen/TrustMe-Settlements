import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

type serviceCardProps = {
  title : string
  description : string
}

const ServCard = (props:serviceCardProps) => {

  const {title, description} = props

  return (
    <div 
    className='flex flex-col justify-between bg-opacity-25
  bg-black rounded-md w-full h-1/3 px-3 py-3 my-2 border-b-2
  border-secondary-200 md:mx-[10px] md:h-[200px] md:w-1/3 hover:bg-opacity-50'>
      <div className='flex flex-row items-center justify-between'>
          <h5 className='text-white font-normal text-lg'>
          {title}
          </h5>
          <BsArrowRight className='text-white pt-[2px] text-xl mx-[5px]'/>
      </div>

      <div className='flex flex-row justify-start mt-[20px] mb-[30px]'>
          <p className='text-white text-sm w-[35%]'>
            {description}
          </p>
      </div>
    </div>
  )
}

export default ServCard