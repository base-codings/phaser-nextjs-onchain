import { metadataConfig } from "@/core/metadataConfig";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>{metadataConfig.name}</title>

                <meta name="description" content={metadataConfig.description} />
                <meta
                    property="og:description"
                    content={metadataConfig.description}
                />
                <meta
                    name="twitter:description"
                    content={metadataConfig.description}
                />
                <meta property="og:title" content={metadataConfig.name} />
                <meta name="title" content={metadataConfig.name} />
                <meta name="twitter:title" content={metadataConfig.name} />

                <meta itemProp="image" content={metadataConfig.thumbnail} />
                <meta property="og:image" content={metadataConfig.thumbnail} />
                <meta name="twitter:image" content={metadataConfig.thumbnail} />

                <meta name="og:image:alt" content={metadataConfig.name} />

                <meta
                    property="og:url"
                    content={
                        typeof window != "undefined" ? window.location.href : ""
                    }
                />

                <meta
                    property="og:tag"
                    content={`${metadataConfig.tags?.map((item: string) => {
                        return item;
                    })}`}
                />

                <meta name="twitter:card" content="summary_large_image" />

                <meta name="mobile-web-app-capable" content="yes" />

                <meta name="application-name" content={metadataConfig.name} />
                <meta
                    name="apple-mobile-web-app-title"
                    content={metadataConfig.name}
                />

                <link rel="icon" href="/favicon.png" />
                <link
                    href="/fonts/fonts.css"
                    rel="stylesheet"
                    type="text/css"
                />
                <link
                    crossOrigin="use-credentials"
                    rel="manifest"
                    href="/manifest.json"
                />
                <meta name="theme-color" content="#2b1718" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="msapplication-starturl" content="/" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
