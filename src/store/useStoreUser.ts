import { create } from "zustand";

type StoreUserType = {
    userToken: string;
    address: string;
    isLogged: boolean;
    isLogging: boolean;
};

const store = () => ({
    userToken: "",
    address: "",
    isLogged: false,
    isLogging: false,
});

const useStoreUser = create<StoreUserType>(store);

export default useStoreUser;

export function setStoreUser<T extends keyof StoreUserType>(
    x: Pick<StoreUserType, T>
) {
    useStoreUser.setState(x);
}
