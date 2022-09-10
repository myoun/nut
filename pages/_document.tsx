import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link href="https://fonts.googleapis.com/css?family=Gothic+A1:100,400" rel="stylesheet"></link>
          </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}