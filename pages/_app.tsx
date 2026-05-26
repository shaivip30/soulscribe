// @ts-ignore: allow side-effect import of global CSS without type declarations
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen w-full">
      <Component {...pageProps} />
    </div>
  );
}
