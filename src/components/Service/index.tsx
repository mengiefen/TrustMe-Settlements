import React from "react"
import Button from "../elements/Button"
import Image from "next/image"
import CarouselItem from "../elements/CarouselItem"
import Image1 from "../../assets/1.jpg"
import Carousel from "../elements/Carousel"

const Service = () => {
  return (
    <div className="flex flex-col gap-3 min-h-[50%] mb-12 md:w-full">
      <h2 className="text-2xl text-center text-text md:mb-5 tracking-wider leading-10 md:text-start md:text-3xl md:font-semibold mb-5">
        Services
      </h2>
      {/* <hr className="border-2 border-secondary-500 w-[20%] md:w-10 mr-auto" /> */}
      <Carousel />
    </div>
  )
}

export default Service
