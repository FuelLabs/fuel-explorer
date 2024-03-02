import { HashID, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import {
  GQLContract,
  GQLContractCreated,
  GQLOutput,
} from '~/graphql/generated/sdk';
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
    if (!contract?.data) {
      throw new Error('Contract data is required');
    }

    const id = SerialID.create(contract._id);
    const data = ContractData.create(contract.data);
    const contractId = HashID.create(contract.contractId);
    return new ContractEntity(id, { data, contractId });
  }

  static toDBItem(contract: GQLContract) {
    const data = ContractData.create(contract).value();
    return { data, contractId: contract.id };
  }

  static fromOutputs(outputs: GQLOutput[]) {
    const found = outputs?.filter(
      (output) => output.__typename === 'ContractCreated',
    ) as GQLContractCreated[];
    return found?.length ? found.map((i) => i.contract) : [];
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
