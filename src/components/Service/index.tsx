import React from "react"
import Button from "../elements/Button"
import Image from "next/image"
import CarouselItem from "../elements/CarouselItem"
import Image1 from "../../assets/1.jpg"
import Carousel from "../elements/Carousel"

const Service = () => {
  return (
    <div className="flex flex-col gap-3 min-h[50%] mb-12">
      <h2 className="text-2xl text-center text-text mt-5 tracking-wide leading-10">Services</h2>
      <Carousel />
    </div>
  )
}

export default Service
