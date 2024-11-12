import { ModalEnum } from "@/container/ModalContainer";

export type OpenModalEvent<T> = {
    key: ModalEnum;
    data?: T;
};

export function openModal<T>(key: ModalEnum, data?: T) {
    window.dispatchEvent(
        new CustomEvent<OpenModalEvent<T>>("openModal", {
            detail: {
                key,
                data: data,
            },
        })
    );
}

export function getIsAnyModalOpen() {
    return JSON.parse(sessionStorage.getItem("isAnyModalOpen") || "false");
}
