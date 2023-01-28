import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { wrapper } from "@/redux/store"
import { useRouter } from "next/router"
import { WagmiConfig } from "wagmi"
import client from "../connector/connect"

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  console.log(router.pathname)

  return (
    <main className="font-poppins">
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </main>
  )
}

export default wrapper.withRedux(App)
