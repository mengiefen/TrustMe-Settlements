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
import {
  FormData,
  FormProps1,
  FormProps2,
  FormProps3,
  FormProps4,
  TokenMetadata,
} from "./type";
import FormWrapper from "./FormWrapper";
import Pending from "./Pending";
import {
  AiOutlineCheck,
  AiOutlineLoading,
} from "react-icons/ai";
import { getSymbol } from "@/utils";
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);
// TYPES

// INITIAL DATA
const INITIAL_DATA: FormData = {
  sellerAddress: "",
  buyerAddress: "",
  sellerTokenAddress: "",
  sellerTokenAmount: "",
  buyerTokenAddress: "",
  buyerTokenAmount: "",
  datePeriod: "",
  timePeriod: "",
};

type ReviewDataProps = {
  formData: FormData;
};

export default function AddTradeForm() {
  const [sellerTokenMetadata, setSellerTokenMetadata] =
    React.useState<TokenMetadata[]>([]);
  const [buyerTokenMetadata, setBuyerTokenMetadata] =
    React.useState<TokenMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const { address } = useAccount();
  const [isApproving, setIsApproving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isButtonClicked, setIsButtonClicked] =
    useState(false);

  async function checkSellerTokens() {
    try {
      setLoading(true);
      const sellerTokens = await getConnectedUserTokens(
        address!,
      );
      setSellerTokenMetadata(sellerTokens);
      setLoading(true);
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
      console.log(error);
      return;
    }
  }

  async function checkBuyerTokens(_address: string) {
    try {
      setLoading(true);
      const buyersTokens = await getConnectedUserTokens(
        _address,
      );
      setBuyerTokenMetadata(buyersTokens);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    checkSellerTokens();
  }, []);

  useEffect(() => {
    if (formData.buyerAddress) {
      checkBuyerTokens(formData.buyerAddress);
    }
  }, [formData.buyerAddress]);

  function updateFields(fields: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  const BuyerAddress = ({ buyerAddress }: FormProps1) => (
    <FormWrapper title="Counterparty Address">
      <input
        className="py-3 px-3 bg-bg border-2 outline-none border-secondary-700 focus:border-secondary-900 w-full text-white"
        type="text"
        placeholder="Counterparty Address"
        name="sellerTokenAddress"
        required
        value={buyerAddress}
        onChange={(e) =>
          updateFields({ buyerAddress: e.target.value })
        }
      />
    </FormWrapper>
  );

  const SellerTokenAddress = ({
    sellerTokenAddress,
    sellerTokenAmount,
  }: FormProps2) => (
    <FormWrapper title="Details Asset to Send">
      <>
        <label className="md:mt-2">Asset to Send</label>
        <select
          required
          name="tokenToTransfer"
          onChange={(e) => {
            updateFields({
              sellerTokenAddress: e.target.value,
            });
          }}
          className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
          value={sellerTokenAddress}
        >
          <option value="" selected disabled>
            --SELECT--
          </option>
          {sellerTokenMetadata.map((item, index) => (
            <option
              key={index}
              disabled={loading ? true : false}
              className="items-center text-sm md:text-md p-3 hover:bg-slate-600"
              value={loading ? "" : item.address}
            >
              {loading ? "Loading..." : item.symbol}
            </option>
          ))}
        </select>
      </>
      <>
        <label className="md:mt-2">
          Amount Asset to Send
        </label>
        <input
          placeholder="Asset Amount"
          autoFocus
          type="number"
          name="sellerTokenAmount"
          required
          value={sellerTokenAmount}
          onChange={(e) =>
            updateFields({
              sellerTokenAmount: e.target.value,
            })
          }
          className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
        />
      </>
    </FormWrapper>
  );

  const BuyerTokenAddress = ({
    buyerTokenAddress,
    buyerTokenAmount,
  }: FormProps3) => (
    <FormWrapper title="Details Asset to Receive">
      <label>Asset to Receive</label>
      <select
        required
        name="tokenToTransfer"
        onChange={(e) => {
          updateFields({
            buyerTokenAddress: e.target.value,
          });
        }}
        className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
        value={buyerTokenAddress}
      >
        <option
          value=""
          selected
          disabled
          className="items-center text-small p-2"
        >
          --select--
        </option>
        {buyerTokenMetadata.map((item, key) => (
          <option
            key={key}
            className="items-center text-small"
            value={loading ? "" : item.address}
            disabled={loading ? true : false}
          >
            {loading ? "Loading..." : item.symbol}
          </option>
        ))}
      </select>

      <label>Amount Asset to Receive</label>
      <input
        autoFocus
        type="number"
        name="buyerTokenAmount"
        required
        value={buyerTokenAmount}
        onChange={(e) =>
          updateFields({ buyerTokenAmount: e.target.value })
        }
        className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
      />
    </FormWrapper>
  );

  const TimePeriod = ({
    datePeriod,
    timePeriod,
  }: FormProps4) => (
    <FormWrapper title="Time Period">
      <label>Transaction Expiry Date</label>
      <input
        autoFocus
        type="date"
        name="datePeriod"
        required
        value={datePeriod}
        onChange={(e) =>
          updateFields({ datePeriod: e.target.value })
        }
        className="py-3 px-3 bg-slate-700 border-2 outline-non border-secondary-900 focus:border-secondary-700 w-full text-white"
      />
      <label>Transaction Expiry Time</label>
      <input
        className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
        autoFocus
        type="time"
        name="timePeriod"
        required
        value={timePeriod}
        onChange={(e) =>
          updateFields({ timePeriod: e.target.value })
        }
      />
    </FormWrapper>
  );

  const ReviewData: FC<ReviewDataProps> = ({
    formData: {
      buyerAddress,
      sellerTokenAddress,
      sellerTokenAmount,
      buyerTokenAddress,
      buyerTokenAmount,
      datePeriod,
      timePeriod,
    },
  }) => (
    <FormWrapper title="Review Data">
      <div className="flex flex-col text-gray-200">
        <h2 className="text-lg font-bold">
          Review Your Transaction
        </h2>
        <div className="flex flex-col space-y-3 ">
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">
              Your Address
            </p>
            <p className="text-xs ">{address}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">
              Counterparty Address
            </p>
            <p className="text-xs">{buyerAddress}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">
              Asset to Send
            </p>
            <p className="text-xs">{sellerTokenAddress} </p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">
              {" "}
              Amount Asset to Send
            </p>
            <p className="text-sm">{sellerTokenAmount}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">
              Asset to Receive
            </p>
            <p className="text-xs">{buyerTokenAddress}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">
              {" "}
              Amount Asset to Receive
            </p>
            <p className="text-sm">{buyerTokenAmount}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">
              Transaction Expiry Date
            </p>
            <p className="text-sm">{datePeriod}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">
              Transaction Expiry Time
            </p>
            <p className="text-sm">{timePeriod}</p>
          </div>
        </div>
      </div>
    </FormWrapper>
  );

  const {
    steps,
    currentStepindex,
    isFirstStep,
    back,
    next,
    isLastStep,
    step,
  } = useMultistepForm([
    <BuyerAddress
      {...formData}
      updateFields={updateFields}
      key={1}
    />,
    <SellerTokenAddress
      {...formData}
      updateFields={updateFields}
      key={2}
    />,
    <BuyerTokenAddress
      {...formData}
      updateFields={updateFields}
      key={3}
    />,
    <TimePeriod
      {...formData}
      updateFields={updateFields}
      key={4}
    />,
    <ReviewData formData={formData} key={5} />,
  ]);

  const { data: signer } = useSigner();

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
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
    const _tx = await erc20Contract.approve(
      trustMeContract.address,
      ethers.utils.parseEther(
        formData.sellerTokenAmount.toString(),
      ),
    );
    await _tx.wait();
    setIsApproving(false);

    setIsAdding(true);

    const tx = await trustMeContract.addTrade(
      formData.buyerAddress,
      formData.sellerTokenAddress,
      formData.buyerTokenAddress,
      ethers.utils.parseEther(
        formData.sellerTokenAmount.toString(),
      ),
      ethers.utils.parseEther(
        formData.buyerTokenAmount.toString(),
      ),
      deadline,
    );
    const txReceipt = await tx.wait();
    setIsAdding(false);
    console.log(txReceipt);
  }
  return (
    <div className="w-full h-[calc(100vh-70px)] md:h-[calc(100vh-85px)] flex items-center justify-center ">
      <form
        className="w-full flex items-center justify-center py-5 md:w-[70%] xl:w-[65%] h-full px-5 md:px-10"
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
              {!isLastStep &&
                !isAdding &&
                !isApproving &&
                !isButtonClicked && <span>Next</span>}
              {isLastStep &&
                !isAdding &&
                !isApproving &&
                !isButtonClicked && (
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
              {isButtonClicked &&
                isLastStep &&
                !isAdding &&
                !isApproving && (
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
