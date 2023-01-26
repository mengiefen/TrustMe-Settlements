import React, { ReactComponentElement, ReactElement } from "react"
import Header from "@/components/elements/Header"
import FlashMessage from "@/components/elements/FlashMessage"

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

      <FlashMessage
        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nisi deleniti."
        type="warning"
      />
    </>
  )
}

export default PageLayout
