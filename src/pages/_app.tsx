import "@/styles/globals.css";
import type { AppProps } from "next/app";
import WagmiProvider from "../connector/connect";
import StoreProvider from "@/redux/StoreProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persister } from "@/redux/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className="font-poppins">
      <StoreProvider>
        <PersistGate persistor={persister} loading={null}>
          <WagmiProvider>
            <Component {...pageProps} />
          </WagmiProvider>
        </PersistGate>
      </StoreProvider>
    </main>
  );
};

export default App;
