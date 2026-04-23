import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta name="google-site-verification" content="_GxugHkYj4_FXIf1a7C_V27nz6byPmPrtgf8jIC4HfY" />
          <link href="/fonts/NeueHaasDisplayBold.woff2" as="font" type="font/woff2" />
          <link href="/fonts/NeueHaasDisplayLight.woff2" as="font" type="font/woff2" />
          <link href="/fonts/NeueHaasDisplayLightItalic.woff2" as="font" type="font/woff2" />
          <link href="/fonts/NeueHaasDisplayMedium.woff2" as="font" type="font/woff2" />
          <link href="/fonts/NeueHaasDisplayRoman.woff2" as="font" type="font/woff2" />
          <link href="/fonts/NeueHaasDisplayRomanItalic.woff2" as="font" type="font/woff2" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
