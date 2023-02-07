import { getNftsMetadata, NftDetails } from "@/helpers/getterHelpers";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useFormData } from "../FormDataContext";
import FormWrapper from "../FormWrapper";

const BuyerNftData = () => {
  const { formData, setFormData } = useFormData();
  const [loading, setLoading] = useState(false);
  const [buyerNfts, setBuyerNfts] = useState<NftDetails[]>([] as NftDetails[]);
  useEffect(() => {
    (async () => {
      try {
        const getNfts = await getNftsMetadata(
          formData.buyerAddress as `0x${string}`,
        );
        setBuyerNfts(getNfts as NftDetails[]);
        setLoading(false);
        console.log(getNfts);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    })();
  }, []);
  return (
    <FormWrapper title="Details NFT to Recieve">
      <>
        <label className="md:mt-2">NFT to Recieve</label>
        <select
          required
          name="tokenToTransfer"
          // value={formData?.buyerNftAddress}
          onChange={(e) => {
            console.log(e.target.value);
            setFormData({
              ...formData,
              buyerNftAddress: e.target.value,
              //   buyerNftTokenId:
            });
          }}
          className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
          //     value={formData?.sellerNftAddress}
        >
          <option value="" selected disabled>
            --SELECT--
          </option>
          {buyerNfts?.length &&
            buyerNfts.map((nft, index) => (
              <option
                key={index}
                // disabled={loading ? true : false}
                className="
              items-center
              justify-between
              flex
              text-sm
              font-medium
              text-white
              bg-slate-700
              hover:bg-slate-600
              focus:outline-none
              focus:bg-slate-600
              transition
              duration-150
              ease-in-out
              rounded-md
              px-4
              py-2

              "
                value={nft.address}
              >
                {loading ? (
                  "Loading..."
                ) : (
                  <span>
                    Name: {nft.title}, Token Id: {nft.tokenId}
                  </span>
                )}
              </option>
            ))}
        </select>
        <label className="md:mt-2">NFT ID</label>
        <input
          placeholder="NFT ID"
          autoFocus
          type="number"
          name="sellerTokenAmount"
          required
          //     value={formData?.sellerNftTokenId || 0}
          onChange={(e) => {
            console.log(e.target.value);
            setFormData({
              ...formData,
              buyerNftTokenId: parseInt(e.target.value),
            });
          }}
          className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
        />
      </>
    </FormWrapper>
  );
};

export default BuyerNftData;
