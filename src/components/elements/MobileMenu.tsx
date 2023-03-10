import { useFormatAddress } from "@/hooks/hooks";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import { useAccount, useDisconnect, useConnect, Connector } from "wagmi";
import { useIsMounted } from "@/hooks/useIsMounted";
import { InjectedConnector } from "@wagmi/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { connectWallet, disconnectWallet } from "@/redux/wallet/walletSlice";

type menuProps = {
  isActive: boolean;
  showMenu: () => void;
  setIsActive : Dispatch<SetStateAction<boolean>>
};

const MobileMenu = (props: menuProps) => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const {
    buttonText,
    address: userAddress,
    connected,
  } = useSelector((state: RootState) => state.wallets);
  const dispatch = useDispatch();

  const { connectAsync, connectors } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();
  const { showMenu, isActive, setIsActive } = props;

  const formattedAddress = useFormatAddress(userAddress);
  const handleDisconnect = async () => {
    await disconnect();
    await dispatch(disconnectWallet());
    await router.push("/");
  };

  const handleConnect = async (connector: Connector) => {
    if (isMounted) {
      try {
        await connectAsync({ connector });
        await dispatch(connectWallet(address));
        await router.push("list");
      } catch (err) {
        console.log(err);
      }
    }
  };


  const handleMenuclick = () => {
    setIsActive(false);
  }

  return (
    <div
      className={
        isActive
          ? `w-screen h-screen flex flex-col ${
              router.pathname === "/" || router.pathname == "/addTrade"
                ? "bg-menu-dark text-white"
                : "bg-menu-dark text-white"
            } bg-opacity-50 items-center justify-start pt-10`
          : "hidden"
      }
    >
      <div className="flex flex-col w-11/12 px-[60px] py-5">
        <div className="flex flex-row justify-end">
          <ul className="flex flex-col items-end justify-end">
            <li className="py-2 hover:-translate-x-1 transition duration-300" onClick={handleMenuclick}>
              <Link href="/" className="py-3  text-xl">
                Home
              </Link>
            </li>
            <li className="py-2 hover:-translate-x-1 transition duration-300">
              <Link href="/" className="pb-3 text-xl">
                Services
              </Link>
            </li>
            <li className="py-2 hover:-translate-x-1 transition duration-300">
              <Link href="/" className="pb-3  text-xl">
                About us
              </Link>
            </li>
            <li className="py-2 hover:-translate-x-1 transition duration-300">
              <Link href="/" className="pb-3 text-xl">
                Contact us
              </Link>
            </li>
            <li className="py-2 hover:-translate-x-1 transition duration-300">
              <Link href="/list" className="pb-3 text-xl">
                Transactions
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-end my-5">
          {isMounted && (
            <>
              {isConnected ? (
                <>
                  <Button
                    label={buttonText}
                    onClick={() => handleDisconnect()}
                    size="large"
                  />

                  <div className=" flex flex-row address pt-10">
                    <small className="flex flex-row text-md">
                      <>Connected To {formattedAddress}</>
                      <span className=" pl-1 pt-[1px]">&#8208;</span>
                    </small>
                  </div>
                </>
              ) : (
                <Button
                  label={buttonText}
                  onClick={() => handleConnect(connectors[0])}
                  otherClasses="max-w-[300px]"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
