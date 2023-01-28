import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import notify from "./toastItems"

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
  useEffect(() => {
    notify(type, message)
  }, [])

  return (
    <div>
      <ToastContainer autoClose={duration} style={{ zIndex: "1111" }} />
    </div>
  )
}

export default FlashMessage
