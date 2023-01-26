import { useEffect, useLayoutEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import React from "react"
import { BsCheckCircle } from "react-icons/bs"

const customId = "message-alert"

type FlashMessageProps = {
  message: string
  type?: "alert" | "success" | "info" | "warning" | "error" | "success" | "dark"
  duration?: number
}

const FlashMessage = ({
  message,
  type = "info",
  duration = 3000,
  ...props
}: FlashMessageProps) => {
  const notify = () => {
    switch (type) {
      case "alert":
        toast.error(message, {
          style: {
            backgroundColor: "#fdd8d1",
            color: "#911007",
            letterSpacing: "1.5px",
            boxShadow: "0px 0px 3px #f0ada4",
            marginTop: "70px",
          },
          position: toast.POSITION.TOP_RIGHT,
          toastId: customId,
          delay: 1000,
          progressStyle: {
            background: "#911007",
          },
        })
        break

      case "success":
        toast.success(message, {
          icon: <BsCheckCircle className="text-2xl text-green-700" />,
          style: {
            backgroundColor: "#ccf0c1",
            color: "#057a05",
            letterSpacing: "1.5px",
            boxShadow: "0px 0px 3px #8fee77",
            marginTop: "70px",
          },
          position: toast.POSITION.TOP_RIGHT,
          toastId: customId,
          delay: 1000,

          progressStyle: {
            background: "#057a05",
          },
        })

        break

      case "info":
        toast.info(message, {
          style: {
            backgroundColor: "#b1ecd4",
            color: "#049682",
            letterSpacing: "1.5px",
            boxShadow: "0px 0px 3px #77eeac",
            marginTop: "70px",
          },
          position: toast.POSITION.TOP_RIGHT,
          toastId: customId,
          delay: 1000,

          progressStyle: {
            background: "#049682",
          },
        })
        break
      case "warning":
        toast.warning(message, {
          style: {
            backgroundColor: "#eef1a9",
            color: "#222",
            letterSpacing: "1.5px",

            boxShadow: "0px 0px 3px #f1e85c",
            marginTop: "70px",
          },
          position: toast.POSITION.TOP_RIGHT,
          toastId: customId,
          delay: 1000,

          progressStyle: {
            background: "#c5a206",
          },
        })
        break
      default:
        toast.info(message, {
          style: {
            backgroundColor: "#bbdcf7",
            color: "#074391",
            letterSpacing: "1.5px",
            boxShadow: "0px 0px 3px #77abee",
            marginTop: "70px",
          },
          position: toast.POSITION.TOP_RIGHT,
          toastId: customId,
          delay: 1000,
          progressStyle: {
            background: "#074391",
          },
        })
    }
  }

  useEffect(() => {
    notify()
  }, [])

  return (
    <div>
      <ToastContainer autoClose={duration} style={{ zIndex: "1111" }} />
    </div>
  )
}

export default FlashMessage
