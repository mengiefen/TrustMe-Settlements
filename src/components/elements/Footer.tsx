import React from "react"
import { GiTwoCoins } from "react-icons/gi"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="flex flex-col gap-5 justify-start w-full px-5 py-5 md:py-10 md:border-t md:border-t-slate-700 ">
      <div className="flex flex-col gap-3 mr-auto">
        <div className="flex flex-row items-center gap-1">
          <GiTwoCoins className="text-2xl" />
          <h1 className="text-xl text-text font-semibold tracking-wide">
            Trust<span className="text-secondary-500 font-bold">Me</span>
          </h1>
        </div>
        <hr className="border-2 border-secondary-500 w-[20%] md:w-10 mr-auto" />
      </div>
      <div className="my-5 gap-5 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="w-full flex gap-[20%]">
          <ul className="leading-9 text-md md:text-lg tracking-wide md:leading-10">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
          <ul className="leading-9 text-md md:text-lg tracking-wide md:leading-10">
            <li>Services</li>
            <li>How to use</li>
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-center w-full text-gray-400 gap-5">
            <FaFacebook className="text-2xl hover:text-secondary-500 cursor-pointer" />
            <FaTwitter className="text-2xl hover:text-secondary-500 cursor-pointer" />
            <FaInstagram className="text-2xl hover:text-secondary-500 cursor-pointer" />
            <FaLinkedinIn className="text-2xl hover:text-secondary-500 cursor-pointer" />
            <FaYoutube className="text-2xl hover:text-secondary-500 cursor-pointer" />
          </div>
          <hr className=" border-text-dark w-[10%] mx-auto" />

          <p className="text-sm text-text-dark text-center tracking-wide">
            © 2023 TrustMe. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
