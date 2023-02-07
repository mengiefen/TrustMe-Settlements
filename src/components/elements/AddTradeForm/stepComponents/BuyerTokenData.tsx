import { getConnectedUserTokens } from "@/helpers/getterHelpers";
import React, { useEffect, useState } from "react";
import { useFormData } from "../FormDataContext";
import FormWrapper from "../FormWrapper";
import { TokenMetadata } from "../type";

const BuyerTokenData = () => {
  const [loading, setLoading] = useState(false);
  const [buyerTokenMetadata, setBuyerTokenMetadata] = React.useState<
    TokenMetadata[]
  >([]);
  async function checkBuyerTokens(_address: string) {
    try {
      setLoading(true);
      const buyersTokens = await getConnectedUserTokens(_address);
      setBuyerTokenMetadata(buyersTokens);

      console.log(buyersTokens);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
      console.log(error);
      return;
    }
  }

  const { formData, setFormData } = useFormData();

  useEffect(() => {
    (async () => {
      if (formData?.buyerAddress) {
        const metaData = await checkBuyerTokens(formData?.buyerAddress);
        //   setBuyerTokenMetadata(metaData);
      }
    })();
  }, [formData.buyerAddress]);

  return (
    <FormWrapper title="Details Token to Receive">
      <label>Token To Receive </label>
      <span className="text-xs text-gray-400">
        These are the available token in buyer address
      </span>
      <select
        required
        name="tokenToTransfer"
        onChange={(e) => {
          setFormData({
            ...formData,
            buyerTokenAddress: e.target.value,
          });
        }}
        className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
        //   value={formData?.buyerTokenAddress || ""}
      >
        <option
          value=""
          selected
          disabled
          className="items-center text-small p-2"
        >
          --select--
        </option>
        {buyerTokenMetadata.map((token, key) => (
          <option
            key={key}
            className="items-center text-sm"
            value={loading ? "" : token.address}
            disabled={loading ? true : false}
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

      <label>Amount Token to Receive</label>
      <input
        autoFocus
        type="number"
        name="buyerTokenAmount"
        required
        //   value={formData?.buyerTokenAmount || 0}
        onChange={(e) =>
          setFormData({
            ...formData,
            buyerTokenAmount: parseInt(e.target.value),
          })
        }
        className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
      />
    </FormWrapper>
  );
};

export default BuyerTokenData;
