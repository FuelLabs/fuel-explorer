import { Hash256, SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import type {
  GQLContract,
  GQLContractCreated,
  GQLOutput,
} from '~/graphql/generated/sdk-provider';
import { ContractData } from './vo/ContractData';

type ContractProps = {
  id: SerialID;
  data: ContractData;
  contractHash: Hash256;
};

export class ContractEntity extends Entity<ContractProps, SerialID> {
  static create(contract: any) {
    if (!contract?.data) {
      throw new Error('Contract data is required');
    }

    const id = SerialID.create(contract._id);
    const data = ContractData.create(contract.data);
    const contractHash = Hash256.create(contract.contractHash);
    return new ContractEntity({ id, data, contractHash }, id);
  }

  static toDBItem(contract: GQLContract): any {
    return {
      data: contract,
      contractHash: contract.id,
    };
  }

  static fromOutputs(outputs: GQLOutput[]) {
    const found = outputs?.filter(
      (output) => output.__typename === 'ContractCreated' && output.contract,
    ) as GQLContractCreated[] | undefined;
    return found?.map((i) => i.contract) ?? [];
  }

  get cursor() {
    return this.contractHash;
  }

  get id() {
    return this.props.id.value();
  }

  get contractHash() {
    return this.props.contractHash.value();
  }

  get data() {
    return this.props.data.value();
  }

  toGQLNode(): GQLContract {
    return {
      ...this.data,
      _id: this.id,
    };
  }
}
