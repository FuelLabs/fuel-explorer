import { integer } from 'drizzle-orm/pg-core';
import { Identifier } from '~/core/Identifier';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';

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
