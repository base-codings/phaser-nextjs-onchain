import envConfig from "@/core/envConfig";
import { create } from "zustand";

type StoreGlobalType = {
    isPageLoading: boolean;
    zIndexModal: number;
};

const store = () => ({
    isPageLoading: true,
    zIndexModal: 0,
});
const useStoreGlobal = create<StoreGlobalType>(store);

export default useStoreGlobal;

export function setStoreGlobal<T extends keyof StoreGlobalType>(
    x: Pick<StoreGlobalType, T>
) {
    useStoreGlobal.setState(x);
}
