import { wagmiAdapter } from "@/core/config";
import envConfig from "@/core/envConfig";
import validateHash from "@/utils/onchain/validateHash";
import { useAppKitAccount } from "@reown/appkit/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { readContract, writeContract } from "@wagmi/core";
import { parseUnits } from "viem";

const abi = [
    {
        type: "function",
        name: "allowance",
        inputs: [
            { name: "owner", type: "address", internalType: "address" },
            { name: "spender", type: "address", internalType: "address" },
        ],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "approve",
        inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "value", type: "uint256", internalType: "uint256" },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "nonpayable",
    },
];

const useApproveToken = ({
    tokenAddress,
    contractAddress,
    amount,
    decimals,
}: {
    tokenAddress: `0x${string}` | undefined;
    contractAddress: `0x${string}`;
    amount: string;
    decimals: number;
}) => {
    const chainID = envConfig.CHAIN_ID;

    const { address } = useAppKitAccount();

    const queryAllowance = async (
        tokenAddress: `0x${string}` | undefined,
        contractAddress: `0x${string}`,
        amount: string,
        decimals: number
    ): Promise<boolean> => {
        if (tokenAddress) {
            try {
                const result: bigint = (await readContract(
                    wagmiAdapter.wagmiConfig,
                    {
                        abi: abi,
                        chainId: chainID,
                        address: tokenAddress,
                        functionName: "allowance",
                        args: [address, contractAddress],
                    }
                )) as bigint;
                // , parseUnits(amount, decimals)
                const amountInBigNumber = parseUnits(amount, decimals);
                if (result < amountInBigNumber) {
                    return false;
                }
                return true;
            } catch (error) {
                return false;
            }
        }
        return true;
    };

    const { data, isPending, refetch } = useQuery({
        queryKey: [
            "get-allowance-token",
            tokenAddress,
            contractAddress,
            amount,
            decimals,
        ],
        queryFn: () =>
            queryAllowance(tokenAddress, contractAddress, amount, decimals),
    });

    const approveMutate = async (): Promise<string> => {
        const tx = await writeContract(wagmiAdapter.wagmiConfig, {
            abi: abi,
            address: tokenAddress as `0x${string}`,
            functionName: "approve",
            args: [contractAddress, parseUnits(amount, decimals)],
            chainId: chainID,
        });

        await validateHash({ tx });
        return tx;
    };

    const approve = useMutation({
        mutationFn: approveMutate,
        onSuccess: () => {
            refetch();
        },
    });

    return {
        isApproved: data,
        isCheckingApprove: isPending,
        approveAsync: approve.mutateAsync,
        approve: approve.mutate,
        refetchIsApproved: refetch,
    };
};

export default useApproveToken;
