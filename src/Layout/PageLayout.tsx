import React, { ReactComponentElement, ReactElement } from "react"
import Header from "@/components/elements/Header"
import Footer from "@/components/elements/Footer"

type LayoutProps = {
  children: ReactElement<any> | ReactComponentElement<any>
  bg?: string
  logoPrimaryColor?: string
}

const PageLayout = (props: LayoutProps) => {
  return (
    <>
      <Header bg="bg-text" logoPrimaryColor="text-bg" />
      {props.children}
    </>
  )
}

export default PageLayout
