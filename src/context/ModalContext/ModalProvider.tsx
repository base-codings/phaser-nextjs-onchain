import { Dispatch, SetStateAction, createContext, useEffect } from "react";

import { useState } from "react";
import { OpenModalEvent } from "./utils";

interface defaultModalIF {
    state: object;
    setState: Dispatch<SetStateAction<{}>>;
}

const defaultModal: defaultModalIF = {
    state: {},
    setState: () => {},
};

const ModalContext = createContext<defaultModalIF>(defaultModal);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState<Record<string, unknown>>({});

    useEffect(() => {
        window.addEventListener("openModal", ((
            e: CustomEvent<OpenModalEvent<any>>
        ) => {
            setModal((prev) => {
                return {
                    ...prev,
                    [e.detail.key]: {
                        isOpen: true,
                        data: e?.detail?.data,
                    },
                };
            });
        }) as EventListener);
        return () => {
            window.removeEventListener("openModal", () => {});
        };
    }, []);

    useEffect(() => {
        const isAnyModalOpen = Object.keys(modal).some((key) => {
            if ((modal[key] as { isOpen: boolean }).isOpen) {
                return true;
            }
            return false;
        });
        sessionStorage.setItem(
            "isAnyModalOpen",
            JSON.stringify(isAnyModalOpen)
        );
    }, [modal]);

    return (
        <ModalContext.Provider
            value={{
                state: modal,
                setState: setModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export { ModalContext };
export default ModalProvider;
