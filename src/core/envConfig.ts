const envConfig = {
    CLIENT_URI: process.env.NEXT_PUBLIC_CLIENT_URI,
    SERVER_URI: process.env.NEXT_PUBLIC_SERVER_URI,
    PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    CHAIN_ID: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 1),
};

export default envConfig;
