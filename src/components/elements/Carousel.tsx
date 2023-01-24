import React from "react"
import CarouselItem from "./CarouselItem"
import { CarouselProvider, Slide, Slider, ButtonBack, ButtonNext } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import { data } from "./data"

import { FcNext, FcPrevious } from "react-icons/fc"

const Carousel = () => {
  return (
    <CarouselProvider
      naturalSlideHeight={20}
      naturalSlideWidth={10}
      totalSlides={data.length}
      orientation="horizontal"
      className="w-[350px] h-[350px] relative ml-12 my-5"
    >
      <Slider className="h-full">
        {data.map((item, index) => (
          <Slide index={index} key={item.id}>
            <CarouselItem image={item.image} title={item.title} description={item.description} />
          </Slide>
        ))}
      </Slider>
      <ButtonBack className="w-20 h-20 absolute top-[50%] -translate-y-[50%] right-0  translate-x-[50%]">
        <FcNext className="text-3xl text-secondary-500" />
      </ButtonBack>
      <ButtonNext className="w-20 h-20 absolute top-[50%] -translate-y-[50%] left-0 -translate-x-[50%]">
        <FcPrevious className="text-3xl text-secondary-500" />
      </ButtonNext>
    </CarouselProvider>
  )
}

export default Carousel
