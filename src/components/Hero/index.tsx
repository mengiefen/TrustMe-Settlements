import React from "react"
import Image from "next/image"
import HeroImage from "../../assets/9.png"
import Button from "../elements/Button"
import MobileMenu from "../elements/MobileMenu";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-around mb-12">
      <div className="flex flex-col items-center justify-center w-[80%] mb-5">
        <Image src={HeroImage} alt="Hero Image" />
        <h1 className="text-3xl font-semibold text-center text-text my-5 tracking-widest leading-10">
          Settle Your Trade & Trust<span className="font-bold text-secondary-500">Me</span>
        </h1>
        <p className="text-center text-text font-light leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt
          luctus, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nisl
          vel tincidunt luctus.
        </p>
      </div>

      <Button
        label="Connect Wallet"
        variant="primary"
        onClick={() => alert("I'm Clicked!")}
        size="large"
        bg="bg-gradient-to-r from-purplish-800 to-secondary-800"
      />
    </div>
  )
}

export default Hero
