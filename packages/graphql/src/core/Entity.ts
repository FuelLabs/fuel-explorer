import type { Identifier } from './Identifier';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const isEntity = (v: any): v is Entity<any, any> => {
  return v instanceof Entity;
};

export abstract class Entity<
  T,
  ID extends Identifier<unknown> | null | undefined,
> {
  readonly _id!: ID;
  public readonly props: T;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  abstract get cursor(): any;

  constructor(props: T, id?: ID) {
    this.props = props;
    if (id) {
      this._id = id;
    }
  }

  public equals(object?: Entity<T, ID>): boolean {
    if (object == null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    if (!this._id || !object._id) return false;
    return this._id.equals(object._id);
  }
}
