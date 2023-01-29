import React, { ReactComponentElement, ReactElement } from "react"
import Header from "@/components/elements/Header"
import Footer from "@/components/elements/Footer"
import { useRouter } from "next/router"

type LayoutProps = {
  children: ReactElement<any> | ReactComponentElement<any>
  bg?: string
  logoPrimaryColor?: string
}

const Layout = (props: LayoutProps) => {
  const router = useRouter()
  const pathname = router.pathname
  const background = pathname !== "/" ? `bg-text${props.bg}` : ""
  const logoColor = pathname !== "/" ? `text-bg${props.logoPrimaryColor}` : ""
  return (
    <>
      <Header bg={background} logoPrimaryColor={logoColor} />
      {props.children}
      {router.pathname === "/" && <Footer />}
    </>
  )
}

export default Layout
