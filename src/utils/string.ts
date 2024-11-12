export function captializeWord(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function convertCamelCaseToTitleCase(inputText: string) {
    const result = inputText.split(/(?=[A-Z])/).join(" ");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export function isValidHttpUrl(string: string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export function generateUniqueKey(url: string) {
    // Simple function to generate a unique key from the URL
    return url?.split("/")?.pop()?.split(".")[0];
}

export function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

export function shortAddress(
    address: string,
    numberOfInits = 4,
    numberOfLast = 4
) {
    if (
        address &&
        address.length > numberOfInits &&
        address.length - numberOfLast > 0
    ) {
        return `${address.slice(0, numberOfInits)}...${address.slice(
            address.length - numberOfLast
        )}`;
    }
    return "";
}
