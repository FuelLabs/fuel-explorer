import { integer } from 'drizzle-orm/pg-core';
import { Identifier } from '~/core/Identifier';
import { GQLBlock } from '~/graphql/generated/sdk';

export class BlockModelID extends Identifier<number> {
  private constructor(id: number) {
    super(id);
  }

  static type() {
    return integer('_id').primaryKey();
  }

  static create(block: GQLBlock) {
    return new BlockModelID(Number(block.header.height));
  }
}
