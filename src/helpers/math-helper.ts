import bigDecimal from "js-big-decimal";

export const normalizeDecimal = (
    n: string | bigDecimal,
    decimals: number
): bigDecimal => {
    const num = typeof n === "string" ? new bigDecimal(n.toString()) : n;
    return num?.divide(new bigDecimal(10 ** decimals));
};
