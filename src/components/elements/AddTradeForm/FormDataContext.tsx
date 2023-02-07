import { ethers } from "ethers";
import React, { createContext, useContext, useState } from "react";
import { FormData } from "./type";
import { AddressZero } from "@ethersproject/constants";

type ProviderProps = {
  children: React.ReactNode;
};
type FormDataContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};
const FormContext = createContext<FormDataContextType>(
  {} as FormDataContextType,
);

export const FormProvider = ({ children }: ProviderProps) => {
  const [formData, setFormData] = useState<FormData>({
    sellerAddress: AddressZero,
    buyerAddress: AddressZero,
    sellerTokenAddress: AddressZero,
    sellerTokenAmount: AddressZero,
    buyerTokenAddress: AddressZero,
    buyerTokenAmount: 0,
    sellerNftAddress: AddressZero,
    sellerNftTokenId: 0,
    buyerNftAddress: AddressZero,
    buyerNftTokenId: 0,
    sellerEthAmount: 0,
    buyerEthAmount: 0,
    datePeriod: "0",
    timePeriod: "0",
  });
  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
export const useFormData = () => useContext(FormContext);
