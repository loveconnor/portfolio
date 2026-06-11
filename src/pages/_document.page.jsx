import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta name="google-site-verification" content="_GxugHkYj4_FXIf1a7C_V27nz6byPmPrtgf8jIC4HfY" />
          <link rel="preload" href="/fonts/LoveSans-Regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/LoveSans-Medium.woff" as="font" type="font/woff" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/LoveSans-Bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
