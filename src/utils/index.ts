import { BigNumber, ethers, Signer } from "ethers"
import { ERC20_ABI } from "../constants/ERC20_ABI"
import { getSigner } from "@/helpers/getterHelpers"

export function formatInt(value: BigNumber) {
  return Number(value._hex) / 10 ** 18
}
export const getStatus = (value: number) => {
  switch (Number(value)) {
    case 0:
      return "Pending"
    case 1:
      return "Completed"
    case 2:
      return "Cancelled"
    case 3:
      return "Expired"
    case 4:
      return "Withdrawn"
    default:
      return "Unknown"
  }
}

export const getSymbol = async (tokenAddress: string) => {
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, (await getSigner()) as Signer)
  const symbol = await tokenContract.symbol()
  return symbol
}
