import React from "react"

const Pending = () => {
  return (
    <div className="flex items-center justify-center space-x-2 animate-bounce">
      Pending...
      <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
      <div className="w-4 h-4 bg-black rounded-full"></div>
    </div>
  )
}

export default Pending
