import * as dotenv from 'dotenv';
import { createLogger, transports } from 'winston';
import * as zod from 'zod';

dotenv.config();

const logger = createLogger({
  level: 'debug',
  transports: [new transports.Console()],
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class Env<T extends zod.ZodObject<any>> {
  private parsedEnv: zod.infer<T> | undefined;

  constructor(
    readonly schema: T = zod.object({}) as T,
    readonly defaultValues: Partial<zod.infer<T>> = {},
  ) {
    if (process.env.NODE_ENV !== 'development') {
      this.parsedEnv = this.parse();
    } else {
      this.parsedEnv = this.safeParse();
    }
  }

  private parse() {
    return this.schema.parse(process.env);
  }

  private safeParse() {
    const result = this.schema.safeParse(process.env);
    if (!result.success) {
      logger.log({
        level: 'warn',
        message: 'The environment variables are not valid',
      });
      logger.error({ level: 'error', message: result.error });
      return this.defaultValues;
    }
    return result.data;
  }

  get<K extends keyof zod.infer<T>>(key: K): zod.infer<T>[K] {
    return this.parsedEnv![key];
  }
}
