import React, { ReactComponentElement, ReactElement } from "react"
import Header from "@/components/elements/Header"
import Footer from "@/components/elements/Footer"
import FlashMessage from "@/components/elements/FlashMessage"

type LayoutProps = {
  children: ReactElement<any> | ReactComponentElement<any>
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Header />
      {props.children}

      <Footer />

      {/* <FlashMessage message="Hello" type="warning" /> */}
    </>
  )
}

export default Layout
