import React, { FormEvent, useEffect, FC } from "react"
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
import { FormData, FormProps1, FormProps2, FormProps3, FormProps4, TokenMetadata } from "./type"
import FormWrapper from "./FormWrapper"
import Pending from "./Pending"
import { AiOutlineCheck, AiOutlineLoading } from "react-icons/ai"
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API,
  network: Network.ETH_GOERLI,
}

const alchemy = new Alchemy(settings)
// TYPES

// INITIAL DATA
const INITIAL_DATA: FormData = {
  sellerAddress: "",
  buyerAddress: "",
  sellerTokenAddress: "",
  sellerTokenAmount: "",
  buyerTokenAddress: "",
  buyerTokenAmount: "",
  datePeriod: "",
  timePeriod: "",
}

type ReviewDataProps = {
  formData: FormData
}

export default function AddTradeForm() {
  const [sellerTokenMetadata, setSellerTokenMetadata] = React.useState<TokenMetadata[]>([])
  const [buyerTokenMetadata, setBuyerTokenMetadata] = React.useState<TokenMetadata[]>([])
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(false)
  const [formData, setFormData] = useState(INITIAL_DATA)
  const { address } = useAccount()
  const [isApproving, setIsApproving] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)

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

  const ReviewData: FC<ReviewDataProps> = ({
    formData: {
      buyerAddress,
      sellerTokenAddress,
      sellerTokenAmount,
      buyerTokenAddress,
      buyerTokenAmount,
      datePeriod,
      timePeriod,
    },
  }) => (
    <FormWrapper title="Review Data">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">Review your Settlement</h2>
        <div className="flex flex-col space-y-3 ">
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Your Address</p>
            <p className="text-xs ">{address}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Counter Party Address</p>
            <p className="text-xs">{buyerAddress}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Your Token Address</p>
            <p className="text-xs">{sellerTokenAddress}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold"> Token Amount</p>
            <p className="text-sm">{sellerTokenAmount}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Counter Party Token Address</p>
            <p className="text-xs">{buyerTokenAddress}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold"> Token Amount</p>
            <p className="text-sm">{buyerTokenAmount}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Expiry Date</p>
            <p className="text-sm">{datePeriod}</p>
          </div>
          <div className="md:flex flex-row justify-between border-b-2 border-gray-500">
            <p className="text-sm font-bold">Expiry Time</p>
            <p className="text-sm">{timePeriod}</p>
          </div>
        </div>
      </div>
    </FormWrapper>
  )

  const { steps, currentStepindex, isFirstStep, back, next, isLastStep, step } = useMultistepForm([
    <BuyerAddress {...formData} updateFields={updateFields} />,
    <SellerTokenAddress {...formData} updateFields={updateFields} />,
    <BuyerTokenAddress {...formData} updateFields={updateFields} />,
    <TimePeriod {...formData} updateFields={updateFields} />,
    <ReviewData formData={formData} />,
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

    setIsApproving(true)
    const _tx = await erc20Contract.approve(
      trustMeContract.address,
      ethers.utils.parseEther(formData.sellerTokenAmount.toString())
    )
    await _tx.wait()
    setIsApproving(false)

    setIsAdding(true)

    const tx = await trustMeContract.addTrade(
      formData.buyerAddress,
      formData.sellerTokenAddress,
      formData.buyerTokenAddress,
      ethers.utils.parseEther(formData.sellerTokenAmount.toString()),
      ethers.utils.parseEther(formData.buyerTokenAmount.toString()),
      deadline
    )
    const txReceipt = await tx.wait()
    setIsAdding(false)
    console.log(txReceipt)
  }
  return (
    <div
      className="w-screen
    "
    >
      <form className="flex items-center justify-center py-5 " onSubmit={onSubmit}>
        <div className="w-full h-full bg-text rounded-md flex flex-col border-[1px] px-[15px]">
          <div className="flex justify-end mt-3">{pending ? <Pending /> : null}</div>
          <h3 className="py-5 text-center font-bold text-lg">Create New Settlement</h3>
          {step}
          <div className="mt-1 flex gap-2 justify-between">
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
              onClick={() => {
                if (isLastStep) {
                  setIsButtonClicked(true)
                }
              }}
              // disabled={isButtonClicked && isLastStep}
            >
              {!isLastStep && !isAdding && !isApproving && !isButtonClicked && <span>Next</span>}
              {isLastStep && !isAdding && !isApproving && !isButtonClicked && (
                <>
                  <span>Submit for Approval</span>
                </>
              )}
              {isApproving && isLastStep && (
                <>
                  <AiOutlineLoading className="animate-spin h-5 w-5 " />
                  <span>Approving...</span>
                </>
              )}
              {isAdding && isLastStep && (
                <>
                  <AiOutlineLoading className="animate-spin h-5 w-5 " />
                  <span>Adding...</span>
                </>
              )}
              {isButtonClicked && isLastStep && !isAdding && !isApproving && (
                <>
                  <AiOutlineCheck className="text-green h-5 w-5" />
                  <span>Success</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
