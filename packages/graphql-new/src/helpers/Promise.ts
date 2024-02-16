export class PromiseHelper {
  static async executeInQueue<T, R>(
    items: T[],
    fn: (item: T) => Promise<R>,
  ): Promise<Array<R>> {
    return items.reduce(async (promise: any, item) => {
      const ret = await promise;
      return ret.concat(await fn(item));
    }, Promise.resolve([])) as Array<R>;
  }
}
