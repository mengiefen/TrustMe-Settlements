import React, { useMemo } from "react"
import { AiOutlineLoading, AiOutlineLoading3Quarters } from "react-icons/ai"
import { FaSpinner } from "react-icons/fa"

interface SpinnerProps {
  className?: string
  icon?: "dots" | "quarter"
}

const Spinner = (props: SpinnerProps) => {
  const {
    className = "w-10 h-10 mr-2 text-gray-300 dark:text-gray-600 fill-blue-600 animate-spin",
    icon = "spinner",
  } = props

  const selectIcon = useMemo(() => {
    switch (icon) {
      case "dots":
        return <FaSpinner className={className} />
      case "quarter":
        return <AiOutlineLoading3Quarters className={className} />
      default:
        return <AiOutlineLoading className={className} />
    }
  }, [icon, className])

  return (
    <div role="status">
      {selectIcon}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner
