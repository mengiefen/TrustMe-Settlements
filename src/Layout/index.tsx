import React, { ReactComponentElement, ReactElement, useEffect } from "react";
import Header from "@/components/elements/Header";
import Footer from "@/components/elements/Footer";
import { useRouter } from "next/router";
import FlashMessage from "@/components/FlashMessage";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { connectWallet, disconnectWallet } from "@/redux/wallet/walletSlice";
import {
  useHandleCanceledEvent,
  useHandleConfirmedEvent,
  useHandleCreatedEvent,
  useHandleExpiredEvent,
  useHandleWithdrawEvent,
} from "@/hooks/events";
import { useDispatch } from "react-redux";
import { getConnectedUserTokens } from "@/helpers/getterHelpers";
import { updateUseBalances } from "@/redux/wallet/walletSlice";
import { TokenListType } from "@/components/TransactionList/type";
import { logout } from "@/redux/store";
import { clearTrades } from "@/redux/trade/tradesSlice";
type LayoutProps = {
  children: ReactElement<any> | ReactComponentElement<any>;
  bg?: string;
  logoPrimaryColor?: string;
};

const Layout = (props: LayoutProps) => {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();
  const { isTradeCreated } = useHandleCreatedEvent(address as string);
  const { isTradeExpired } = useHandleExpiredEvent(address as string);
  const { isTradeConfirmed } = useHandleConfirmedEvent(address as string);
  const { isTradeCanceled } = useHandleCanceledEvent(address as string);
  const { isTradeWithdrawn } = useHandleWithdrawEvent(address as string);

  const router = useRouter();
  const pathname = router.pathname;
  const background = pathname !== "/" ? `bg-text${props.bg}` : "";
  const logoColor = pathname !== "/" ? `text-bg${props.logoPrimaryColor}` : "";
  const { chain } = useNetwork();
  const { refetch } = useBalance({ address } as {
    address: `0x${string} | undefined`;
  });

  useEffect(() => {
    const updateStore = async () => {
      const tokens = await getConnectedUserTokens(address as `0x${string}`);
      const { data: userData } = await refetch();
      await dispatch(clearTrades());
      await dispatch(connectWallet(address as string));
      await dispatch(
        updateUseBalances({
          currencyBalance: userData?.formatted,
          currencySymbol: userData?.symbol,
          connectedNetwork: chain?.network,
          tokens: tokens.map((token: TokenListType) => ({
            address: token.address,
            balance: token.balance,
            decimals: token.decimals,
            name: token.name,
            symbol: token.symbol,
            logo: token.logo,
          })),
        }),
      );
    };

    isConnected && updateStore();
  }, [isConnected, address, chain, dispatch, refetch]);

  useEffect(() => {
    if (!isConnected) {
      logout();
    }
  }, [isConnected]);

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
