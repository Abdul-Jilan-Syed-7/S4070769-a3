import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PremiumProvider } from "@/context/PremiumContext";

export default function App({ Component, pageProps }: AppProps) {
  return  (
    <PremiumProvider>
      <Component {...pageProps} />
    </PremiumProvider>
  );
}
