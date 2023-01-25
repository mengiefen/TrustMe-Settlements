import React from "react"
import Button from "../elements/Button"

const Contact = () => {
  return (
    <div className="w-screen min-h-[50%] flex flex-col items-center justify-center contact-bg mb-12">
      <div className="bg-bg-light border shadow-2xl shadow-secondary-900 border-slate-900 rounded-tl-xl rounded-br-xl w-[90%] min-h-[200px] p-3">
        <h1 className="text-xl text-text my-5 tracking-wide leading-10">Get the latest updates</h1>
        <form>
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Enter your email"
              className="py-3 px-3 bg-slate-800 border-2 border-r-0 outline-none border-secondary-700 focus:border-secondary-900 w-[70%] rounded-tl-2xl rounded-bl-2xl"
            />
            <button className="bg-secondary-900 py-3 border-2 border-secondary-700 w-[30%] rounded-md rounded-tl-none rounded-bl-none hover:bg-secondary-900 text-md">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
