import { varchar } from 'drizzle-orm/pg-core';
import { Signer } from 'fuels';
import { Address } from '~/core/Address';
import { ValueObject } from '~/core/ValueObject';
import { GQLBlock } from '~/graphql/generated/sdk';

interface Props {
  value: Address | null;
}

export class BlockProducer extends ValueObject<Props> {
  static type() {
    return varchar('producer', { length: 66 });
  }

  static create(block: GQLBlock) {
    if (block.consensus.__typename === 'Genesis') {
      return new BlockProducer({ value: null });
    }
    const signature = block.consensus.signature;
    const producer = Signer.recoverAddress(block.id, signature).toB256();
    const value = new Address(producer);
    return new BlockProducer({ value });
  }

  value() {
    return this.props.value;
  }
}
