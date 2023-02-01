import "@/styles/globals.css"
import type { AppProps } from "next/app"
import WagmiProvider from "../connector/connect"
import StoreProvider from "@/redux/StoreProvider"


const App = ({ Component, pageProps }: AppProps) => {

  return (
    <main className="font-poppins">
      <StoreProvider>
        <WagmiProvider>
          <Component {...pageProps} />
        </WagmiProvider>
      </StoreProvider>
    </main>
  )
}

export default App
