import { join } from 'node:path';
import pino from 'pino';
import { env } from '~/config';

const DEBUG = env.get('DEBUG');
const DEBUG_PAYLOAD = env.get('DEBUG_PAYLOAD');
const LOG_DIR = env.get('LOG_DIR') || '/var/log';

class LogFormats {
  static fileTransport(filename: string) {
    return pino.transport({
      target: 'pino/file',
      options: {
        destination: join(LOG_DIR, `${filename}.log`),
      },
    });
  }

  static consoleTransport = pino.transport({
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
      ignore: 'pid,hostname',
    },
  });
}

class LoggerBase {
  protected logger: pino.Logger;
  turnOff = false;

  constructor(serviceName: string, level: string) {
    this.logger = pino(
      {
        level,
        name: serviceName,
        timestamp: pino.stdTimeFunctions.isoTime,
      },
      pino.multistream([
        { stream: LogFormats.fileTransport(serviceName) },
        ...(serviceName !== 'graphql'
          ? [{ stream: LogFormats.consoleTransport }]
          : []),
      ]),
    );
  }

  setTurnOff() {
    this.turnOff = true;
  }

  protected log(level: string, message: string, data?: any) {
    if (this.turnOff) return;
    const params = { msg: message } as any;
    if (DEBUG_PAYLOAD && data) {
      params.payload = data;
    }
    switch (level) {
      case 'debug':
        this.logger.debug(params);
        break;
      case 'info':
        this.logger.info(params);
        break;
      case 'warn':
        this.logger.warn(params);
        break;
      case 'error':
        this.logger.error(params);
        break;
    }
  }

  info<T>(message: string, data?: T) {
    this.log('info', message, data);
  }

  warn<T>(message: string, data?: T) {
    this.log('warn', message, data);
  }

  error<T>(message: string, data?: T) {
    this.log('error', message, data);
  }

  debug<T>(message: string, data?: T) {
    if (!DEBUG) return;
    this.log('info', message, data);
  }

  protected debugWithPrefix<T>(prefix: string, message: string, data?: T) {
    this.debug(`[${prefix}] ${message}`, data);
  }
}

class GraphQLLogger extends LoggerBase {
  constructor() {
    super('graphql', 'debug');
  }

  yogaLogFn(eventName: string, args: any) {
    switch (eventName) {
      case 'execute-start':
      case 'subscribe-start':
        this.debug(`${eventName}`, { args });
        break;
      case 'execute-end':
      case 'subscribe-end':
        this.debug(`${eventName}`, {
          args,
          result: args.result,
          executionTime: args.executionTime,
        });
        break;
      default:
        this.debug(`Unknown event: ${eventName}`, { args });
    }
  }
}

class SyncerLogger extends LoggerBase {
  constructor() {
    super('syncer', DEBUG ? 'debug' : 'info');
  }
}

class Logger extends LoggerBase {
  graphql: GraphQLLogger;
  syncer: SyncerLogger;

  constructor() {
    super('main', DEBUG ? 'debug' : 'info');
    this.graphql = new GraphQLLogger();
    this.syncer = new SyncerLogger();
  }

  debugRequest<T>(message: string, data?: T) {
    this.debugWithPrefix('REQUEST', message, data);
  }

  debugResponse<T>(message: string, data?: T) {
    this.debugWithPrefix('RESPONSE', message, data);
  }

  debugDone<T>(message: string, data?: T) {
    this.debugWithPrefix('DONE', message, data);
  }

  debugError<T>(message: string, data?: T) {
    this.debugWithPrefix('ERROR', message, data);
  }

  yogaLogFn(eventName: string, args: any) {
    this.graphql.yogaLogFn(eventName, args);
  }
}

export const logger = new Logger();
