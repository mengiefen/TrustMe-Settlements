import React, { FormEvent, useEffect, FC } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { useState } from "react";
import { getConnectedUserTokens } from "../../../helpers/getterHelpers";
import { useMultistepForm } from "./useMultistepForm";
import dayjs from "dayjs";
import { TrustMe } from "typechain";
import abi from "../../../../abi.json";

import erc20Abi from "../../../../erc20Abi.json";

import FormWrapper from "./FormWrapper";
import Pending from "./Pending";
import { AiOutlineCheck, AiOutlineLoading } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { RadioType } from "@/components/TransactionList/type";
import BuyerAddress from "./stepComponents/BuyerAddress";
import { useFormData } from "./FormDataContext";
import SellerTokenAddress from "./stepComponents/SellerTokenData";
import SellerNftData from "./stepComponents/SellerNftData";
import SellerEthInput from "./stepComponents/SellerEthInput";
import TimePeriodInput from "./stepComponents/TimePeriodInput";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

type ReviewDataProps = {
  formData: FormData;
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
  const { formData, setFormData } = useFormData();
  console.log(formData);
  // function updateFields(fields: Partial<FormData>) {
  //   console.log(formData);
  //   setFormData((prev) => ({ ...prev, ...fields }));
  // }
  console.log(formData);

  const RadioButtonSeller = () => (
    <div className="flex items-center">
      <label htmlFor="">ETH</label>
      <input
        type="radio"
        name="asset"
        id="Eth"
        checked={selectedRadioSeller === "eth"}
        className="form-radio h-5 w-5 text-secondary-900"
        value="eth"
        onChange={(e) => setSelectedRadioSeller(e.target.value)}
      />
      <label htmlFor="">Token</label>
      <input
        type="radio"
        name="asset"
        id="Token"
        className="form-radio h-5 w-5 text-secondary-900"
        checked={selectedRadioSeller === "token"}
        value="token"
        onChange={(e) => setSelectedRadioSeller(e.target.value)}
      />
      <label htmlFor="">NFT</label>
      <input
        type="radio"
        name="asset"
        id="NFT"
        value="nft"
        checked={selectedRadioSeller === "nft"}
        // className="form-radio h-5 w-5 text-secondary-900"
        onChange={(e) => setSelectedRadioSeller(e.target.value)}
      />
    </div>
  );

  //  const ReviewData: FC<ReviewDataProps> = ({
  //   formData: {
  //     buyerAddress,
  //     sellerTokenAddress,
  //     sellerTokenAmount,
  //     buyerTokenAddress,
  //     buyerTokenAmount,
  //     datePeriod,
  //     timePeriod,
  //   },
  // }) => (
  //   <FormWrapper title="Review Data">
  //     <div className="flex flex-col text-gray-200">
  //       <h2 className="text-lg font-bold">Review Your Transaction</h2>
  //       <div className="flex flex-col space-y-3 ">
  //         <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
  //           <p className="text-sm font-bold">Your Address</p>
  //           <p className="text-xs ">{address}</p>
  //         </div>
  //         <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
  //           <p className="text-sm font-bold">Counterparty Address</p>
  //           <p className="text-xs">{buyerAddress}</p>
  //         </div>
  //         <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
  //           <p className="text-sm font-bold">Asset to Send</p>
  //           <p className="text-xs">{sellerTokenAddress} </p>
  //         </div>
  //         <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
  //           <p className="text-sm font-bold"> Amount Asset to Send</p>
  //           <p className="text-sm">{sellerTokenAmount}</p>
  //         </div>
  //         <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
  //           <p className="text-sm font-bold">Asset to Receive</p>
  //           <p className="text-xs">{buyerTokenAddress}</p>
  //         </div>
  //         <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
  //           <p className="text-sm font-bold"> Amount Asset to Receive</p>
  //           <p className="text-sm">{buyerTokenAmount}</p>
  //         </div>
  //         <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
  //           <p className="text-sm font-bold">Transaction Expiry Date</p>
  //           <p className="text-sm">{datePeriod}</p>
  //         </div>
  //         <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
  //           <p className="text-sm font-bold">Transaction Expiry Time</p>
  //           <p className="text-sm">{timePeriod}</p>
  //         </div>
  //       </div>
  //     </div>
  //   </FormWrapper>
  // );
  const InputFieldToShow = () => {
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

  const { steps, currentStepindex, isFirstStep, back, next, isLastStep, step } =
    useMultistepForm([
      <BuyerAddress {...formData} key={1} />,
      <RadioButtonSeller />,
      InputFieldToShow(),
      <TimePeriodInput />,
      // <ReviewData  />,
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
    const trustMeContract: TrustMe = new ethers.Contract(
      "0xF112F9D64Db9BE8F33Ee2e49c625EB564e58a25E",
      abi,
      signer!,
    ) as TrustMe;

    const erc20Contract = new ethers.Contract(
      formData.sellerTokenAddress,
      erc20Abi,
      signer!,
    );

    setIsApproving(true);
    try {
      const _tx = await erc20Contract.approve(
        trustMeContract.address,
        ethers.utils.parseEther(formData.sellerTokenAmount.toString()),
      );
      await _tx.wait();
      setIsApproving(false);

      setIsAdding(true);

      // const tx = await trustMeContract.addTrade(
      //   formData.buyerAddress,
      //   formData.sellerTokenAddress,
      //   formData.buyerTokenAddress,
      //   ethers.utils.parseEther(formData.sellerTokenAmount.toString()),
      //   ethers.utils.parseEther(formData.buyerTokenAmount.toString()),
      //   deadline,
      // );
      // const txReceipt = await tx.wait();
      setIsAdding(false);
      await router.push("/list");
    } catch (error) {
      console.log(error);
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
          <h3 className="py-5 font-semibold text-xl uppercase text-secondary-200">
            Create New Transaction
          </h3>
          <span className="text-gray-400"> {step}</span>
          <div className="flex gap-2 justify-between mx-5 md:mx-10] mt-10">
            {!isFirstStep && (
              <button
                className="py-2 text-white text-sm rounded shadow-md bg-purplish-800 
                shadow:border-l-secondary-800 px-5 md:px-10 md:py-3 md:text-lg"
                type="submit"
                onClick={back}
              >
                Back
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
