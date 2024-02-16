import dotenv from 'dotenv';
dotenv.config();

export class EnvHelper {
  static requireEnv<A extends (string | [key: string, defaultValue: string])[]>(
    keys: A,
  ) {
    return keys.reduce(
      (ret, value) => {
        const [key, defaultValue] = Array.isArray(value) ? value : [value];
        if (!process.env[key] && defaultValue === undefined) {
          throw new Error(`Environment variable ${key} is required`);
        }
        ret[key] = (process.env[key] ? process.env[key] : defaultValue)!;
        return ret;
      },
      {} as Record<string, string>,
    );
  }
}
