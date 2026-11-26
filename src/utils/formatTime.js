// Turns an HHMM number into a readable 12-hour time.
// Example: formatTime(830) -> "8:30 AM", formatTime(1200) -> "12:00 PM"
export function formatTime(hhmm) {
  // Return an empty string if the time is missing or not a number
  if (typeof hhmm !== "number" || Number.isNaN(hhmm)) {
    return "";
  }

  const hours24 = Math.floor(hhmm / 100); // 1430 -> 14
  const minutes = hhmm % 100;             // 1430 -> 30

  const period = hours24 >= 12 ? "PM" : "AM";

  // 0 -> 12 (midnight), 13 -> 1, 12 stays 12 (noon)
  let hours12 = hours24 % 12;
  if (hours12 === 0) {
    hours12 = 12;
  }

  // padStart makes 5 minutes show as "05" instead of "5"
  const paddedMinutes = String(minutes).padStart(2, "0");

  return `${hours12}:${paddedMinutes} ${period}`;
}

// Turns a start and end time into one range.
// Example: formatTimeRange(830, 1000) -> "8:30 AM - 10:00 AM"
export function formatTimeRange(start, end) {
  return `${formatTime(start)} - ${formatTime(end)}`;
}

// Turns an HHMM number into decimal hours, for placing courses on a grid.
// Example: toHours(830) -> 8.5, toHours(1415) -> 14.25
export function toHours(hhmm) {
  return Math.floor(hhmm / 100) + (hhmm % 100) / 60;
}
