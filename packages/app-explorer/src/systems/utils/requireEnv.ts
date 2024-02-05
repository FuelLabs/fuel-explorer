export function requireEnv<
  A extends string[],
  B extends { [key in A[number]]: string },
>(keys: string[]): B {
  return keys.reduce((ret, key) => {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is required`);
    }
    ret[key] = process.env[key]!;
    return ret;
  }, {} as B);
}
