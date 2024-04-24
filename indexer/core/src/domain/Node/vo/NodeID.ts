import { Identifier } from '@core/shared/Identifier';
import { varchar } from 'drizzle-orm/pg-core';

export type NodeIDValue = string;

export class NodeID extends Identifier<NodeIDValue> {
  private constructor(id: NodeIDValue) {
    super(id);
  }

  static type() {
    return varchar('node_id', { length: 66 }).notNull().primaryKey();
  }

  static create(id: string) {
    return new NodeID(id);
  }
}
