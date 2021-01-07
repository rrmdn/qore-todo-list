import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/todomvc-app-css@2.3.0/index.css"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
