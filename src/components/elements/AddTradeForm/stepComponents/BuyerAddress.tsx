import { useFormData } from "../FormDataContext";
import FormWrapper from "../FormWrapper";

const BuyerAddress = () => {
  const { formData, setFormData } = useFormData();
  return (
    <FormWrapper title="Counterparty Address">
      <input
        className="py-3 px-3 bg-bg border-2 outline-none border-secondary-700 focus:border-secondary-900 w-full text-white"
        type="text"
        placeholder="Counterparty Address"
        name="sellerTokenAddress"
        required
        //   value={formData?.buyerAddress || ""}
        onChange={(e) => {
          setFormData({ ...formData, buyerAddress: e.target.value });
        }}
      />
    </FormWrapper>
  );
};
export default BuyerAddress;
