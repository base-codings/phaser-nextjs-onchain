import { ExplorerLinkBuilderConfig, ExplorerLinkBuilderProps } from "./types";

export const linkBuilder =
    ({
        baseUrl,
        addressPrefix = "address",
        txPrefix = "tx",
    }: ExplorerLinkBuilderConfig) =>
    ({ tx, address }: ExplorerLinkBuilderProps): string => {
        if (tx) {
            return `${baseUrl}/${txPrefix}/${tx}`;
        }
        if (address) {
            return `${baseUrl}/${addressPrefix}/${address}`;
        }
        return baseUrl;
    };
