import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/header";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import wagmiConfig, { chains } from "../utils/wagmi";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          coolMode
          theme={lightTheme({
            accentColor: "#732fff",
            borderRadius: "large",
            overlayBlur: "small",
            fontStack: "system",
          })}
          chains={chains}
        >
          <Header />
          <div className="min-h-[calc(100vh-68px)] pt-16 px-2 sm:px-4">
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
