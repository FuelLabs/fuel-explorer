import { DateHelper } from './date';

interface TransactionNode {
  __typename: 'TransactionFee';
  fee: string;
  timestamp: string;
}

interface AccountNode {
  timestamp: string;
  count?: number;
}

interface Interval {
  start: Date;
  end: Date;
  count: number; // To track the number of transactions
  totalFee: number; // To track the total transaction fees
}

export function getUnitAndInterval(timeRange: string): {
  unit: 'minute' | 'hour' | 'day' | 'month';
  intervalSize: number;
} {
  switch (timeRange) {
    case '1hr':
      return { unit: 'minute', intervalSize: 5 };
    case '12hr':
      return { unit: 'hour', intervalSize: 1 };
    case '1day':
      return { unit: 'hour', intervalSize: 2 };
    case '7days':
      return { unit: 'hour', intervalSize: 12 };
    case '14days':
      return { unit: 'day', intervalSize: 1 };
    case '30days':
      return { unit: 'day', intervalSize: 3 };
    case '90days':
      return { unit: 'day', intervalSize: 10 };
    default:
      return { unit: 'month', intervalSize: 1 };
  }
}

function roundToNearest(
  time: number,
  unit: 'minute' | 'hour' | 'day' | 'month',
  roundUp = false,
): number {
  const date = new Date(time);

  switch (unit) {
    case 'minute': {
      const msInMinute = 60 * 1000;
      const msInFiveMinutes = 5 * msInMinute;
      return roundUp
        ? Math.ceil(time / msInFiveMinutes) * msInFiveMinutes
        : Math.floor(time / msInFiveMinutes) * msInFiveMinutes;
    }

    case 'hour': {
      const msInHour = 60 * 60 * 1000;
      return roundUp
        ? Math.ceil(time / msInHour) * msInHour
        : Math.floor(time / msInHour) * msInHour;
    }

    case 'day':
      if (roundUp) {
        date.setUTCHours(0, 0, 0, 0);
        return date.getTime() + 24 * 60 * 60 * 1000; // Add one day
      }
      date.setUTCHours(0, 0, 0, 0); // Set to midnight
      return date.getTime();

    case 'month':
      if (roundUp) {
        if (date.getUTCMonth() === 11) {
          // If December, increment year
          date.setUTCFullYear(date.getUTCFullYear() + 1);
          date.setUTCMonth(0);
        } else {
          date.setUTCMonth(date.getUTCMonth() + 1);
        }
        date.setUTCDate(1); // First day of the next month
      } else {
        date.setUTCDate(1); // First day of the current month
      }
      date.setUTCHours(0, 0, 0, 0); // Set time to midnight
      return date.getTime();
  }
}

// General interval creation function
export function createIntervals(
  startTime: number,
  endTime: number,
  unit: 'minute' | 'hour' | 'day' | 'month',
  intervalSize: number,
): Array<{ start: Date; end: Date; count: number; totalFee: number }> {
  const roundedStartTime = roundToNearest(startTime, unit);
  const roundedEndTime = roundToNearest(endTime, unit, true);

  const intervals: Array<{
    start: Date;
    end: Date;
    count: number;
    totalFee: number;
  }> = [];

  let currentTime = roundedStartTime;

  if (unit === 'month') {
    // Handle month-specific interval logic (varying days in a month)
    const currentDate = new Date(roundedStartTime);
    while (currentDate.getTime() < roundedEndTime) {
      const startInterval = new Date(currentDate);
      currentDate.setUTCMonth(currentDate.getUTCMonth() + intervalSize); // Move by `intervalSize` months
      const endInterval = new Date(currentDate);
      intervals.push({
        start: startInterval,
        end: endInterval,
        count: 0,
        totalFee: 0,
      });
    }
  } else {
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
        count: 0,
        totalFee: 0,
      });
      currentTime += intervalDuration;
    }
  }

  return intervals;
}

// Helper to process transactions and map to intervals
export function processTransactions(
  nodes: TransactionNode[],
  intervalMap: Interval[],
) {
  nodes.forEach((transaction) => {
    const transactionTimestamp = Number(
      DateHelper.tai64toDate(transaction.timestamp),
    );
    const transactionFee = Number(transaction.fee);

    // Find the correct interval for the current transaction
    for (const interval of intervalMap) {
      const intervalStart = new Date(interval.start).getTime();
      const intervalEnd = new Date(interval.end).getTime();

      if (
        transactionTimestamp >= intervalStart &&
        transactionTimestamp < intervalEnd
      ) {
        // Increment count and add the transaction fee to totalFee
        interval.count += 1;
        interval.totalFee += transactionFee;
        break; // Transaction assigned, no need to check further
      }
    }
  });
  return intervalMap;
}

export function processAccounts(nodes: AccountNode[], intervalMap: Interval[]) {
  nodes.forEach((account) => {
    const accountTimestamp = Number(account.timestamp);

    // Find the correct interval for the current account
    for (const interval of intervalMap) {
      const intervalStart = new Date(interval.start).getTime();
      const intervalEnd = new Date(interval.end).getTime();

      if (accountTimestamp >= intervalStart && accountTimestamp < intervalEnd) {
        // Increment count for the number of accounts created
        if (account.count) {
          interval.count += account.count;
        } else {
          interval.count += 1;
        }
        break; // Account assigned, no need to check further
      }
    }
  });
  return intervalMap;
}
