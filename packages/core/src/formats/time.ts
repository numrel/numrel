// ─────────────────────────────────────────
// Time Formatter
// Handles: 00:00:00, 00:00
// Input: value in seconds
// New: duration format '2h 30m 15s'
// ─────────────────────────────────────────

/**
 * The `formatTime` function in TypeScript formats a given time value into different time formats based
 * on the specified format string.
 * @param {number} value - The `value` parameter is a number representing a duration in seconds.
 * @param {string} formatString - The `formatString` parameter is a string that determines how the time
 * value should be formatted. It can have the following formats:
 * @returns The `formatTime` function returns a formatted time string based on the input `value` and
 * `formatString`. If the `formatString` is set to 'duration', it formats the time as '2h 30m 15s'.
 * Otherwise, it formats the time based on the HH:MM:SS or MM:SS format specified in the
 * `formatString`. The final formatted time
 */
export const formatTime = (value: number, formatString: string): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // ─────────────────────────────────────────
  // Calculate Time Parts
  // ─────────────────────────────────────────

  const totalSeconds = Math.floor(absValue);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.round((absValue - totalSeconds) * 1000);

  // ─────────────────────────────────────────
  // Duration Format: '2h 30m 15s' (new!)
  // ─────────────────────────────────────────

  if (formatString === 'duration') {
    return formatDuration(hours, minutes, seconds);
  }

  // ─────────────────────────────────────────
  // HH:MM:SS Format
  // ─────────────────────────────────────────

  const parts = formatString.split(':');
  const hasHours = parts.length >= 3;
  const hasMilliseconds = formatString.includes('.');

  let result: string;

  if (hasHours) {
    // HH:MM:SS
    result = [pad(hours), pad(minutes), pad(seconds)].join(':');
  } else {
    // MM:SS
    const totalMinutes = Math.floor(totalSeconds / 60);
    result = [pad(totalMinutes), pad(seconds)].join(':');
  }

  // Append milliseconds
  if (hasMilliseconds) {
    result = `${result}.${padMs(milliseconds)}`;
  }

  return isNegative ? `-${result}` : result;
};

// ─────────────────────────────────────────
// Duration Format Helper (new feature!)
// e.g. 3661 seconds → '1h 1m 1s'
// ─────────────────────────────────────────

const formatDuration = (
  hours: number,
  minutes: number,
  seconds: number,
): string => {
  const parts: string[] = [];

  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
};

// ─────────────────────────────────────────
// Padding Helpers
// ─────────────────────────────────────────

const pad = (value: number): string => {
  return String(value).padStart(2, '0');
};

const padMs = (value: number): string => {
  return String(value).padStart(3, '0');
};
