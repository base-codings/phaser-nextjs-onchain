import { setCookie, deleteCookie } from "cookies-next";
import { COOKIE_STORAGE_KEY } from "@/core/constant";
import { setStoreUser } from "@/store/useStoreUser";
import jsonwebtoken from "jsonwebtoken";

export const authLogin = async ({
    address,
    userToken,
}: {
    address: string;
    userToken: string;
}) => {
    const defaultTimeExpired = 1722246217500;
    const decodeToken: any = jsonwebtoken.decode(userToken);
    let expiredTime = decodeToken?.exp * 1000 || defaultTimeExpired;

    setStoreUser({ userToken, address, isLogged: true, isLogging: false });

    setCookie(COOKIE_STORAGE_KEY.USER_TOKEN, userToken, {
        expires: new Date(expiredTime),
        path: "/",
    });
    setCookie(COOKIE_STORAGE_KEY.USER_ADDRESS, address, {
        expires: new Date(expiredTime),
        path: "/",
    });
};

export const authLogout = async () => {
    deleteCookie(COOKIE_STORAGE_KEY.USER_ADDRESS);
    deleteCookie(COOKIE_STORAGE_KEY.USER_TOKEN);

    setStoreUser({
        isLogged: false,
        address: "",
    });
};

