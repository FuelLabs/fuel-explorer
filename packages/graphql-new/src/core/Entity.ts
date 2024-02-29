import { Identifier } from './Identifier';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const isEntity = (v: any): v is Entity<any, any> => {
  return v instanceof Entity;
};

export abstract class Entity<T, ID extends Identifier<unknown>> {
  readonly _id: ID;
  public readonly props: T;

  constructor(id: ID, props: T) {
    this._id = id;
    this.props = props;
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

    return this._id.equals(object._id);
  }
}
