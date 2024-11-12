export type ExplorerLinkBuilderProps = {
    tx?: string;
    address?: string;
};
export type ExplorerLinkBuilderConfig = {
    baseUrl: string;
    addressPrefix?: string;
    txPrefix?: string;
};

export type ABIType = {
    type: string;
    name: string;
    inputs: any[];
    outputs?: any[];
    stateMutability?: "view" | "pure" | "nonpayable" | "payable";
    anonymous?: boolean;
}[];
