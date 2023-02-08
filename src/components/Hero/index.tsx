import React, { useState } from "react";
import Image from "next/image";
import HeroImage from "../../assets/9.png";
import Button from "../elements/Button";
import { useAccount, useConnect, useDisconnect, Connector } from "wagmi";
import { useFormatAddress } from "@/hooks/hooks";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { connectWallet, disconnectWallet } from "@/redux/wallet/walletSlice";
import { BsArrowDown, BsArrowRight } from "react-icons/bs";
import FlashMessage from "../FlashMessage";

const Hero = () => {
  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const [flash, setFlash] = useState(false);
  const router = useRouter();

  const { buttonText, address: userAddress } = useSelector(
    (state: RootState) => state.wallets,
  );

  const { disconnect } = useDisconnect();

  const formattedAddress = useFormatAddress(userAddress);

  const { connectAsync, connectors } = useConnect({});

  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync({ connector });
      await dispatch(connectWallet(address));
      await router.push("/list");
    } catch (err: any) {
      if (err.message == "Connector not found") {
        setFlash(true);
      }
    }
  };

  const handleDisconnect = () => {
    disconnect();
    dispatch(disconnectWallet());
  };

  return (
    <div className="flex flex-col items-center justify-around mb-12 lg:min-h-screen md:py-5 ">
      {flash && <FlashMessage type="alert" message="Please install metamask" />}
      <div
        className="flex flex-col md:flex-row-reverse items-center justify-center w-[80%]
                       mb-5 md:gap-5 lg:gap-10 md:w-full"
      >
        <div className="sm:max-w-[70%] lg:max-w-[55%] md:h-full md:my-auto">
          <Image src={HeroImage} alt="Hero Image" />
        </div>

        <div className="lg:max-w-[50%] md:max-w[55%] flex flex-col gap-3 md:gap-5">
          <h1
            className="text-3xl font-semibold text-center md:text-left text-text my-5 tracking-widest 
                      md:tracking-wider md:text-4xl lg:text-4xl xl:text-5xl lg:font-normal"
          >
            <span className="leading-10 md:leading-[4rem]">
              Settle your Trade with Trust
            </span>
            <span className="font-bold text-secondary-500 leading-10 md:leading-[4rem]">
              ME
            </span>
          </h1>
          <p className="text-center text-text md:text-left font-light leading-6 md:text-lg md:font-normal">
            TrustMe allows you to instantly settle peer-to-peer transactions in
            digital assets on a “Delivery-versus-Payment” basis”.
          </p>

          {isMounted && (
            <div className="mt-5 flex flex-col justify-center items-center md:items-start md:mt-10">
              <Button
                label={
                  isConnected && address
                    ? "Disconnect Wallet"
                    : "Connect  Wallet"
                }
                variant="primary"
                onClick={() => {
                  if (isConnected && address) {
                    handleDisconnect();
                    return;
                  }
                  handleConnect(connectors[0]);
                }}
                size="large"
                bg="bg-gradient-to-r from-purplish-800 to-secondary-800 md:py-4 md:px-12 lg:px-20 md:text-lg md:tracking-widest"
              />

              <div className="flex flex-col items-center justify-center w-[80%] mt-5">
                <p className="text-center text-text font-light leading-6 md:tracking-wider md:text-lg">
                  {isConnected && address && `${formattedAddress}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {isConnected && address && (
        <Link
          href="/list"
          className="hidden md:flex md:flex-row absolute z-1000 bottom-2 right-5 gap-2 items-center text-gary-200  bg-transparent
            border-gray-700 border-2 px-4 py-3 md:px-10 md:text-md md:tracking-widest hover:bg-transparent hover:text-purplish-500 hover:border-purplish-500"
        >
          <span>View Transactions</span>
          <BsArrowDown className="animate-bounce border border-gray-500 hover:border-purplish-600 rounded-full p-[2px] text-xl" />
        </Link>
      )}
    </div>
  );
};

export default Hero;
