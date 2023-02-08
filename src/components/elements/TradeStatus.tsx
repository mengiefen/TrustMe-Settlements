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
    case "Completed":
      return "text-green-400  md:border-green-400";
    case "Pending":
      return "text-yellow-400 md:border-yellow-400";
    case "Canceled":
      return "text-red-400 md:border-red-400";
    case "Withdrawn":
      return "text-secondary-400 md:border-secondary-300";
    default:
      return "text-slate-400  md:border-slate-400";
  }
};

const ButtonIcon = (status = "Expired") => {
  switch (status) {
    case "Completed":
      return <BsCheckCircle className="text-green-400  " />;
    case "Pending":
      return <MdPendingActions className="text-yellow-400 " />;
    case "Canceled":
      return <MdOutlineCancel className="text-red-400" />;
    case "Withdrawn":
      return <BsCheck2All className="text-secondary-400" />;
    default:
      return <MdOutlineLockClock className="text-gray-400 " />;
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
