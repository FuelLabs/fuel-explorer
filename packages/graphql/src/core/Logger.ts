import dayjs from 'dayjs';

class Logger {
  private log(process: string, level: string, message: any, extra?: any) {
    const date = dayjs().format();
    const prefix = `${date} ${process} ${level.toUpperCase()}:`;
    if (level === 'error') {
      console.error(prefix, message);
      if (extra) console.error(prefix, extra);
    } else {
      console.log(prefix, message, extra ? JSON.stringify(extra) : '');
    }
  }

  info(process: string, message: any, data?: any) {
    this.log(process, 'info', message, data);
  }

  debug(process: string, message: any, data?: any) {
    this.log(process, 'debug', message, data);
  }

  error(process: string, message: any, error?: any) {
    this.log(process, 'error', message, error);
  }
}

export const logger = new Logger();
