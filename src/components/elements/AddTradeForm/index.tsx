import React, { FormEvent, useEffect, FC } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { useState } from "react";
import {
  erc20Contract,
  erc721Contract,
  getConnectedUserTokens,
  trustMeContract,
} from "../../../helpers/getterHelpers";
import { useMultistepForm } from "./useMultistepForm";
import dayjs from "dayjs";
import { ERC20, ERC721, TrustMe } from "typechain";
import abi from "../../../../abi.json";
import { AddressZero } from "@ethersproject/constants";

import erc20Abi from "../../../../erc20Abi.json";

import FormWrapper from "./FormWrapper";
import Pending from "./Pending";
import { AiOutlineCheck, AiOutlineLoading } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { RadioType } from "@/components/TransactionList/type";
import BuyerAddress from "./stepComponents/BuyerAddress";
import { initialFormData, useFormData } from "./FormDataContext";
import SellerTokenAddress from "./stepComponents/SellerTokenData";
import SellerNftData from "./stepComponents/SellerNftData";
import SellerEthInput from "./stepComponents/SellerEthInput";
import TimePeriodInput from "./stepComponents/TimePeriodInput";
import BuyerEthInput from "./stepComponents/BuyerEthInput";
import BuyerTokenData from "./stepComponents/BuyerTokenData";
import BuyerNftData from "./stepComponents/BuyerNftData";
import ReviewData from "./stepComponents/ReviewData";
import { parseEther } from "ethers/lib/utils.js";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API,
  network: Network.ETH_GOERLI,
};

