export default class DataCache {
  private cache: any = {};
  static instance: DataCache;

  private constructor() {}

  save(type: string, expiresIn: number, value: any) {
    this.cache[type] = {
      date: new Date(),
      expiresIn,
      value,
    };
  }

  get(type: string) {
    const data = this.cache[type];
    if (!data) {
      return;
    }
    const currentDate = new Date();
    const diff = currentDate.getTime() - data.date.getTime();
    if (diff > data.expiresIn) {
      return;
    }
    return data.value;
  }

  static getInstance() {
    if (!DataCache.instance) {
      DataCache.instance = new DataCache();
    }
    return DataCache.instance;
  }
}
