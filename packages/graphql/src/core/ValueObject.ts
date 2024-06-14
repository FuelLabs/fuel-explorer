import { shallowEqual } from 'shallow-equal-object';

interface ValueObjectProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, vo.props);
  }
}

export type VOData<T> = T extends ValueObject<infer U> ? U['value'] : never;
