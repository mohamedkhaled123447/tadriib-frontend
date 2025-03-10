import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html dir="rtl">
      <Head>
        <meta name="theme-color" content="#252525" />
        <meta name="monetag" content="02219a79c1eebc77bf862ac8cc013b62" />
        <link rel="icon" href="/logo.png" />

        <link rel="apple-touch-icon" href="/logo.png"></link>
      </Head>

      <body>
        <Main /> <NextScript />
      </body>
    </Html>
  );
}
