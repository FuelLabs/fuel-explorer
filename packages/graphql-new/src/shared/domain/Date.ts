import { TAI64 } from 'tai64';

export class DateHelper {
  static tai64toDate(tai64Timestamp: string) {
    const timestamp = TAI64.fromString(tai64Timestamp, 10).toUnix();
    return new Date(timestamp * 1000);
  }

  static dateToTai64(date: Date) {
    return TAI64.fromUnix(Math.floor(date.getTime() / 1000)).toString(10);
  }
}
