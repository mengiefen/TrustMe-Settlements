import React from "react";
import { BsCheck2All, BsCheckCircle } from "react-icons/bs";
import {
  MdCancel,
  MdOutlineCancel,
  MdOutlineLockClock,
  MdPendingActions,
} from "react-icons/md";

type StatusButtonProps = {
  children?: React.ReactNode;
  // text: string
  bg?: string;
};

const StatusButton = ({
  bg = "bg-green-500 text-white",
  ...props
}: StatusButtonProps) => {
  return (
    <div
      className={`px-1 py-[2px] font-semibold tracking-wide text-xs md:py-1 md:px-3 md:border md:rounded ${bg}`}
    >
      {props.children}
    </div>
  );
};

type TradeStatusProps = {
  status: string;
  icon?: React.ReactNode;
};

const color = (status = "Expired") => {
  switch (status) {
    case "Confirmed":
      return "text-green-600  md:border-green-300 md:bg-green-100";
    case "Pending":
      return "text-yellow-600 md:border-yellow-300 md:bg-yellow-100 ";
    case "Canceled":
      return "text-red-600 md:border-red-300 md:bg-red-100";
    case "Withdrawn":
      return "text-secondary-600 md:border-purplish-300 md:bg-secondary-100";
    default:
      return "text-gray-700  md:border-slate-300 md:bg-gray-200";
  }
};

const ButtonIcon = (status = "Expired") => {
  switch (status) {
    case "Confirmed":
      return <BsCheckCircle className="text-green-600  " />;
    case "Pending":
      return <MdPendingActions className="text-yellow-600 " />;
    case "Canceled":
      return <MdOutlineCancel className="text-red-600" />;
    case "Withdrawn":
      return <BsCheck2All className="text-secondary-600" />;
    default:
      return <MdOutlineLockClock className="text-gray-700 " />;
  }
};

const TradeStatus = ({
  status = "Completed",
  icon = <BsCheck2All />,
}: TradeStatusProps) => {
  return (
    <div className="flex items-center justify-center">
      <StatusButton
        bg={`flex gap-1 text-xl md:text-normal items-center overflow-hidden w-[110px] outline-none ${color(
          status,
        )}`}
      >
        <span className="hidden md:inline-block text-xs">{status}</span>
        {ButtonIcon(status)}
      </StatusButton>
    </div>
  );
};

export default TradeStatus;
