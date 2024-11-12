import { CaipNetwork } from "@reown/appkit";

export const chainMap: {
    [key: number]: {
        key: string;
        chain: CaipNetwork;
    };
} = {};

export const getInforChain = (chainID: number) => {
    chainID = Number(chainID);
    const chain = chainMap?.[chainID];

    if (!chain) {
        throw new Error("Chain not found");
    }

    return chain;
};

export function getKeyChain(): string {
    const chainID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 1);
    return getInforChain(chainID)?.key;
}

export function getChain(): CaipNetwork {
    const chainID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 1);
    return getInforChain(chainID)?.chain;
}
