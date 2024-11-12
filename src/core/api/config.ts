import envConfig from "../envConfig";

export const API_ROOT: string = envConfig.SERVER_URI || "";

export const TIMEOUT: number = 150000;

export const API = {};
