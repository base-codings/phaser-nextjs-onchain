"use client";

import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { WagmiProvider, type Config } from "wagmi";
import envConfig from "@/core/envConfig";
import { networks, projectId, wagmiAdapter } from "@/core/config";
import { metadataConfig } from "@/core/metadataConfig";

// Set up queryClient

if (!projectId) {
    throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
    name: metadataConfig.name,
    description: metadataConfig.description,
    url: envConfig.CLIENT_URI as string,
    icons: [
        "/icon-192x192.png",
        "/icon-256x256.png",
        "/icon-384x384.png",
        "/icon-512x512.png",
    ],
};

// Create the modal
createAppKit({
    adapters: [wagmiAdapter],
    projectId: envConfig.PROJECT_ID as string,
    networks: networks as any,
    defaultNetwork: networks[0] as any,
    metadata: metadata,
    features: {
        email: false,
        socials: false,
        emailShowWallets: false,
        swaps: false,
        onramp: false,
    },
    featuredWalletIds: [
        "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", //metamask
    ],

    chainImages: {},
    allowUnsupportedChain: true,
});

function Web3Provider({ children }: { children: ReactNode }) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
            {children}
        </WagmiProvider>
    );
}

export default Web3Provider;
