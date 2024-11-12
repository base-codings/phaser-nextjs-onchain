import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import envConfig from "./envConfig";
import { getChain } from "./chains";
import { fallback, http } from "viem";

// Get projectId from https://cloud.reown.com
export const projectId = envConfig.PROJECT_ID;

if (!projectId) {
    throw new Error("Project ID is not defined");
}

export const networks = [getChain()];

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: true,
    projectId,
    networks,
    transports: {
        [networks[0].id]: fallback(
            getChain().rpcUrls.default.http.map((item) => {
                return http(item);
            })
        ),
    },
});

export const config = wagmiAdapter.wagmiConfig;
