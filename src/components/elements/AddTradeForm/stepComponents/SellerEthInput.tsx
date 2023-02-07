import React from "react";
import { useFormData } from "../FormDataContext";
import FormWrapper from "../FormWrapper";

const SellerEthInput = () => {
  const { formData, setFormData } = useFormData();
  return (
    <FormWrapper title="ETH to Send">
      <label className="md:mt-2">How much eth baby?</label>
      <input
        placeholder="Asset Amount"
        autoFocus
        type="text"
        name="sellerTokenAmount"
        //   value={formData?.sellerEthAmount || 0}
        onChange={(e) => {
          console.log(parseFloat(e.target.value));
          setFormData({
            ...formData,
            sellerEthAmount: parseFloat(e.target.value),
          });
        }}
        className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
      />
    </FormWrapper>
  );
};

export default SellerEthInput;
