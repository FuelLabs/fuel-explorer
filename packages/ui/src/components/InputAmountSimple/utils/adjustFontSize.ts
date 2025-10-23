const FONT_SIZES = [24, 20, 16, 14, 12] as const;
const smallestFontSize = FONT_SIZES[FONT_SIZES.length - 1];
const TOLERANCE = 1; // 1px tolerance for floating-point comparison

export function adjustFontSize(element: HTMLElement) {
  const maxWidth = element.offsetWidth;

  const candidateFontSize = FONT_SIZES.find((size) => {
    element.style.fontSize = `${size}px`;
    return element.scrollWidth <= maxWidth + TOLERANCE;
  });

  const newFontSize = candidateFontSize ?? smallestFontSize;
  element.style.fontSize = `${newFontSize}px`;

  return newFontSize;
}
