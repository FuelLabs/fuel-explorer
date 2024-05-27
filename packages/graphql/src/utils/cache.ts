export class Cache {
  private _cache: Record<string, { value: unknown; expire: number }> = {};

  put<T>(key: string, value: T, ttl: number) {
    const expire = Date.now() + ttl;
    this._cache[key] = { value, expire };
  }

  get<T = any>(key: string): T | null {
    const data = this._cache[key];
    if (data) {
      if (Date.now() < data.expire) {
        return data.value as T;
      }
      delete this._cache[key];
    }
    return null;
  }

  delete(key: string) {
    delete this._cache[key];
  }
}
