import dayjs from 'dayjs';

class Logger {
  private log(level: string, message: any, extra?: any) {
    const date = dayjs().format();
    const prefix = `${date} ${level.toUpperCase()}:`;
    if (level === 'error') {
      console.error(prefix, message);
      if (extra) console.error(extra);
    } else {
      console.log(prefix, message, extra ? JSON.stringify(extra) : '');
    }
  }

  info(message: any, data?: any) {
    this.log('info', message, data);
  }

  debug(message: any, data?: any) {
    this.log('debug', message, data);
  }

  error(message: any, error?: any) {
    this.log('error', message, error);
  }
}

export const logger = new Logger();
