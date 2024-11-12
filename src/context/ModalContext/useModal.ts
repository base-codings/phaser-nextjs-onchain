import { useCallback, useContext } from "react";
import { ModalContext } from "./ModalProvider";

const useModalBase = (key: string) => {
    const context = useContext(ModalContext);
    const modal: { [key: string]: any } = context?.state;

    function createOpenFunction(key: string) {
        const modalNow = modal?.[key];
        return (value: boolean, data = modalNow?.data || {}) => {
            context?.setState((prev) => {
                const newVal = value;
                const newObj = {
                    ...prev,
                    [key]: {
                        ...modalNow,
                        isOpen: newVal,
                        data: value ? data : modalNow?.data,
                    },
                };
                return newObj;
            });
        };
    }

    if (key !== "") {
        const modalNow = modal?.[key];
        const setIsOpen = createOpenFunction(key);
        return {
            ...modalNow,
            setIsOpen,
            isOpen: modalNow?.isOpen,
            data: modalNow?.data || {},
        };
    }
    return context;
};

export type UseModalResponse<T, V = null> = {
    open: (params?: T) => void;
    close: (params?: V) => void;
    isOpen: boolean;
    isPendingOpen: boolean;
    data: T;
};

function useModal<T, V = null>(key: string) {
    const { isOpen, setIsOpen, data } = useModalBase(key);
    function open(params: T) {
        setIsOpen(true, params);
    }
    function close(_params?: V) {
        setIsOpen(false);
    }
    return {
        isOpen,
        open,
        close,
        data,
        isPendingOpen: false,
    } as UseModalResponse<T, V>;
}

export const useControlModal = () => {
    const context = useContext(ModalContext);
    const closeAllModal = useCallback(() => {
        context?.setState((prev: { [key: string]: any }) => {
            const newObj: { [key: string]: any } = { ...prev };
            Object.keys(newObj).forEach((key) => {
                newObj[key].isOpen = false;
            });
            return newObj;
        });
    }, [context]);
    return { closeAllModal };
};

export const useIsAnyModalOpen = () => {
    const context = useContext(ModalContext);
    const modal: { [key: string]: { isOpen: boolean } } =
        (context?.state as { [key: string]: { isOpen: boolean } }) || {};
    const isAnyModalOpen = Object.keys(modal).some((key) => {
        if (modal[key].isOpen) {
            return true;
        }
        return false;
    });
    return isAnyModalOpen;
};

export default useModal;
