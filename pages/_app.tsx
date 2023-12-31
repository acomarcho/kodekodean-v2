import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import UserProvider from "@/lib/contexts/user/provider";
import Head from "next/head";
import { Notifications } from "@mantine/notifications";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>kodekodean.id</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <main className={`${inter.variable}`}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "dark" }}
        >
          <UserProvider>
            <Notifications position="top-center" />
            <Component {...pageProps} />
          </UserProvider>
        </MantineProvider>
      </main>
    </>
  );
}
