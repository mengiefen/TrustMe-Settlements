import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFormatAddress } from "@/utils";
import { FaCaretDown } from "react-icons/fa";
import { useConnect, useDisconnect, useNetwork } from "wagmi";
import React, { useState } from "react";

import { useRouter } from "next/router";
import { disconnectWallet } from "@/redux/wallet/walletSlice";

const HeaderDropDown = () => {
  const { address, connected, userBalances } = useSelector(
    (state: RootState) => state.wallets,
  );
  const { disconnect } = useDisconnect();
  const { connectAsync, connectors } = useConnect({});
  const router = useRouter();
  const { chain } = useNetwork();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const handleDisconnect = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowMenu(false);
    try {
      await dispatch(disconnectWallet());
      await disconnect();
      await router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleConnect = async (e: React.SyntheticEvent) => {
    const connector = connectors[0];
    setShowMenu(false);
    try {
      await connectAsync({ connector });
      await router.push("list");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative">
      <button
        className="inline-flex items-center md:px-2 min-w-[220px]
        lg:px-2 py-3 mb-3 font-medium text-center text-white 
        bg-gradient-to-r from-purplish-800 to-secondary-800
         md:mb-0 hover:bg-blue-800 focus:ring-4 focus:outline-none
        focus:ring-secondary-300 justify-end"
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        style={{
          fontSize: connected ? "0.9rem" : "1rem",
        }}
      >
        {connected
          ? `Connected: ${getFormatAddress(address)}`
          : "Connect Your Wallet"}
        <FaCaretDown className="ml-2" />
      </button>

      <div
        className="border border-gray-700 shadow-2xl shadow-secondary-500 w-full bg-slate-700 z-100 absolute mt-2"
        style={{ display: showMenu ? "block" : "none" }}
      >
        {connected && (
          <ul className="py-2 text-text-dark bg-transparent max-h-[500px] no-scrollbar overflow-y-scroll">
            <li className="hover:bg-bg-light hover:text-secondary-400 p-2 px-4  flex flex-col">
              <span className="bg-secondary-900 p-2 text-[20px] rounded-lg text-text">{`${userBalances?.currencyBalance?.substring(
                0,
                6,
              )} ${userBalances?.currencySymbol}`}</span>
              {chain && (
                <span className="text-secondary-500 p-2">
                  Network:{"  "}{" "}
                  <span className="bg-purplish-900 text-text py-1 px-2 rounded">
                    {userBalances?.connectedNetwork}{" "}
                  </span>
                </span>
              )}
            </li>
            <strong className="mt-5 pb-2 px-4 text-lg uppercase ">
              Your Assets
            </strong>
            {userBalances?.tokens.map((token) => (
              <li
                className="text-md hover:bg-bg-light border-b border-slate-400 hover:text-secondary-400 p-2 px-4 grid grid-cols-12 items-center gap-2 justify-between"
                key={token.address}
              >
                <span className="col-span-5">{token.symbol} </span>
                <span className="col-span-5"> {token.balance} </span>
              </li>
            ))}
          </ul>
        )}
        <div className="py-2">
          {!connected ? (
            <a
              href="#"
              className="text-secondary-300 block px-4 py-2 hover:bg-bg-light hover:text-secondary-600"
              onClick={(e) => handleConnect(e)}
            >
              Connect Wallet
            </a>
          ) : (
            <a
              href="#"
              className="block uppercase px-4 py-2 text-red-300 border border-red-400 hover:text-white hover:bg-red-600 mx-2"
              onClick={(e) => handleDisconnect(e)}
            >
              Disconnect Wallet
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderDropDown;
