import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Montserrat } from "next/font/google";
import Layout from "@/components/Layout";
import { MainProvider } from "@/components/Context/context";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Head>
        <title>Movie Sphere</title>
        <meta name="description" content="A movie site named movie sphere" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MainProvider>
    </div>
  );
}
