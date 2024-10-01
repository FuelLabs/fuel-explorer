import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TAI64 } from 'tai64';

dayjs.extend(relativeTime);

export class DateHelper {
  static tai64toDate(tai64Timestamp: string) {
    const timestamp = TAI64.fromString(tai64Timestamp, 10).toUnix();
    return dayjs(timestamp * 1000);
  }

  static dateToTai64(date: Date) {
    return TAI64.fromUnix(Math.floor(date.getTime() / 1000)).toString(10);
  }

  static addHours(date: string | Date, hours: number): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const newDate = new Date(dateObj.getTime() + hours * 60 * 60 * 1000);
    return newDate.toISOString();
  }

  static floorToHour(date: string | Date): string {
    const flooredDate = typeof date === 'string' ? new Date(date) : date;
    flooredDate.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to 0
    return flooredDate.toISOString();
  }
}
