import React from "react"

type InfoCardProps = {
  label: string
  value: string
}

const InfoCard = (props: InfoCardProps) => {
  const { label, value } = props

  return (
    <div
      className={
        value == "Expired"
          ? "flex flex-col py-[5px] px-[10px] border-b-2 border-gray-500 shadow-lg bg-gray-300 items-start justify-between rounded-md w-full h-full md:py-4"
          : value == "Completed"
          ? "flex flex-col py-[5px] px-[10px] border-b-2 border-green-500 shadow-lg bg-green-200 items-start justify-between rounded-md w-full h-full md:py-4"
          : value == "Pending"
          ? "flex flex-col py-[5px] px-[10px] border-b-2 border-yellow-500 shadow-lg bg-yellow-100 items-start justify-between rounded-md w-full h-full md:py-4"
          : value == "Cancelled"
          ? "flex flex-col py-[5px] px-[10px] border-b-2 border-red-500 shadow-lg bg-red-200 items-start justify-between rounded-md w-full h-full md:py-4"
          : "flex flex-col py-[5px] px-[15px] border-b-2 border-secondary-200 shadow-lg bg-text items-start justify-between rounded-md w-full h-full md:py-4"
      }
    >
      <div className="flex items-center justify-start">
        <span className="text-gray-500 text-xs font-light md:text-sm md:text-gray-700">
          {label}
        </span>
      </div>
      <div className="flex items-center justify-start">
        <span className="flex flex-row items-center text-light text-sm font-normal md:text-sm md:font-medium md:tracking-wider">
          {/* <span><AiOutlineCopy className='w-1/10 h-11/12 pr-1'/></span> */}
          {value}
        </span>
      </div>
    </div>
  )
}

export default InfoCard
