import React from "react"
import Button from "../elements/Button"

const Contact = () => {
  return (
    <div className="w-full min-h-[50%] flex flex-col items-center justify-center contact-bg mb-12 md:mb-20 max-w-screen-md ">
      <div className="bg-bg-light border border-slate-600 sm:shadow-[0px_500px_500px_0px] sm:shadow-secondary-900  rounded-tl-xl rounded-br-xl md:rounded-br-3xl md:rounded-tl-3xl w-[90%] min-h-[200px] p-3 sm:p-10">
        <h1 className="text-xl text-text my-5 tracking-wide leading-10 sm:text-2xl md:text-3xl sm:mb-10">
          Get the latest updates
        </h1>
        <form>
          <div className="flex items-center w-full sm:mb-10">
            <input
              type="text"
              placeholder="Enter your email"
              className="py-3 px-3 bg-slate-800 border-2 border-r-0 outline-none border-secondary-700 focus:border-secondary-900 w-[70%] md:w-[60%] "
            />
            <button className="bg-secondary-900 py-3 border-2 border-secondary-700 border-l-0 w-[30%] hover:bg-secondary-900 text-md">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
