import { Hash256, SerialID } from '@core/application/vo';
import { Bytecode } from '@core/application/vo/Bytecode';
import { Entity } from '@core/shared/Entity';
import type { PredicatePayload } from './PredicateModel';

type PredicateProps = {
  bytecode: Bytecode;
  address: Hash256;
};

export class PredicateEntity extends Entity<
  PredicateProps,
  SerialID | null | undefined
> {
  static create(item: PredicatePayload, itemId?: number) {
    const id = itemId ? SerialID.create(itemId) : null;
    const bytecode = Bytecode.create(item.bytecode);
    const address = Hash256.create(item.address);
    return new PredicateEntity({ bytecode, address }, id);
  }

  static toDBItem(item: PredicatePayload): PredicatePayload {
    const bytecode = Bytecode.create(item.bytecode).value();
    const address = Hash256.create(item.address).value();
    return { bytecode, address };
  }

  get bytecode() {
    return this.props.bytecode.value();
  }

  get address() {
    return this.props.address.value();
  }

  toGQLNode() {
    return {
      bytecode: this.bytecode,
      address: this.address,
    };
  }
}
