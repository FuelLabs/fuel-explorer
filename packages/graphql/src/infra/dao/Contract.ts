import type { GQLContract } from '~/graphql/generated/sdk-provider';

export default class Contract {
  id: number;
  contract_hash: string;
  data: any;

  constructor(contract: any) {
    this.id = contract._id;
    this.contract_hash = contract.contract_hash;
    this.data = contract.data;
  }

  toGQLNode(): GQLContract {
    return {
      ...this.data,
      _id: this.id,
    };
  }
}
