import { mainnet, goerli, polygon } from "wagmi/chains";
import { createClient, configureChains, WagmiConfig } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Alchemy, Network } from "alchemy-sdk";

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "";
const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || "";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, polygon],
  [
    alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
    infuraProvider({ apiKey: INFURA_API_KEY }),
    publicProvider(),
  ],
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
        shimDisconnect: true,
      },
    }),

    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

// Alchemy SDK
const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY,
  network: Network.ETH_GOERLI,
};

export const alchemy = new Alchemy(config);

interface WagmiProviderProps {
  children: React.ReactNode;
}

const WagmiProvider: React.FC<WagmiProviderProps> = ({ children }) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};

export { client, chains, provider };
export default WagmiProvider;
