import React, { FormEvent, useEffect } from "react"
import { Network, Alchemy } from "alchemy-sdk"
import { ethers } from "ethers"
import { useAccount, useSigner } from "wagmi"
import { useState } from "react"
import { getConnectedUserTokens } from "../../../helpers/getterHelpers"
import { useMultistepForm } from "./useMultistepForm"
import dayjs from "dayjs"
import { TrustMe } from "typechain"
import abi from "../../../../abi.json"

import erc20Abi from "../../../../erc20Abi.json"
import {
  FormData,
  FormProps1,
  FormProps2,
  FormProps3,
  FormProps4,
  FormWrapperProps,
  TokenMetadata,
} from "./type"
import FormWrapper from "./FormWrapper"
import Pending from "./Pending"
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API,
  network: Network.ETH_GOERLI,
}

const alchemy = new Alchemy(settings)
// TYPES

// INITIAL DATA
const INITIAL_DATA: FormData = {
  buyerAddress: "",
  sellerTokenAddress: "",
  sellerTokenAmount: "",
  buyerTokenAddress: "",
  buyerTokenAmount: "",
  datePeriod: "",
  timePeriod: "",
}

export default function AddTradeForm() {
  const [sellerTokenMetadata, setSellerTokenMetadata] = React.useState<TokenMetadata[]>([])
  const [buyerTokenMetadata, setBuyerTokenMetadata] = React.useState<TokenMetadata[]>([])
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(false)
  const [formData, setFormData] = useState(INITIAL_DATA)
  const { address } = useAccount()

  async function checkSellerTokens() {
    try {
      setLoading(true)
      const sellerTokens = await getConnectedUserTokens(address!)
      setSellerTokenMetadata(sellerTokens)
      setLoading(true)
    } catch (error) {
      setLoading(false)
      alert("Something went wrong")
      console.log(error)
      return
    }
  }
  async function checkBuyerTokens(_address: string) {
    try {
      setLoading(true)
      const buyersTokens = await getConnectedUserTokens(_address)
      setBuyerTokenMetadata(buyersTokens)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert("Something went wrong")
      console.log(error)
      return
    }
  }

  useEffect(() => {
    checkSellerTokens()
  }, [])

  useEffect(() => {
    if (formData.buyerAddress) {
      checkBuyerTokens(formData.buyerAddress)
    }
  }, [formData.buyerAddress])

  function updateFields(fields: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  const BuyerAddress = ({ buyerAddress }: FormProps1) => (
    <FormWrapper title="Counter Party Address">
      <input
        className="p-2 rounded w-full"
        type="text"
        placeholder="Counter Party Address"
        name="sellerTokenAddress"
        required
        value={buyerAddress}
        onChange={(e) => updateFields({ buyerAddress: e.target.value })}
      />
    </FormWrapper>
  )

  const SellerTokenAddress = ({ sellerTokenAddress, sellerTokenAmount }: FormProps2) => (
    <FormWrapper title="Seller Token Details">
      <>
        <label>Seller Token Address</label>
        <select
          required
          name="tokenToTransfer"
          onChange={(e) => {
            updateFields({ sellerTokenAddress: e.target.value })
          }}
          className="block appearance-none w-full h-full border border-gray-100 p-3 pr-8 rounded "
          value={sellerTokenAddress}
        >
          <option value="" selected disabled>
            --select--
          </option>
          {sellerTokenMetadata.map((item, index) => (
            <option
              key={index}
              disabled={loading ? true : false}
              className="items-center text-small p-3"
              value={loading ? "" : item.address}
            >
              {loading ? "Loading..." : item.symbol}
            </option>
          ))}
        </select>
      </>
      <>
        <label>Seller Token Amount</label>
        <input
          placeholder="Token Amount"
          autoFocus
          type="number"
          name="sellerTokenAmount"
          required
          value={sellerTokenAmount}
          onChange={(e) => updateFields({ sellerTokenAmount: e.target.value })}
          className="p-2 rounded w-full"
        />
      </>
    </FormWrapper>
  )

  const BuyerTokenAddress = ({ buyerTokenAddress, buyerTokenAmount }: FormProps3) => (
    <FormWrapper title="Buyer Token Details">
      <label>Buyer Token Address</label>
      <select
        required
        name="tokenToTransfer"
        onChange={(e) => {
          updateFields({ buyerTokenAddress: e.target.value })
        }}
        className="block appearance-none w-full p-2 h-full border border-gray-100 pr-8 rounded "
        value={buyerTokenAddress}
      >
        <option value="" selected disabled className="items-center text-small p-2">
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

      <label>Buyer Token Amount</label>
      <input
        autoFocus
        type="number"
        name="buyerTokenAmount"
        required
        value={buyerTokenAmount}
        onChange={(e) => updateFields({ buyerTokenAmount: e.target.value })}
        className="p-2 rounded w-full"
      />
    </FormWrapper>
  )

  const TimePeriod = ({ datePeriod, timePeriod }: FormProps4) => (
    <FormWrapper title="Time Period">
      <label>Expiry Date</label>
      <input
        autoFocus
        type="date"
        name="datePeriod"
        required
        value={datePeriod}
        onChange={(e) => updateFields({ datePeriod: e.target.value })}
        className="p-2 rounded w-full"
      />
      <label>Expiry Time</label>
      <input
        className="p-2 rounded w-full"
        autoFocus
        type="time"
        name="timePeriod"
        required
        value={timePeriod}
        onChange={(e) => updateFields({ timePeriod: e.target.value })}
      />
    </FormWrapper>
  )

  const { steps, currentStepindex, isFirstStep, back, next, isLastStep, step } = useMultistepForm([
    <BuyerAddress {...formData} updateFields={updateFields} />,
    <SellerTokenAddress {...formData} updateFields={updateFields} />,
    <BuyerTokenAddress {...formData} updateFields={updateFields} />,
    <TimePeriod {...formData} updateFields={updateFields} />,
  ])
  const { data: signer } = useSigner()
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isLastStep) return next()
    event.preventDefault()

    const currentUnixTime = dayjs().unix()
    const unixTimeFuture = dayjs(formData.datePeriod + " " + formData.timePeriod).unix()

    const deadline = unixTimeFuture - currentUnixTime
    const trustMeContract: TrustMe = new ethers.Contract(
      "0xF112F9D64Db9BE8F33Ee2e49c625EB564e58a25E",
      abi,
      signer!
    ) as TrustMe

    const erc20Contract = new ethers.Contract(formData.sellerTokenAddress, erc20Abi, signer!)
    setPending(true)
    const _tx = await erc20Contract.approve(
      trustMeContract.address,
      ethers.utils.parseEther(formData.sellerTokenAmount.toString())
    )
    await _tx.wait()

    const tx = await trustMeContract.addTrade(
      formData.buyerAddress,
      formData.sellerTokenAddress,
      formData.buyerTokenAddress,
      ethers.utils.parseEther(formData.sellerTokenAmount.toString()),
      ethers.utils.parseEther(formData.buyerTokenAmount.toString()),
      deadline
    )
    const txReceipt = await tx.wait()
    setPending(false)
    console.log(txReceipt)
  }
  return (
    <div>
      <form className="flex items-center justify-center py-5 " onSubmit={onSubmit}>
        <div className="w-[500px] h-[470px] bg-text rounded-md flex flex-col border-[1px] px-[15px]">
          <div className="flex justify-end mt-3">{pending ? <Pending /> : null}</div>
          <h3 className="py-5 text-center font-bold text-lg">Create New Settlement</h3>
          {step}
          <div className="mt-1 flex gap-2 justify-end">
            {!isFirstStep && (
              <button
                className="px-4 py-2 text-white text-sm rounded shadow-md bg-blue-500"
                type="submit"
                onClick={back}
              >
                Back
              </button>
            )}
            <button
              className="px-4 py-2 text-white text-sm rounded shadow-md bg-blue-500"
              type="submit"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
