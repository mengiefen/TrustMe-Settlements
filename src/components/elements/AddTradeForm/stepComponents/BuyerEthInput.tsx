import React from "react";
import { useFormData } from "../FormDataContext";
import FormWrapper from "../FormWrapper";
const BuyerEthInput = () => {
  const { formData, setFormData } = useFormData();
  return (
    <FormWrapper title="ETH to Receive">
      <label className="md:mt-2">How much ETH Baby?</label>
      <input
        placeholder="Asset Amount"
        autoFocus
        type="number"
        name="sellerTokenAmount"
        required
        //   value={formData?.buyerEthAmount || 0}
        onChange={(e) =>
          setFormData({
            ...formData,
            buyerEthAmount: parseInt(e.target.value),
          })
        }
        className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
      />
    </FormWrapper>
  );
};
export default BuyerEthInput;
