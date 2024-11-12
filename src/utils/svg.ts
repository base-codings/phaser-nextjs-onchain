export function getRatioSvg(
    svgId: string,
    originWidth: number,
    originHeight: number
) {
    if (typeof document === "undefined") {
        return 1;
    }
    const svgElement = document.getElementById(svgId);
    const svgWidth = svgElement?.clientWidth;
    const svgHeight = svgElement?.clientHeight;
    const widthRatio = svgWidth ? svgWidth / originWidth : 1;
    const heightRatio = svgHeight ? svgHeight / originHeight : 1;
    const ratio = Math.min(widthRatio, heightRatio);
    return ratio;
}
