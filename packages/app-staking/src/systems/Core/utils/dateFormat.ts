import dayjs from 'dayjs';

/**
 * Formats a date string to the format: "12 Feb 2024, 03:23 am"
 */
export function formatFullDate(dateString?: string): string {
  if (!dateString) return '';
  return dayjs(dateString).format('D MMM YYYY, hh:mm a');
}
