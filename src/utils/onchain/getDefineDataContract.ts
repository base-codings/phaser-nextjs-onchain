import { ABIType } from "./types";

function getDefineDataContract(
    functionName: string,
    data: any,
    abi: ABIType
): any {
    const dataStruct: ABIType[number] | undefined = abi?.find(
        (item: any) => item?.name === functionName
    );
    const outputs = dataStruct?.outputs;
    const propsName = outputs?.map?.((item) => item?.name);
    if (!propsName?.[0]) return data;
    if (typeof data !== "object") {
        return data;
    }
    if (propsName?.length > 0) {
        const res = propsName.reduce((acc: any, curr: any, index: number) => {
            acc[curr] = data?.[index];
            return acc;
        }, {});
        return res;
    }
    return undefined;
}

export default getDefineDataContract;
