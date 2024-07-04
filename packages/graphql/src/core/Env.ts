import * as dotenv from 'dotenv';
import * as zod from 'zod';

dotenv.config();

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
    const env = this.parseEnv();
    return this.schema.parse(env);
  }

  private safeParse() {
    const env = this.parseEnv();
    const result = this.schema.safeParse(env);
    if (!result.success) {
      console.warn('The environment variables are not valid', result.error);
      return this.defaultValues;
    }
    return result.data;
  }

  private parseEnv() {
    return Object.entries(process.env).reduce(
      (obj, [key, value]) => {
        if (value === 'false') {
          return {
            ...obj,
            [key]: false,
          };
        }
        if (value === 'true') {
          return {
            ...obj,
            [key]: true,
          };
        }
        return {
          ...obj,
          [key]: value,
        };
      },
      {} as zod.infer<T>,
    );
  }

  get<K extends keyof zod.infer<T>>(key: K): zod.infer<T>[K] {
    return this.parsedEnv![key];
  }

  set<K extends keyof zod.infer<T>>(key: K, value: zod.infer<T>[K]) {
    this.parsedEnv![key] = value;
  }
}
