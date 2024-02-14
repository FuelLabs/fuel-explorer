/* eslint-disable @typescript-eslint/no-explicit-any */
export type DeferPromise<R = unknown> = {
  promise: Promise<R>;
  resolve: (value: R) => void;
  reject: (error: unknown) => void;
};

export function deferPromise<R = unknown>() {
  const defer: DeferPromise<R> = {} as any;

  defer.promise = new Promise((resolve, reject) => {
    defer.reject = reject;
    defer.resolve = resolve;
  });

  return defer;
}

export async function executeInQueue<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
): Promise<Array<R>> {
  return items.reduce(async (promise: any, item) => {
    const ret = await promise;
    return ret.concat(await fn(item));
  }, Promise.resolve([])) as Array<R>;
}
