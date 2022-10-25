import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;700&family=Major+Mono+Display&family=Roboto+Mono:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/images/favicon.png" />
        <meta property="og:image" content="/images/screen-prints-fur2.jpg" />
        <meta
          name="og:title"
          content={"North Shore Shop - Art and Music in Rogers Park"}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
