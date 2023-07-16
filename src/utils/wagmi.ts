import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { thunderTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const { chains, publicClient } = configureChains(
  [thunderTestnet],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "my-app",
  projectId: "YOUR_PROJECT_ID",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default wagmiConfig;
