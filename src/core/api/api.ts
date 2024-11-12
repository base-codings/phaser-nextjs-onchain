import axios from "axios";
import { API_ROOT, TIMEOUT } from "./config";

const instance = axios.create({
    baseURL: API_ROOT,
    timeout: TIMEOUT,
    headers: {},
});

export function setDefaultHeaders(headers: Record<string, string>) {
    Object.keys(headers).forEach((key) => {
        instance.defaults.headers.common[key] = headers[key];
    });
}

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;

