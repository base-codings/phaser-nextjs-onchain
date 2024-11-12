import { convertCamelCaseToTitleCase } from "../string";

function getMessageError(err: any) {
    if (err?.abi) {
        if (err?.message) {
            const x = err?.message;
            const listErr = err?.abi?.filter(
                (item: any) => item?.type === "error"
            );
            for (let i = 0; i < listErr?.length; i += 1) {
                if (x.includes(listErr[i]?.name)) {
                    return convertCamelCaseToTitleCase(listErr[i]?.name);
                }
            }
        }
    }
    if (err?.code === 4902 || err?.details?.includes("already pending")) {
        return "Pending wallet action. Please try again";
    }
    if (err?.shortMessage) {
        if (err?.shortMessage === "Connector not connected.") {
            return "Wallet not connected";
        }
        return err?.shortMessage;
    }
    if (err?.details) {
        return err?.details;
    }
    if (err?.message) {
        return err?.message;
    }
    return "Something went wrong with our system. Please try again!";
}

export default getMessageError;
