import { SerialID } from '~/application/vo';
import { Address } from '~/application/vo/Address';
import { Bytecode } from '~/application/vo/Bytecode';
import { Entity } from '~/core/Entity';
import { PredicateItem, PredicatePayload } from './PredicateModel';

type PredicateProps = {
  bytecode: Bytecode;
  address: Address;
};

export class PredicateEntity extends Entity<PredicateProps, SerialID> {
  private constructor(id: SerialID, props: PredicateProps) {
    super(id, props);
  }

  static create(output: PredicateItem) {
    const id = SerialID.create(output._id);
    const bytecode = Bytecode.create(output.bytecode);
    const address = Address.create(output.address);
    return new PredicateEntity(id, { bytecode, address });
  }

  static toDBItem(item: PredicatePayload) {
    const bytecode = Bytecode.create(item.bytecode).value();
    const address = Address.create(item.address).value();
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
