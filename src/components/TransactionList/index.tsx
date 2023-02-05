import Layout from "@/Layout";
import React from "react";
import { MdOutlineArrowForward } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import TradeList from "./TradeList";

const ArrowRight = (
  <MdOutlineArrowForward className="text-secondary-900 hover:translate-x-[1px] transition duration-300" />
);

const UserCircle = (
  <FaUserCircle className="text-secondary-900 hover:translate-x-[1px] transition duration-300 w-[40px] h-[40px]" />
);

const TransactionList = () => {
  return (
    <Layout>
      <TradeList />
    </Layout>
  );
};

export default TransactionList;
