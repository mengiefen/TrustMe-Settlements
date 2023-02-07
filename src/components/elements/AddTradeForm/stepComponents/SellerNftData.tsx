import { getNftsMetadata, NftDetails } from "@/helpers/getterHelpers";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useFormData } from "../FormDataContext";
import FormWrapper from "../FormWrapper";

const SellerNftData = () => {
  const { formData, setFormData } = useFormData();
  const [loading, setLoading] = useState(false);
  const [sellerNfts, setSellerNfts] = useState<NftDetails[]>(
    [] as NftDetails[],
  );
  const { address } = useAccount();
  useEffect(() => {
    (async () => {
      try {
        const getNfts = await getNftsMetadata(address as `0x${string}`);
        setSellerNfts(getNfts as NftDetails[]);
        setLoading(false);
        // console.log(getNfts);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    })();
  }, []);

  return (
    <FormWrapper title="Details NFT to Send">
      <>
        <label className="md:mt-2">NFT to Send</label>
        <select
          required
          name="tokenToTransfer"
          value={formData?.sellerNftAddress}
          onChange={(e) => {
            setFormData({
              ...formData,
              sellerNftAddress: e.target.value,
            });
          }}
          className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
          //     value={formData.sellerNftAddress || ""}
        >
          <option value="" selected disabled>
            --SELECT--
          </option>
          {sellerNfts?.length &&
            sellerNfts.map((nft, index) => (
              <option
                key={index}
                disabled={loading ? true : false}
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
                  <span>{nft.title ? nft.title : nft.address}</span>
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
          //     value={formData?.sellerNftTokenId || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              sellerNftTokenId: parseInt(e.target.value),
            })
          }
          className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
        />
      </>
    </FormWrapper>
  );
};

export default SellerNftData;
