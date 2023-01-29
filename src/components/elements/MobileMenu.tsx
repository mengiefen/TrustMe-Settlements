import { useFormatAddress } from "@/hooks/hook"
import Link from "next/link"
import React, { useEffect } from "react"
import Button from "./Button"
import { useAccount, useDisconnect, useConnect } from "wagmi"
import { useIsMounted } from "@/hooks/useIsMounted"
import { InjectedConnector } from "@wagmi/core"

type menuProps = {
  isActive: boolean
  showMenu: () => void
}

const MobileMenu = (props: menuProps) => {
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()
  const { connectAsync, connectors } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { showMenu, isActive } = props
  const [buttonText, setButtonText] = React.useState("Connect Wallet")

  const formattedAddress = useFormatAddress(address || "")

  const handleDisconnect = () => {
    disconnect()
    setButtonText("Connect Wallet")
  }

  const handleConnect = async () => {
    if (isMounted) {
      setButtonText("Disconnect Wallet")
      await connectAsync({ connector: connectors[0] })
    }
  }

  return (
    <div
      className={
        isActive
          ? "w-screen h-screen flex flex-col bg-black bg-opacity-50 items-center justify-start pt-10"
          : "hidden"
      }
    >
      <div className="flex flex-col bg-black w-11/12 px-[60px] py-5">
        <div className="flex flex-row justify-end">
          <ul className="flex flex-col items-end justify-end">
            <li className="py-1">
              <Link href="/" className="py-2 text-white text-base">
                Home
              </Link>
            </li>
            <li className="py-1">
              <Link href="/" className="py-2 text-white text-base">
                Services
              </Link>
            </li>
            <li className="py-1">
              <Link href="/" className="py-2 text-white text-base">
                About us
              </Link>
            </li>
            <li className="py-1">
              <Link href="/" className="py-2 text-white text-base">
                Contact us
              </Link>
            </li>
            <li className="py-1">
              <Link href="/1" className="py-2 text-white text-base">
                Transactions
              </Link>
            </li>
          </ul>
        </div>

        <div className="btn-div items-center justify-center pl-8 my-5">
          {isMounted && (
            <>
              {isConnected ? (
                <>
                  <Button label={buttonText} onClick={() => handleDisconnect()} />

                  <div className=" flex flex-row address pt-10">
                    <small className="flex flex-row text-white">
                      <>Connected To {formattedAddress}</>
                      <span className=" pl-1 pt-[1px]">&#8208;</span>
                    </small>
                  </div>
                </>
              ) : (
                <Button label={buttonText} onClick={() => handleConnect()} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
