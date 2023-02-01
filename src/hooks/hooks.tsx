import React, { useState, useEffect } from "react"
import { useDisconnect } from "wagmi"

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])
  return windowWidth
}

export const useEthereum = () => {
  const [ethereum, setEthereum] = useState(false)

  useEffect(() => {
    if (window.ethereum) {
      setEthereum(true)
    }
  }, [])

  return ethereum
}

export const useFormatAddress = (address: `0x${string}` | undefined | string) => {
  if (address != undefined) {
    return address?.slice(0, 4) + "..." + address?.slice(-4)
  }

  return ""
}

const useConnectWallet = () => {}

const useDisconnectWallet = () => {
  const { disconnect } = useDisconnect()
}

export const useFormatDate = (unixTime: number) => {
  const date = new Date(unixTime * 1000)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${day}/${month}/${year} ${changeTo12Hour(hours, minutes, seconds)}`
}

export const useFormatDateStatus = (unixTime: number) => {
  const date = new Date(unixTime * 1000).getTime() // Unix timestamp in milliseconds
  const dateNow = new Date().getTime() // Unix timestamp in milliseconds

  console.log("date", date)
  console.log("dateNow", dateNow)

  if (date > dateNow) {
    return "Pending"
  }

  return "Expired"
}

const changeTo12Hour = (hours: number, minutes: number, seconds: number) => {
  let hours12 = hours
  let ampm = "AM"

  if (hours12 > 12) {
    hours12 = hours12 - 12
    ampm = "PM"
  }

  return `${hours12}:${minutes}:${seconds} ${ampm}`
}

export const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}


const useCopyToClipboard = () => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = (text:string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess('Copied!');
      },
      (error) => {
        setCopySuccess('Failed to copy.');
      }
    );
  };

  return [copySuccess, copyToClipboard];
};

export default useCopyToClipboard;

