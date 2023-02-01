import React, { useEffect, useState } from "react"
import CarouselItem from "./CarouselItem"
import { CarouselProvider, Slide, Slider, ButtonBack, ButtonNext } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import { data } from "./data"
import { FcNext, FcPrevious } from "react-icons/fc"

const Carousel = () => {
  return (
    <div>
      <div className="grid-cols-1 md:grid-cols-2 gap-4 hidden sm:grid w-full">
        {data.map((item, index) => (
          <CarouselItem
            image={item.image}
            title={item.title}
            description={item.description}
            key={item.id}
          />
        ))}
      </div>

      <CarouselProvider
        naturalSlideHeight={100}
        naturalSlideWidth={125}
        totalSlides={data.length}
        orientation="horizontal"
        className="w-[350px] h-[350px] sm:h-[400px] relative ml-12 my-5 sm:hidden"
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
    </div>
  )
}

export default Carousel
