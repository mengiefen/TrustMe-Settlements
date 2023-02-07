import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import {
  MdOutlineArrowRight,
  MdOutlineArrowRightAlt,
} from "react-icons/md";

type CarouselItemProps = {
  image: StaticImageData;
  title: string;
  description: string;
};

const CarouselItem = (props: CarouselItemProps) => {
  const { image, title, description } = props;
  return (
    <div className="py-3 px-4 lg:p-5 lg:pb-10 w-[300px] sm:w-auto lg:w-auto rounded bg-bg-light border-[0.1px] border-secondary-800 hover:shadow-sm hover:shadow-secondary-800">
      <div className="relative  flex flex-col items-center">
        <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
          <Image src={image} alt="Picture of the author" />
        </div>

        <hr className="w-10 border-[0.1px] border-secondary-900 my-3 md:my-5" />

        <h3 className="my-3 text-xl capitalize font-semibold tracking-wide leading-5">
          {title}
        </h3>
        <p className="text-center leading-7 font-light">
          {description}
        </p>
        <Link
          href="/"
          className="text-secondary-300 my-3 flex gap-2 items-center px-5 py-3 tracking-wider
          border-secondary-200 hover:text-secondary-500 hover:border-secondary-500 md:border-[0.1px]"
        >
          See more
          <HiOutlineArrowNarrowRight />
        </Link>
      </div>
    </div>
  );
};

export default CarouselItem;
