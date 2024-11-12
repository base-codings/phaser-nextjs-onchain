import { useMemo } from "react";
import { getChain } from "@/core/chains";
import { CaipNetwork } from "@reown/appkit";

const useGetNetworkConfig = (): CaipNetwork => {
    const networkConfig = useMemo(() => {
        return getChain();
    }, []);

    return networkConfig;
};

export default useGetNetworkConfig;
