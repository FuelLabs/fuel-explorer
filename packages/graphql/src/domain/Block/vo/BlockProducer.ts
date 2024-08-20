import { varchar } from 'drizzle-orm/pg-core';
import { Signer } from 'fuels';
import { Address } from '~/core/Address';
import { ValueObject } from '~/core/ValueObject';
import { client } from '~/graphql/GraphQLSDK';

interface Props {
  value: Address | null;
}

export class BlockProducer extends ValueObject<Props> {
  static type() {
    return varchar('producer', { length: 66 });
  }

  static create(id: string | null) {
    if (!id) return new BlockProducer({ value: null });
    const address = new Address(id);
    return new BlockProducer({ value: address });
  }

  static async fromSdk() {
    // TODO: get from database
    const blocks = await client.sdk.blocks({ first: 2 });
    const block = blocks.data.blocks.nodes[0];
    if (block.consensus.__typename === 'Genesis') {
      return null;
    }
    const signature = block.consensus.signature;
    const producer = Signer.recoverAddress(block.id, signature).toB256();
    return producer;
  }

  value() {
    return this.props.value;
  }
}
