import { Hash256, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import type {
  GQLContract,
  GQLContractCreated,
  GQLOutput,
} from '~/graphql/generated/sdk';
import type { ContractItem } from './ContractModel';
import { ContractData } from './vo/ContractData';

type ContractProps = {
  data: ContractData;
  contractHash: Hash256;
};

export class ContractEntity extends Entity<ContractProps, SerialID> {
  static create(contract: ContractItem) {
    if (!contract?.data) {
      throw new Error('Contract data is required');
    }

    const id = SerialID.create(contract._id);
    const data = ContractData.create(contract.data);
    const contractHash = Hash256.create(contract.contractHash);
    return new ContractEntity({ data, contractHash }, id);
  }

  static toDBItem(contract: GQLContract): Omit<ContractItem, '_id'> {
    const data = ContractData.create(contract).value();
    return { data, contractHash: contract.id };
  }

  static fromOutputs(outputs: GQLOutput[]) {
    const found = outputs?.filter(
      (output) =>
        output.__typename === 'ContractCreated' && output.contract?.id,
    ) as GQLContractCreated[] | undefined;
    return found?.map((i) => i.contract) ?? [];
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
