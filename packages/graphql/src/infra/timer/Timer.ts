export default class Timer {
  static async register(interval: number, callback: Function) {
    await callback();
    setInterval(async () => {
      await callback();
    }, interval);
  }
}
