import { Hash256, SerialID } from '~/application/vo';
import { Bytecode } from '~/application/vo/Bytecode';
import { Entity } from '~/core/Entity';

type PredicateProps = {
  id?: SerialID | null | undefined;
  bytecode: Bytecode;
  address: Hash256;
};

export class PredicateEntity extends Entity<
  PredicateProps,
  SerialID | null | undefined
> {
  static create(item: any, itemId?: number) {
    const id = itemId ? SerialID.create(itemId) : null;
    const bytecode = Bytecode.create(item.bytecode);
    const address = Hash256.create(item.address);
    return new PredicateEntity({ id, bytecode, address }, id);
  }

  get cursor() {
    return this.props.id?.value;
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
