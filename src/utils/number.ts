const EXCEEDING_LIMIT_VALUE = 1.79769313 * Math.pow(10, 308);

function formatShortNumber(
    number: number | string | bigint,
    decimals: number = 2
): string {
    let value = Number(number);
    if (!number) {
        return "0";
    }

    if (value < 1) {
        return Number(value.toFixed(decimals)).toString();
    }

    // Special case: Exceeding limits
    if (value > EXCEEDING_LIMIT_VALUE) {
        return "999cz";
    }

    // Define suffixes for standard and extended notation
    const standardSuffixes = ["", "K", "M", "B", "T"];
    const extendedSuffixes = [];
    const englishAlphabetLength = 26;
    const firstCharacterASCIICode = 97;
    for (let i = 0; i < englishAlphabetLength; i++) {
        for (let j = 0; j < englishAlphabetLength; j++) {
            extendedSuffixes.push(
                String.fromCharCode(firstCharacterASCIICode + i) +
                    String.fromCharCode(firstCharacterASCIICode + j)
            );
        }
    }

    // Determine the suffix and calculate the formatted value
    let suffix = "";
    let formattedValue = value;

    if (value < 1000) {
        suffix = "";
    } else if (value < 1e15) {
        // Standard notation (K, M, B, T)
        let exponent = Math.floor(Math.log10(value) / 3);
        exponent = Math.min(exponent, standardSuffixes.length - 1);
        suffix = standardSuffixes[exponent];
        formattedValue = value / Math.pow(10, exponent * 3);
    } else {
        // Extended notation (aa, ab, ac, ..., cz)
        let exponent = Math.floor(Math.log10(value) / 3);
        exponent -= 4; // Since 1aa = 1e15 (10^15)
        if (exponent >= extendedSuffixes.length) {
            return "999cz";
        }
        suffix = extendedSuffixes[exponent];
        formattedValue = value / Math.pow(10, (exponent + 4) * 3);
    }

    // Limit to 2 decimal places
    formattedValue = parseFloat(formattedValue.toFixed(2));

    return `${formattedValue}${suffix}`;
}

/**
 *
 * @param number
 * @param maxLength
 * @param decimals: number of decimal places, default is 4, but if don't want to fix decimals, set it to -1
 * @returns
 */
export function formatNumber(
    number: number | bigint | string | undefined,
    config?: {
        maxLength?: number;
        decimals?: number;
        isShortNumber?: boolean;
        shortIfExceed?: number;
    }
): string {
    const {
        maxLength = 12,
        decimals = 4,
        isShortNumber = false,
        shortIfExceed = true,
    } = config || {};

    const minValue = 10 ** -(decimals as number);

    const isSmallerThanMin =
        Number(number || 0) !== 0 &&
        Math.abs(Number(number || 0)) < Math.abs(minValue);

    // Convert the number to a string
    if (isSmallerThanMin) {
        return `<${minValue.toFixed(decimals)}`;
    }

    if (isShortNumber) {
        return formatShortNumber(number || "0", decimals);
    }

    if (Number(number) > 100_000_000 && shortIfExceed) {
        return formatShortNumber(number || "0", decimals);
    }
    const numberPrimitive = Number(number || 0);

    let numberString = numberPrimitive.toString();

    if (decimals > -1) {
        numberString = Number(numberPrimitive.toFixed(decimals)).toString();
    }

    // Split the string into integer and decimal parts
    const parts = numberString.split(".");
    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Check if the total length exceeds the specified maxLength
    const totalLength = parts.join("").length;
    if (totalLength > maxLength) {
        // Truncate the decimal part to fit within the maxLength
        let remainingLength = maxLength - parts[0].length;
        if (remainingLength < 0) {
            remainingLength = 0;
        }
        parts[1] = parts[1]
            ?.substring?.(0, remainingLength)
            .replace(/([1-9])0+/g, "$1");
    }
    // Join the parts with a dot and check if the result ends with a dot
    let result = /^0+$/.test(parts[1]) ? parts[0] : parts.join(".");
    if (result.endsWith(".")) {
        result = result.slice(0, -1); // Remove the trailing dot
    }

    // Display the result
    return result;
}