export default function AddTradeForm() {
  const { address: userAddress, userBalances } = useSelector(
    (state: RootState) => state.wallets,
  );
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const { address } = useAccount();
  const [isApproving, setIsApproving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedRadioSeller, setSelectedRadioSeller] = useState("eth");
  const [selectedRadioBuyer, setSelectedRadioBuyer] = useState("token");
  const { formData, setFormData } = useFormData();

  console.log("formData", formData);

  const RadioButtonSeller = () => (
    <div className="flex flex-col items-center p-4">
      <div className="text-lg font-medium">Which Asset Do you want to Send</div>
      <div className="flex items-center gap-8 justify-evenly my-10">
        <div className="flex items-center">
          <label htmlFor="" className="mr-2">
            ETH
          </label>
          <input
            type="radio"
            name="asset"
            id="Eth"
            checked={selectedRadioSeller === "eth"}
            className="form-radio h-5 w-5 text-secondary-900"
            value="eth"
            onChange={(e) => setSelectedRadioSeller(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="" className="mr-2">
            Token
          </label>
          <input
            type="radio"
            name="asset"
            id="Token"
            className="form-radio h-5 w-5 text-secondary-900"
            checked={selectedRadioSeller === "token"}
            value="token"
            onChange={(e) => setSelectedRadioSeller(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="" className="mr-2">
            NFT
          </label>
          <input
            type="radio"
            name="asset"
            id="NFT"
            value="nft"
            className="form-radio h-5 w-5 text-secondary-900"
            checked={selectedRadioSeller === "nft"}
            onChange={(e) => setSelectedRadioSeller(e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const RadioButtonBuyer = () => (
    <div className="flex flex-col items-center p-4">
      {" "}
      <div> Which Asset Do you want to Receive</div>
      <div className="flex items-center gap-8 justify-evenly my-4">
        {formData.sellerEthAmount === 0 && (
          <div className="flex items-center">
            <label htmlFor="" className="mr-2">
              ETH
            </label>
            <input
              type="radio"
              name="asset"
              id="Eth"
              checked={selectedRadioBuyer === "eth"}
              className="form-radio h-5 w-5 text-secondary-900"
              value="eth"
              onChange={(e) => setSelectedRadioBuyer(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center">
          <label htmlFor="" className="mr-2">
            Token
          </label>
          <input
            type="radio"
            name="asset"
            id="Token"
            className="form-radio h-5 w-5 text-secondary-900"
            checked={selectedRadioBuyer === "token"}
            value="token"
            onChange={(e) => setSelectedRadioBuyer(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="" className="mr-2">
            NFT
          </label>
          <input
            type="radio"
            name="asset"
            id="NFT"
            value="nft"
            checked={selectedRadioBuyer === "nft"}
            className="form-radio h-5 w-5 text-secondary-900"
            onChange={(e) => setSelectedRadioBuyer(e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const SellerInputFieldToShow = () => {
    switch (selectedRadioSeller) {
      case "eth":
        return <SellerEthInput />;
      case "token":
        return <SellerTokenAddress />;
      case "nft":
        return <SellerNftData />;
      default:
        return <SellerEthInput />;
    }
  };
  const BuyerInputFieldToShow = () => {
    switch (selectedRadioBuyer) {
      case "eth":
        return <BuyerEthInput />;

      case "token":
        return <BuyerTokenData />;

      case "nft":
        return <BuyerNftData />;
      default:
        return <BuyerEthInput />;
    }
  };

  const {
    steps,
    currentStepindex,
    isFirstStep,
    refresh,
    next,
    isLastStep,
    step,
  } = useMultistepForm([
    <BuyerAddress key={1} />,
    <RadioButtonSeller key={2} />,
    SellerInputFieldToShow(),
    <RadioButtonBuyer key={3} />,
    BuyerInputFieldToShow(),
    <TimePeriodInput key={4} />,
    <ReviewData key={5} />,
  ]);

  const { data: signer } = useSigner();

  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLastStep) return next();
    event.preventDefault();

    const currentUnixTime = dayjs().unix();
    const unixTimeFuture = dayjs(
      formData.datePeriod + " " + formData.timePeriod,
    ).unix();

    const deadline = unixTimeFuture - currentUnixTime;
    const _trustMeContract: TrustMe = (await trustMeContract()) as TrustMe;
    let _erc20Contract: ERC20;
    let _erc721Contract: ERC721;
    if (formData.sellerTokenAddress !== AddressZero) {
      try {
        _erc20Contract = (await erc20Contract(
          formData.sellerTokenAddress,
        )) as ERC20;
        setIsApproving(true);
        const _tx = await _erc20Contract.approve(
          _trustMeContract.address,
          ethers.utils.parseEther(formData.sellerTokenAmount.toString()),
        );
        await _tx.wait();
        setIsApproving(false);

        setIsAdding(true);
        const trade = {
          tradeId: 0,
          seller: formData.sellerAddress,
          buyer: formData.buyerAddress,
          nft: {
            addressNFTToSell: formData.sellerNftAddress,
            tokenIdNFTToSell: formData.sellerNftTokenId,
            addressNFTToBuy: formData.buyerNftAddress,
            tokenIdNFTToBuy: formData.buyerNftTokenId,
          },
          token: {
            tokenToSell: formData.sellerTokenAddress,
            amountOfTokenToSell: parseEther(
              formData.sellerTokenAmount.toString(),
            ),
            tokenToBuy: formData.buyerTokenAddress,
            amountOfTokenToBuy: parseEther(
              formData.buyerTokenAmount.toString(),
            ),
          },
          eth: {
            amountOfETHToSell: parseEther(formData.sellerEthAmount.toString()),
            amountOfETHToBuy: parseEther(formData.buyerEthAmount.toString()),
          },
          deadline: deadline,
          dateCreated: currentUnixTime,
          status: 0,
        };
        const tx = await _trustMeContract.addTrade(trade);
        const txReceipt = await tx.wait();
        setIsAdding(false);
        setFormData(initialFormData);
        await router.push("/list");
      } catch (error) {
        setFormData(initialFormData);
        console.log(error);
      }
    } else if (formData.sellerNftAddress !== AddressZero) {
      try {
        _erc721Contract = (await erc721Contract(
          formData.sellerNftAddress,
        )) as ERC721;
        setIsApproving(true);
        const _tx = await _erc721Contract.approve(
          _trustMeContract.address,
          formData.sellerNftTokenId,
        );
        await _tx.wait();
        setIsApproving(false);

        setIsAdding(true);
        const trade = {
          tradeId: 0,
          seller: formData.sellerAddress,
          buyer: formData.buyerAddress,
          nft: {
            addressNFTToSell: formData.sellerNftAddress,
            tokenIdNFTToSell: formData.sellerNftTokenId,
            addressNFTToBuy: formData.buyerNftAddress,
            tokenIdNFTToBuy: formData.buyerNftTokenId,
          },
          token: {
            tokenToSell: formData.sellerTokenAddress,
            amountOfTokenToSell: parseEther(
              formData.sellerTokenAmount.toString(),
            ),
            tokenToBuy: formData.buyerTokenAddress,
            amountOfTokenToBuy: parseEther(
              formData.buyerTokenAmount.toString(),
            ),
          },
          eth: {
            amountOfETHToSell: parseEther(formData.sellerEthAmount.toString()),
            amountOfETHToBuy: parseEther(formData.buyerEthAmount.toString()),
          },
          deadline: deadline,
          dateCreated: currentUnixTime,
          status: 0,
        };
        const tx = await _trustMeContract.addTrade(trade);
        const txReceipt = await tx.wait();
        setIsAdding(false);
        setFormData(initialFormData);
        await router.push("/list");
      } catch (error) {
        setFormData(initialFormData);
        console.log(error);
      }
    } else {
      try {
        const trade = {
          tradeId: 0,
          seller: formData.sellerAddress,
          buyer: formData.buyerAddress,
          nft: {
            addressNFTToSell: formData.sellerNftAddress,
            tokenIdNFTToSell: formData.sellerNftTokenId,
            addressNFTToBuy: formData.buyerNftAddress,
            tokenIdNFTToBuy: formData.buyerNftTokenId,
          },
          token: {
            tokenToSell: formData.sellerTokenAddress,
            amountOfTokenToSell: parseEther(
              formData.sellerTokenAmount.toString(),
            ),
            tokenToBuy: formData.buyerTokenAddress,
            amountOfTokenToBuy: parseEther(
              formData.buyerTokenAmount.toString(),
            ),
          },
          eth: {
            amountOfETHToSell: parseEther(formData.sellerEthAmount.toString()),
            amountOfETHToBuy: parseEther(formData.buyerEthAmount.toString()),
          },
          deadline: deadline,
          dateCreated: currentUnixTime,
          status: 0,
        };

        setIsAdding(true);
        const tx = await _trustMeContract.addTrade(trade, {
          value: parseEther(formData.sellerEthAmount.toString()),
        });
        const txReceipt = await tx.wait();
        setIsAdding(false);
        setFormData(initialFormData);
        await router.push("/list");
      } catch (error) {
        setFormData(initialFormData);
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full h-[calc(100vh-70px)] md:h-[calc(100vh-85px)] flex items-center justify-center ">
      <form
        className="w-full flex items-center justify-center py-5 md:w-[80%] lg:w-[75%] xl:w-[65%] h-full px-5 lg:px-10"
        onSubmit={onSubmit}
      >
        <div
          className="w-full h-full sm:bg-slate-800 rounded-md flex flex-col sm:border-[1px]
         sm:border-slate-700 p-[15px] sm:shadow-[0px_500px_500px_0px] sm:shadow-secondary-600 "
        >
          <div className="flex justify-end mt-3">
            {pending ? <Pending /> : null}
          </div>
          <div className="flex items-center justify-between mx-5">
            <h3 className="py-5 font-semibold text-xl uppercase text-secondary-200 text-center">
              Create New Transaction
            </h3>
            <div className="flex items-center justify-between">
              {currentStepindex} / {steps.length - 1}
            </div>
          </div>

          <span className="text-gray-400"> {step}</span>
          <div className="flex gap-2 justify-between mx-5 md:mx-10] mt-10">
            {!isFirstStep && (
              <button
                className="py-2 text-white text-sm rounded shadow-md bg-purplish-800 
                shadow:border-l-secondary-800 px-5 md:px-10 md:py-3 md:text-lg"
                type="submit"
                onClick={() => {
                  refresh();
                  setFormData(initialFormData);
                }}
              >
                Refresh
              </button>
            )}
            <button
              className="py-2 text-white text-sm rounded shadow-md bg-secondary-800 
             shadow:border-l-secondary-800 px-5 md:px-10 md:py-3 md:text-lg flex items-center gap-2"
              type="submit"
              onClick={() => {
                if (isLastStep) {
                  setIsButtonClicked(true);
                }
              }}
              // disabled={isButtonClicked && isLastStep}
            >
              {!isLastStep && !isAdding && !isApproving && !isButtonClicked && (
                <span>Next</span>
              )}
              {isLastStep && !isAdding && !isApproving && !isButtonClicked && (
                <>
                  <span>Submit for Approval</span>
                </>
              )}
              {isApproving && isLastStep && (
                <>
                  <AiOutlineLoading className="animate-spin h-5 w-5 " />
                  <span>Approving...</span>
                </>
              )}
              {isAdding && isLastStep && (
                <>
                  <AiOutlineLoading className="animate-spin h-5 w-5 " />
                  <span>Adding...</span>
                </>
              )}
              {isButtonClicked && isLastStep && !isAdding && !isApproving && (
                <>
                  <AiOutlineCheck className="text-green h-5 w-5" />
                  <span>Success</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
