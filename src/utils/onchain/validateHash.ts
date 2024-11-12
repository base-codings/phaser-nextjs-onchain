import { wagmiAdapter } from "@/core/config";
import { getTransactionReceipt } from "@wagmi/core";

export default async function validateHash({
    tx,
}: {
    tx: `0x${string}`;
}): Promise<string> {
    const TIME_DELAY_REVALIDATE_TX = 1000;

    async function callValidate() {
        try {
            const receipt = await getTransactionReceipt(
                wagmiAdapter.wagmiConfig,
                {
                    hash: tx,
                }
            );
            if (receipt?.status === "success") {
                return tx;
            } else {
                throw Error("Transaction failed");
            }
        } catch (error: any) {
            if (error.message === "Transaction failed") {
                throw error;
            } else {
                await new Promise((resolve) =>
                    setTimeout(resolve, TIME_DELAY_REVALIDATE_TX)
                );
                await callValidate();
            }
        }
    }
    if (typeof tx === "string" && tx.length >= 60) {
        await callValidate();
    } else {
        throw Error("Invalid transaction hash");
    }
    return tx;
}
