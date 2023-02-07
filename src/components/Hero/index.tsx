import React from "react";
import Image from "next/image";
import HeroImage from "../../assets/9.png";
import Button from "../elements/Button";
import { useAccount, useConnect, useDisconnect, Connector } from "wagmi";
import { useFormatAddress } from "@/hooks/hooks";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { useRouter } from "next/router";
import { connectWallet, disconnectWallet } from "@/redux/wallet/walletSlice";

const Hero = () => {
  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount({});
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    dispatch(disconnectWallet());
  };

  return (
    <div className="flex flex-col items-center justify-around mb-12 lg:min-h-screen md:py-5 ">
      <div
        className="flex flex-col md:flex-row-reverse items-center justify-center w-[80%]
                      mb-3 md:gap-5 lg:gap-10 md:w-full"
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
            <div className="mt-5 flex flex-col gap-2 justify-center items-center md:items-start md:mt-3 md:py-3">
              <Button
                label={buttonText}
                variant="primary"
                onClick={() => {
                  if (isConnected) {
                    handleDisconnect();
                    return;
                  }
                  handleConnect(connectors[0]);
                }}
                size="large"
                bg="bg-gradient-to-r from-purplish-800 to-secondary-800 md:py-4 md:px-12 lg:px-20 md:text-lg md:tracking-widest"
              />
              <Button
                label= "View Transactions"
                variant="primary"
                onClick={() => {
                  if (isConnected) {
                    handleDisconnect();
                    return;
                  }
                  handleConnect(connectors[0]);
                }}
                size="large"
                bg="bg-transperant border-[1px] to-secondary-800 md:py-4 md:px-12 lg:px-20 md:text-lg md:tracking-widest"
              />

              {/* <div className="flex flex-col items-center justify-center w-[80%] mt-5">
                <p className="text-center text-text font-light leading-6 md:tracking-wider md:text-lg md:tracking-wider">
                  {formattedAddress}
                </p>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
