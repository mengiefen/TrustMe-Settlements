import React from "react";
import { useAccount } from "wagmi";
import { useFormData } from "../FormDataContext";
import FormWrapper from "../FormWrapper";
import { AddressZero } from "@ethersproject/constants";

const ReviewData = () => {
  const { formData } = useFormData();
  const { address } = useAccount();
  return (
    <FormWrapper title="Review Data">
      <div className="flex flex-col text-gray-200">
        <h2 className="text-lg font-bold">Review Your Transaction</h2>
        <div className="flex flex-col space-y-3 ">
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Your Address</p>
            <p className="text-xs ">{address}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Counterparty Address</p>
            <p className="text-xs">{formData.buyerAddress}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Asset to Send</p>
            <p className="text-xs">
              {formData.sellerTokenAddress !== AddressZero
                ? formData.sellerTokenAddress
                : formData.sellerNftAddress !== AddressZero
                ? formData.sellerNftAddress
                : "ETH"}{" "}
            </p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">
              {formData?.sellerNftAddress !== AddressZero
                ? "Token Id to send"
                : formData?.sellerTokenAddress !== AddressZero
                ? "Token amount to send"
                : "ETH amount to send"}
            </p>
            <p className="text-sm">
              {formData.sellerTokenAmount
                ? formData.sellerTokenAmount
                : formData.sellerNftTokenId
                ? formData.sellerNftTokenId
                : formData.sellerEthAmount}
            </p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Asset to Receive</p>
            <p className="text-xs">
              {formData.buyerTokenAddress !== AddressZero
                ? formData.buyerTokenAddress
                : formData.buyerNftAddress !== AddressZero
                ? formData.buyerNftAddress
                : "ETH"}{" "}
            </p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">
              {formData?.buyerNftAddress !== AddressZero
                ? "Token Id to Receive"
                : formData?.buyerTokenAddress !== AddressZero
                ? "Token amount to Receive"
                : "ETH to Receive"}
            </p>
            <p className="text-sm">
              {formData.buyerTokenAmount
                ? formData.buyerTokenAmount
                : formData.buyerNftTokenId
                ? formData.buyerNftTokenId
                : formData.buyerEthAmount}
            </p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Transaction Expiry Date</p>
            <p className="text-sm">{formData.datePeriod}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Transaction Expiry Time</p>
            <p className="text-sm">{formData.timePeriod}</p>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ReviewData;
