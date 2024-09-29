export function roundToNearest(time: number, roundUp = false): number {
  const msInHour = 60 * 60 * 1000;
  return roundUp
    ? Math.ceil(time / msInHour) * msInHour
    : Math.floor(time / msInHour) * msInHour;
}

// General interval creation function
export function createIntervals(
  startTime: number,
  endTime: number,
  unit: 'minute' | 'hour' | 'day',
  intervalSize: number,
): Array<{ start: Date; end: Date; txCount: number; totalGas: number }> {
  const roundedStartTime = roundToNearest(startTime);
  const roundedEndTime = roundToNearest(endTime, true);

  const intervals: Array<{
    start: Date;
    end: Date;
    txCount: number;
    totalGas: number;
  }> = [];

  let currentTime = roundedStartTime;

  // Handle minute, hour, and day intervals
  const msInUnit = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
  };

  const intervalDuration = intervalSize * msInUnit[unit];

  while (currentTime < roundedEndTime) {
    const startInterval = new Date(currentTime);
    const endInterval = new Date(currentTime + intervalDuration);
    intervals.push({
      start: startInterval,
      end: endInterval,
      txCount: 0,
      totalGas: 0,
    });
    currentTime += intervalDuration;
  }

  return intervals;
}

export function getTimeInterval(timeFilter: string): number | null {
  let _interval: number | null = null;
  switch (timeFilter) {
    case '1hr':
      _interval = 1;
      break;
    case '12hr':
      _interval = 12;
      break;
    case '1day':
      _interval = 24;
      break;
    case '7days':
      _interval = 24 * 7;
      break;
    case '14days':
      _interval = 24 * 14;
      break;
    case '30days':
      _interval = 24 * 30;
      break;
    case '90days':
      _interval = 24 * 90;
      break;
    default:
      _interval = null;
  }
  return _interval;
}
