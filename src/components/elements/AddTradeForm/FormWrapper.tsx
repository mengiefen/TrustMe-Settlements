import React from "react"
import { FormWrapperProps } from "./type"

function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="flex flex-col gap-2 md:p-5">
      <h3 className="font-medium uppercase text-lg">{title}</h3>
      <div className="grid gap-2 grid-col"> {children}</div>
    </div>
  )
}

export default FormWrapper
