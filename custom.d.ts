// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ProcessEnv {
        NEXT_PUBLIC_CLIENT_URI: string;
        NEXT_PUBLIC_SERVER_URI: string;
        NEXT_PUBLIC_CHAIN_ID: string;
        NEXT_PUBLIC_PROJECT_ID: string;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// define window.ethereum
declare global {
    interface Window {
        ethereum?: {
            request: (args: { method: string; params?: any[] }) => Promise<any>;
        };
    }
}

export {};
