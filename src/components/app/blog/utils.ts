export const isNew = (rawDate?: string) => {
  if (!rawDate) return false;
  const postDate = new Date(rawDate);
  if (Number.isNaN(postDate.getTime())) return false;
  const postDay = Date.UTC(
    postDate.getUTCFullYear(),
    postDate.getUTCMonth(),
    postDate.getUTCDate()
  );
  const now = new Date();
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  const diffDays = (today - postDay) / (24 * 60 * 60 * 1000);
  return diffDays >= 0 && diffDays <= 1;
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
