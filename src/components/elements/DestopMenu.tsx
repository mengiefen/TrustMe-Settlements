import React from "react";
import Link from "next/link";
import { GiTwoCoins } from "react-icons/gi";
import HeaderDropDown from "./HeaderDropDown";

const DesktopMenu = () => {
  return (
    <div className="items-center justify-between h-full w-full px-5 hidden md:flex mr-5">
      <div className="flex gap-1 items-center">
        <GiTwoCoins className="text-3xl" />

        <h1 className="text-2xl  font-semibold tracking-wide">
          Trust
          <span className="text-secondary-600 font-bold">
            Me
          </span>
        </h1>
      </div>
      <ul className="flex md:gap-3 lg:gap-5 items-center justify-end">
        <li className="py-2 hover:-translate-y-[1px] transition duration-100 hover:text-secondary-600">
          <Link href="/" className="py-3">
            Home
          </Link>
        </li>
        <li className="py-2 hover:-translate-y-[1px] transition duration-100 hover:text-secondary-600">
          <Link href="/list" className="py-3">
            Transactions
          </Link>
        </li>
        <li className="py-2 hover:-translate-y-[1px] transition duration-100 hover:text-secondary-600">
          <Link href="" className="py-3">
            Services
          </Link>
        </li>
        <li className="py-2 hover:-translate-y-[1px] transition duration-100 hover:text-secondary-600">
          <Link href="" className="py-3">
            About us
          </Link>
        </li>
        <li className="py-2 hover:-translate-y-[1px] transition duration-100 hover:text-secondary-600">
          <Link href="" className="py-3">
            Contact us
          </Link>
        </li>

        <li className="py-2 hover:-translate-y-[1px] transition duration-100 hover:text-secondary-600">
          <HeaderDropDown />
        </li>
      </ul>
    </div>
  );
};

export default DesktopMenu;
