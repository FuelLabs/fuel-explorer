import { HashID, SerialID } from '~/application/vo';
import { Bytecode } from '~/application/vo/Bytecode';
import { Entity } from '~/core/Entity';
import { PredicateItem, PredicatePayload } from './PredicateModel';

type PredicateProps = {
  bytecode: Bytecode;
  address: HashID;
};

export class PredicateEntity extends Entity<PredicateProps, SerialID> {
  static create(output: PredicateItem) {
    const id = SerialID.create(output._id);
    const bytecode = Bytecode.create(output.bytecode);
    const address = HashID.create(output.address);
    return new PredicateEntity({ bytecode, address }, id);
  }

  static toDBItem(item: PredicatePayload) {
    const bytecode = Bytecode.create(item.bytecode).value();
    const address = HashID.create(item.address).value();
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
