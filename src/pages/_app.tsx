import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import UserProvider from "@/context/UserContext/UserProvider";
import ModalProvider from "@/context/ModalContext/ModalProvider";
import GlobalProvider from "@/context/GlobalContext/GlobalProvider";
import Web3Provider from "@/context/Web3Context/Web3Provider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/core/queryClient";
import { Toaster } from "react-hot-toast";
import ModalContainer from "@/container/ModalContainer";
import { AppGlobalStyles } from "@/context/AppGlobalStyles";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <AppGlobalStyles>
                <Toaster position="top-right" />
                <Web3Provider>
                    <ModalProvider>
                        <UserProvider>
                            <GlobalProvider>
                                <Component {...pageProps} />
                                <ModalContainer />
                            </GlobalProvider>
                        </UserProvider>
                    </ModalProvider>
                </Web3Provider>
            </AppGlobalStyles>
        </QueryClientProvider>
    );
}
