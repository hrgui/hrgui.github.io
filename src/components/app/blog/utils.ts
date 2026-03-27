export const isNew = (rawDate?: string) => {
  if (!rawDate) return false;
  const postDate = new Date(rawDate);
  if (Number.isNaN(postDate.getTime())) return false;
  const diffMs = Date.now() - postDate.getTime();
  return diffMs >= 0 && diffMs <= 24 * 60 * 60 * 1000;
};

export const toDisplayDate = (rawDate?: string) => {
  if (!rawDate) {
    return "UNKNOWN";
  }

  const parsedDate = new Date(rawDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return rawDate;
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};
