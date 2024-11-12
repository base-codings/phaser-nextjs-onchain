import { wagmiAdapter } from "@/core/config";
import envConfig from "@/core/envConfig";
import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "@wagmi/core";

type UseBalanceParams = {
    address?: `0x${string}`;
    chainId?: number;
};

const useBalance = (params?: UseBalanceParams) => {
    const { chainId = envConfig.CHAIN_ID, address } = params || {};

    const { address: account } = useAppKitAccount();

    return useQuery({
        queryKey: ["balance", account, chainId, address],
        queryFn: async () => {
            const balance = await getBalance(wagmiAdapter.wagmiConfig, {
                address: account as `0x${string}`,
                token: address,
                chainId,
            });
            return balance;
        },
        enabled: !!account,
    });
};

export default useBalance;
