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
  contractHash: HashID;
};

export class ContractEntity extends Entity<ContractProps, SerialID> {
  static create(contract: ContractItem) {
    if (!contract?.data) {
      throw new Error('Contract data is required');
    }

    const id = SerialID.create(contract._id);
    const data = ContractData.create(contract.data);
    const contractHash = HashID.create(contract.contractHash);
    return new ContractEntity({ data, contractHash }, id);
  }

  static toDBItem(contract: GQLContract): Omit<ContractItem, '_id'> {
    const data = ContractData.create(contract).value();
    return { data, contractHash: contract.id };
  }

  static fromOutputs(outputs: GQLOutput[]) {
    const found = outputs?.filter(
      (output) => output.__typename === 'ContractCreated',
    ) as GQLContractCreated[];
    return found?.length ? found.map((i) => i.contract) : [];
  }

  get contractHash() {
    return this.props.contractHash.value();
  }

  get data() {
    return this.props.data.value();
  }

  toGQLNode(): GQLContract {
    return this.data;
  }
}
