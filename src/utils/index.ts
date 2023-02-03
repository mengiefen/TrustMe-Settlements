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
      return "Canceled"
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

export const getFormatDate = (unixTime: number) => {
  const date = new Date(unixTime * 1000)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${day}/${month}/${year} ${changeTo12Hour(hours, minutes, seconds)}`
}

const changeTo12Hour = (hours: number, minutes: number, seconds: number) => {
  let hours12 = hours
  let ampm = "AM"

  if (hours12 > 12) {
    hours12 = hours12 - 12
    ampm = "PM"
  }

  return `${hours12}:${minutes} ${ampm}`
}

export const getFormatAddress = (address: `0x${string}` | undefined | string) => {
  if (address != undefined && address != "" && address != null) {
    return address?.slice(0, 4) + " ... " + address?.slice(-4)
  }

  return ""
}
