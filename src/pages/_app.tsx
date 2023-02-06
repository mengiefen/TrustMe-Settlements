import "@/styles/globals.css";
import type { AppProps } from "next/app";
import WagmiProvider from "../connector/connect";
import StoreProvider from "@/redux/StoreProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persister } from "@/redux/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/38778/trustme-subgraph/0.0.13",
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className="font-poppins">
      <ApolloProvider client={client}>
        <StoreProvider>
          <PersistGate persistor={persister} loading={null}>
            <WagmiProvider>
              <Component {...pageProps} />
            </WagmiProvider>
          </PersistGate>
        </StoreProvider>
      </ApolloProvider>
    </main>
  );
};

export default App;
