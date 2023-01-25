import React from "react"

const UsageCardReverse = () => {
  return (
    <div className="flex flex-row md:contents w-full">
      <p className="leading-tight my-auto text-center w-[45%]">
        Lorem ipsum dolor sit amet consectetur
      </p>

      <div className="col-start-5 col-end-6 md:mx-auto relative mx-2 md:m-10">
        <div className="h-full w-6 flex items-center justify-center">
          <div className="h-full w-1 bg-blue-800 pointer-events-none"></div>
        </div>
        <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-secondary-500 shadow"></div>
      </div>

      <div className="bg-slate-800 border border-secondary-900 col-start-1 col-end-5 p-4 rounded-md my-4 ml-auto shadow-md text-center w-[45%]">
        <h3 className="font-semibold text-lg mb-1 ">Lorem ipsum</h3>
        <p className="leading-tight text-justify">Lorem ipsum dolor sit amet </p>
      </div>
    </div>
  )
}

export default UsageCardReverse
