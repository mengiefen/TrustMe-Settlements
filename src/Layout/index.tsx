import React, { ReactComponentElement, ReactElement } from "react"
import Header from "@/components/elements/Header"
import Footer from "@/components/elements/Footer"

type LayoutProps = {
  children: ReactElement<any> | ReactComponentElement<any>
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Header />
      {props.children}

      <Footer />
    </>
  )
}

export default Layout
