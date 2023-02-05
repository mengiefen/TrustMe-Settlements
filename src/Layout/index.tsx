import React, { ReactComponentElement, ReactElement, useEffect } from "react";
import Header from "@/components/elements/Header";
import Footer from "@/components/elements/Footer";
import { useRouter } from "next/router";
import FlashMessage from "@/components/FlashMessage";
import { useAccount } from "wagmi";
import { connectWallet } from "@/redux/wallet/walletSlice";
import {
  useHandleCanceledEvent,
  useHandleConfirmedEvent,
  useHandleCreatedEvent,
  useHandleExpiredEvent,
  useHandleWithdrawEvent,
} from "./events";
import { useDispatch } from "react-redux";

type LayoutProps = {
  children: ReactElement<any> | ReactComponentElement<any>;
  bg?: string;
  logoPrimaryColor?: string;
};
const Layout = (props: LayoutProps) => {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnected) dispatch(connectWallet(address));
  }, [dispatch, address, isConnected]);
  const { isTradeCreated } = useHandleCreatedEvent(address as string);
  const { isTradeExpired } = useHandleExpiredEvent(address as string);
  const { isTradeConfirmed } = useHandleConfirmedEvent(address as string);
  const { isTradeCanceled } = useHandleCanceledEvent(address as string);
  const { isTradeWithdrawn } = useHandleWithdrawEvent(address as string);

  const router = useRouter();
  const pathname = router.pathname;
  const background = pathname !== "/" ? `bg-text${props.bg}` : "";
  const logoColor = pathname !== "/" ? `text-bg${props.logoPrimaryColor}` : "";

  return (
    <main
      className={`${
        pathname == "/" || pathname == "/addTrade" || pathname == "/list"
          ? "bg-bg text-text"
          : "bg-bg text-text"
      } flex flex-col justify-between items-center overflow-hidden w-screen
       md:px-10 lg:px-20`}
    >
      {isTradeCreated ? (
        <FlashMessage message="Trade created!" type="success" />
      ) : isTradeCanceled ? (
        <FlashMessage message="Trade Canceled!" type="error" />
      ) : isTradeConfirmed ? (
        <FlashMessage message="Trade Confirmed!" type="success" />
      ) : isTradeExpired ? (
        <FlashMessage message="Trade expired!" type="info" />
      ) : isTradeWithdrawn ? (
        <FlashMessage message="Trade withdrawn!" type="success" />
      ) : null}

      <Header bg={background} logoPrimaryColor={logoColor} />
      {props.children}
      {router.pathname === "/" && <Footer />}
    </main>
  );
};

export default Layout;
