import { integer } from 'drizzle-orm/pg-core';
import { Identifier } from '~/core/Identifier';
import { GQLChainInfo } from '~/graphql/generated/sdk';

export class ChainModelID extends Identifier<number> {
  private constructor(id: number) {
    super(id);
  }

  static type() {
    return integer('_id').primaryKey();
  }

  static create(chain: GQLChainInfo) {
    return new ChainModelID(Number(chain.daHeight));
  }
}
