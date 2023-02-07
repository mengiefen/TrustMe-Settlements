import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFormData } from "../FormDataContext";
import FormWrapper from "../FormWrapper";

const SellerTokenAddress = () => {
  const [loading, setLoading] = useState(false);
  const { address: userAddress, userBalances } = useSelector(
    (state: RootState) => state.wallets,
  );
  const { formData, setFormData } = useFormData();
  return (
    <FormWrapper title="Details Token to Send">
      <>
        <label className="md:mt-2">Token to Send</label>
        <select
          required
          name="tokenToTransfer"
          onChange={(e) => {
            setFormData({ ...formData, sellerTokenAddress: e.target.value });
          }}
          className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
          // value={formData?.sellerTokenAddress}
        >
          <option value="" selected disabled>
            --SELECT--
          </option>
          {userBalances.tokens.map((token, index) => (
            <option
              key={index}
              // disabled={loading ? true : false}
              className="items-center text-sm md:text-md p-3 hover:bg-slate-600 w-full"
              value={token.address || ""}
            >
              {loading ? (
                "Loading..."
              ) : (
                <div className="flex justify-between w-full">
                  <span
                    className="mr-5 md:mr-10 py-1 font-bold"
                    data-symbol={token.symbol}
                  >
                    Asset:
                    {token.symbol}
                  </span>

                  <span> Balance: {token.balance}</span>
                </div>
              )}
            </option>
          ))}
        </select>
      </>
      <>
        <label className="md:mt-2">Amount Token to Send</label>
        <input
          placeholder="Asset Amount"
          autoFocus
          type="number"
          name="sellerTokenAmount"
          required
          // value={formData.sellerTokenAmount || 0}
          onChange={(e) =>
            setFormData({
              ...formData,
              sellerTokenAmount: e.target.value,
            })
          }
          className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
        />
      </>
    </FormWrapper>
  );
};

export default SellerTokenAddress;
