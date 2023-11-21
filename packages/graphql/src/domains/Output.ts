import { bn } from '@fuel-ts/math';
import { groupBy } from 'lodash';

import type {
  CoinOutput,
  ContractCreated,
  TransactionItemFragment,
} from '../generated/types';

type Outputs = TransactionItemFragment['outputs'];

export class OutputDomain {
  constructor(private outputs: Outputs) {}

  get groupedOutputs() {
    return [...this.coinOutputs, ...this.contractCreatedOutputs];
  }

  get coinOutputs() {
    const outputs = this._filterByTypename<CoinOutput>([
      'CoinOutput',
      'ChangeOutput',
    ]);
    const entries = Object.entries(groupBy(outputs, (i) => i.assetId));
    return entries.map(([assetId, outputs]) => {
      const type = outputs[0].__typename;
      const to = outputs[0].to;
      return { to, assetId, type, outputs };
    });
  }

  get contractCreatedOutputs() {
    const outputs = this._filterByTypename<ContractCreated>('ContractCreated');
    const entries = Object.entries(groupBy(outputs, (i) => i.contract.id));
    return entries.map(([_, outputs]) => {
      const type = outputs[0].__typename;
      const contract = outputs[0].contract;
      return { contract, type, outputs };
    });
  }

  private _filterByTypename<T>(typename: string | string[]) {
    const type = Array.isArray(typename) ? typename : [typename];
    return this.outputs?.filter((i) => type.includes(i.__typename)) as T[];
  }

  private _getTotalAmount<T extends { amount: string }>(inputs: T[]) {
    return inputs.reduce((acc, input) => acc.add(bn(input.amount)), bn(0));
  }
}
