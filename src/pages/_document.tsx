import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${process.env.BASE_URL || ''}/favicons/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${process.env.BASE_URL || ''}/favicons/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${process.env.BASE_URL || ''}/favicons/favicon-16x16.png`}
          />
          <link
            rel="manifest"
            href={`${process.env.BASE_URL || ''}/favicons/site.webmanifest"`}
          />
          <link
            rel="mask-icon"
            href={`${
              process.env.BASE_URL || ''
            }/favicons/safari-pinned-tab.svg`}
            color="#5bbad5"
          />
          <link
            rel="shortcut icon"
            href={`${process.env.BASE_URL || ''}/favicons/favicon.ico`}
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
