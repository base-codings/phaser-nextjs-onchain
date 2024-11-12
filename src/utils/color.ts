export function convertColorToHex(color: string): number {
    // Remove the '#' if present
    color = color.replace("#", "");

    // If it's a 3-digit color, convert it to 6-digit
    if (color.length === 3) {
        color = color
            .split("")
            .map((char) => char + char)
            .join("");
    }

    // Parse the string as a hexadecimal number
    return parseInt(color, 16);
}

export function convertHexToColor(hex: number): string {
    return `#${hex.toString(16)}`;
}

export function lightenDarkenColor(color: string, percent: number): string {
    let num = parseInt(color.replace("#", ""), 16);
    let r = (num >> 16) + percent;
    let b = ((num >> 8) & 0x00ff) + percent;
    let g = (num & 0x0000ff) + percent;

    r = r < 255 ? (r < 1 ? 0 : r) : 255;
    g = g < 255 ? (g < 1 ? 0 : g) : 255;
    b = b < 255 ? (b < 1 ? 0 : b) : 255;

    return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, "0")}`;
}

export function getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
