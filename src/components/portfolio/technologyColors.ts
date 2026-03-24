export const techColors = {
  JAVASCRIPT: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  MYSQL: "#00758F",
  POSTGRESQL: "#1e6692",
  FIREBASE: "#FFA000",
  WORDPRESS: "#21759b",
};

export const fallbackTechColors = [
  "#67C9FF",
  "#6EE7B7",
  "#C084FC",
  "#F59E0B",
  "#F87171",
];

export function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const num = Number.parseInt(value, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function hexToRgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getTechColor(type: string | undefined, index: number) {
  const normalizedType = type?.toUpperCase();

  if (normalizedType && normalizedType in techColors) {
    return techColors[normalizedType as keyof typeof techColors];
  }

  return fallbackTechColors[index % fallbackTechColors.length];
}

export function getReadableTechTextColor(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  if (luminance < 0.42) {
    const boost = 0.42;
    const rr = Math.round(r + (255 - r) * boost);
    const gg = Math.round(g + (255 - g) * boost);
    const bb = Math.round(b + (255 - b) * boost);
    return `rgb(${rr}, ${gg}, ${bb})`;
  }

  if (luminance > 0.82) {
    const damp = 0.86;
    return `rgb(${Math.round(r * damp)}, ${Math.round(g * damp)}, ${Math.round(b * damp)})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

export function getTechBadgeStyle(type: string | undefined, index: number) {
  const color = getTechColor(type, index);

  return {
    backgroundColor: hexToRgba(color, 0.2),
    borderColor: hexToRgba(color, 0.72),
    color: getReadableTechTextColor(color),
    boxShadow: `inset 0 0 0 1px ${hexToRgba(color, 0.18)}`,
  };
}
