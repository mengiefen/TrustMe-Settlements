import { mainnet, goerli, polygon } from "wagmi/chains"
import { createClient, configureChains } from "wagmi"

import { alchemyProvider } from "wagmi/providers/alchemy"
import { InjectedConnector } from "wagmi/connectors/injected"

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || ""

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, polygon],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY })]
)

// Set up client
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

export default client

export { chains, provider }
