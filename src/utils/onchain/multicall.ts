import { wagmiAdapter } from "@/core/config";
import envConfig from "@/core/envConfig";
import { multicall } from "@wagmi/core";
import { AbiFunction } from "viem";
import getDefineDataContract from "./getDefineDataContract";

interface MulticallAlikeContractParams {
    address: `0x${string}`;
    abi: readonly AbiFunction[];
    functions: {
        name: string;
        args: any[];
    }[];
}

type MulticallResult<T> = {
    result: T;
    success: boolean;
};

type MulticallAlikeContractResult<T extends Record<string, any>> = {
    address: `0x${string}`;
} & {
    [K in keyof T]: MulticallResult<T[K]>;
};

export async function multicallAlikeContract<T extends Record<string, any>>(
    contracts: MulticallAlikeContractParams[]
): Promise<MulticallAlikeContractResult<T>[]> {
    const result = await multicall(wagmiAdapter.wagmiConfig, {
        contracts: contracts
            .map((contract) => {
                return contract.functions.map((func) => {
                    return {
                        address: contract.address,
                        abi: contract.abi,
                        functionName: func.name,
                        args: func.args,
                    };
                });
            })
            .flatMap((x) => x),
        chainId: envConfig.CHAIN_ID,
    });

    const x = contracts.map((contract, contractIndex) => {
        const data: any = {
            address: contract.address,
        };
        contract.functions.forEach((func, funcIndex) => {
            const _result =
                result[contractIndex * contract.functions.length + funcIndex];
            data[func.name] = {
                result: getDefineDataContract(
                    func.name,
                    _result.result,
                    contract.abi as any
                ),
                success: _result.status,
            };
        });
        return data;
    });

    return x as any as MulticallAlikeContractResult<T>[];
}
