import { create } from "zustand";

type StoreUserType = {
    userToken: string;
    address: string;
    isLogged: boolean;
    isLogging: boolean;
    isActivated: boolean;
};

const store = () => ({
    userToken: "",
    address: "",
    isLogged: false,
    isLogging: false,
    isActivated: false,
});

const useStoreUser = create<StoreUserType>(store);

export default useStoreUser;

export function setStoreUser<T extends keyof StoreUserType>(
    x: Pick<StoreUserType, T>
) {
    useStoreUser.setState(x);
}
