import winston from 'winston';
import { env } from '~/config';

class Logger {
  main: winston.Logger;
  graphql: winston.Logger;
  syncer: winston.Logger;

  constructor() {
    const commonFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.json({ space: 2 }),
    );

    this.main = winston.createLogger({
      level: 'info',
      format: commonFormat,
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          level: 'error',
          filename: 'logs/error.log',
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
        }),
      ],
    });

    this.graphql = winston.createLogger({
      level: 'info',
      format: commonFormat,
      transports: [
        new winston.transports.File({
          filename: 'logs/graphql.log',
        }),
      ],
    });

    this.syncer = winston.createLogger({
      level: 'info',
      format: commonFormat,
      transports: [
        new winston.transports.File({
          filename: 'logs/syncer.log',
        }),
      ],
    });
  }

  info(message: string, meta?: any) {
    this.main.info(message, meta);
  }

  warn(message: string, meta?: any) {
    this.main.warn(message, meta);
  }

  error(message: string, meta?: any) {
    this.main.error(message, meta);
  }

  debug(message: string, meta?: any) {
    if (env.get('DEBUG')) {
      this.main.debug(message, meta);
    }
  }

  debugRequest(message: string, meta?: any) {
    this.main.debug(`[REQUEST] ${message}`, meta);
  }
  debugResponse(message: string, meta?: any) {
    this.main.debug(`[RESPONSE] ${message}`, meta);
  }
  debugDone(message: string, meta?: any) {
    this.main.debug(`[DONE] ${message}`, meta);
  }
  debugError(message: string, meta?: any) {
    this.main.debug(`[ERROR] ${message}`, meta);
  }

  yogaLogFn(eventName: string, args: any) {
    switch (eventName) {
      case 'execute-start':
      case 'subscribe-start':
        this.graphql.info(`${eventName}`, { args });
        break;
      case 'execute-end':
      case 'subscribe-end':
        this.graphql.info(`${eventName}`, {
          args,
          result: args.result,
          executionTime: args.executionTime,
        });
        break;
      default:
        this.graphql.debug(`Unknown event: ${eventName}`, { args });
    }
  }
}

export const logger = new Logger();
