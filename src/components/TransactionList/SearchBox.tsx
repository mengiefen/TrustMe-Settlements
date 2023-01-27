import React from "react"
import { FaSearch } from "react-icons/fa"

const SearchBox = () => {
  return (
    <div className="relative h-10 my-2">
      <input
        type="text"
        className="w-full h-full pl-10 pr-4 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
      />
      <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-secondary-200" />
    </div>
  )
}

export default SearchBox
