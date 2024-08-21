export class Identifier<T> {
  constructor(private rawValue: T) {
    if (rawValue === '') {
      throw new Error('ID cannot be an empty value');
    }
    this.rawValue = rawValue;
  }

  equals(id: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.value() === this.rawValue;
  }

  toString() {
    return String(this.rawValue);
  }

  /**
   * Return raw value of identifier
   */

  value(): T {
    return this.rawValue;
  }
}
