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
  return `color-mix(in srgb, var(--color-on-surface) 82%, ${hex} 18%)`;
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
