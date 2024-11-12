import Toast from "@/components/base/Toast";
import { ReactNode } from "react";
import { default as callToast, ToastOptions } from "react-hot-toast";

type Config = {
    title?: string | ReactNode;
    tx?: string;
};

type Options = ToastOptions;

export const toast = {
    success: (
        message?: string | ReactNode,
        config: Config = {},
        options?: Options
    ) => {
        callToast.custom((t) => {
            return (
                <Toast
                    type="success"
                    content={message}
                    title="Successful!!!"
                    {...config}
                    t={t}
                />
            );
        }, options);
    },
    error: (
        message?: string | ReactNode,
        config: Config = {},
        options?: Options
    ) => {
        callToast.custom((t) => {
            return (
                <Toast
                    type="error"
                    content={message}
                    title="xxx"
                    {...config}
                    t={t}
                />
            );
        }, options);
    },
};
