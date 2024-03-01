import { HashID, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLContract } from '~/graphql/generated/sdk';
import { ContractItem } from './ContractModel';
import { ContractData } from './vo/ContractData';

type ContractProps = {
  data: ContractData;
  contractId: HashID;
};

export class ContractEntity extends Entity<ContractProps, SerialID> {
  private constructor(id: SerialID, props: ContractProps) {
    super(id, props);
  }

  static create(contract: ContractItem) {
    const id = SerialID.create(contract._id);
    const data = ContractData.create(contract.data);
    const contractId = HashID.create(contract.contractId);
    return new ContractEntity(id, { data, contractId });
  }

  static toDBItem(contract: GQLContract) {
    const data = ContractData.create(contract).value();
    return { data, contractId: contract.id };
  }

  get contractId() {
    return this.props.contractId.value();
  }

  get data() {
    return this.props.data.value();
  }

  toGQLNode(): GQLContract {
    return this.data;
  }
}
