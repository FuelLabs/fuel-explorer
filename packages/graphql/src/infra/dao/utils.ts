export function getTimeInterval(timeFilter: string): number | null {
  let _interval;
  const msPerHour = 60 * 60 * 1000;
  switch (timeFilter) {
    case '1hr':
      _interval = msPerHour;
      break;
    case '12hr':
      _interval = msPerHour * 12;
      break;
    case '1day':
      _interval = msPerHour * 24;
      break;
    case '7days':
      _interval = msPerHour * 24 * 7;
      break;
    case '14days':
      _interval = msPerHour * 24 * 14;
      break;
    case '30days':
      _interval = msPerHour * 24 * 30;
      break;
    case '90days':
      _interval = msPerHour * 24 * 90;
      break;
    default:
      _interval = null;
  }
  return _interval;
}

export function generateDateIntervals(
  startDate: Date,
  endDate: Date,
): string[] {
  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate).toISOString().split('T')[0]); // Push the date in YYYY-MM-DD format
    currentDate.setDate(currentDate.getDate() + 1); // Increment day by day
  }

  return dates;
}
