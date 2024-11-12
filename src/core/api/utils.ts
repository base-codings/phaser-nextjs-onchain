import axios from "axios";

export function encodeQueryData(
    data: Record<string, string | number | boolean>
) {
    let ret = [];
    for (let d in data) {
        if (Object.prototype.hasOwnProperty.call(data, d)) {
            ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
        }
    }
    return ret.join("&");
}

export function handleApiError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
        return new Error(
            error?.response?.data?.meta?.message ||
                error?.message ||
                "Something went wrong with our system. Please try again!"
        );
    }
    return new Error("Something went wrong with our system. Please try again!");
}
