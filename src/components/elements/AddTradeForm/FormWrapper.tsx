import React from "react"
import { FormWrapperProps } from "./type"

function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <h3 className="text-center font-medium">{title}</h3>
      <div className="grid gap-2 grid-col"> {children}</div>
    </div>
  )
}

export default FormWrapper
