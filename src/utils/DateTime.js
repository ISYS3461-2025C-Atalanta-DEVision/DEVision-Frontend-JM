export const formatDateYear = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(/ /g, " ");
};

export const countDaysFromDate = (dateString) => {
  if (!dateString) return 0;

  const start = new Date(dateString);
  const today = new Date();

  // Normalize to midnight to avoid off-by-one errors
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((today - start) / msPerDay);
};
