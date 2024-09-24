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
