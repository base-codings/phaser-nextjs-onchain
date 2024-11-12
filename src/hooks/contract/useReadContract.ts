import getDefineDataContract from "@/utils/onchain/getDefineDataContract";
import { ABIType } from "@/utils/onchain/types";
import {
    UseReadContractReturnType,
    useReadContract as useReadContractWagmi,
} from "wagmi";

type TypeInputContract = {
    functionName: string;
    args?: any[];
    abi: ABIType;
    address: `0x${string}`;
    chainId?: number;
};

type UseReadContractReturnTypeOveride<OutputType> = Omit<
    UseReadContractReturnType,
    "data"
> & {
    data: OutputType;
};

// type UseReadContractType = (x: TypeInputContract) => UseReadContractReturnType | {};
function useReadContract<InputType, OutputType>({
    functionName = "",
    args = [],
    abi,
    address,
    chainId,
}: TypeInputContract) {
    try {
        const result: UseReadContractReturnType = useReadContractWagmi({
            address,
            abi,
            functionName,
            chainId: chainId
                ? Number(chainId)
                : Number(process.env.NEXT_PUBLIC_CHAIN_ID),
            args,
        });
        const data = getDefineDataContract(functionName, result?.data, abi);
        return {
            ...result,
            data,
        } as UseReadContractReturnTypeOveride<OutputType>;
    } catch (err) {
        return {} as UseReadContractReturnTypeOveride<OutputType>;
    }
}

export default useReadContract;
