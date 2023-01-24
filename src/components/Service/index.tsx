import React from 'react';
import Button from '../elements/Button';
import Image from 'next/image';
import CarouselItem from '../elements/CarouselItem';
import Image1 from '../../assets/1.jpg';
import Carousel from '../elements/Carousel';

const Service = () => {
  return (
    <div className="flex flex-col gap-3 h-screen">
      <Carousel />

      {/* <Button
        variant="primary"
        label="Connect Wallet"
        size="large"
        onClick={() => alert('Wow, You did it!')}
      /> */}
    </div>
  );
};

export default Service;
