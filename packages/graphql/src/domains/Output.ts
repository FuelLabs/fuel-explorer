import { bn } from '@fuel-ts/math';
import { groupBy } from 'lodash';

import type {
  ChangeOutput,
  CoinOutput,
  ContractCreated,
  ContractOutput,
  MessageOutput,
  TransactionItemFragment,
  VariableOutput,
} from '../generated/types';

type Outputs = TransactionItemFragment['outputs'];

export class OutputDomain {
  constructor(private outputs: Outputs) {}

  get groupedOutputs() {
    return [
      ...this.coinOutputs,
      ...this.contractOutputs,
      ...this.messageOutputs,
      ...this.changeOutputs,
      ...this.variableOutputs,
      ...this.contractCreatedOutputs,
    ];
  }

  get coinOutputs() {
    const outputs = this._filterByTypename<CoinOutput>('CoinOutput');
    const entries = Object.entries(groupBy(outputs, (i) => i.assetId));
    return entries.map(([assetId, outputs]) => {
      const type = outputs[0].__typename;
      const to = outputs[0].to;
      const totalAmount = this._getTotalAmount(outputs);
      return { to, assetId, type, totalAmount, outputs };
    });
  }

  get contractOutputs() {
    const outputs = this._filterByTypename<ContractOutput>('ContractOutput');
    const entries = Object.entries(groupBy(outputs, (i) => i.inputIndex));
    return entries.map(([inputIndex, outputs]) => {
      const type = outputs[0].__typename;
      return { inputIndex, type, outputs };
    });
  }

  get messageOutputs() {
    const outputs = this._filterByTypename<MessageOutput>('MessageOutput');
    const entries = Object.entries(groupBy(outputs, (i) => i.recipient));
    return entries.map(([recipient, outputs]) => {
      const type = outputs[0].__typename;
      const totalAmount = this._getTotalAmount(outputs);
      return { recipient, type, outputs, totalAmount };
    });
  }

  get changeOutputs() {
    const outputs = this._filterByTypename<ChangeOutput>('ChangeOutput');
    const entries = Object.entries(groupBy(outputs, (i) => i.assetId));
    return entries.map(([assetId, outputs]) => {
      const type = outputs[0].__typename;
      const to = outputs[0].to;
      const totalAmount = this._getTotalAmount(outputs);
      return { to, assetId, type, outputs, totalAmount };
    });
  }

  get variableOutputs() {
    const outputs = this._filterByTypename<VariableOutput>('VariableOutput');
    const entries = Object.entries(groupBy(outputs, (i) => i.assetId));
    return entries.map(([assetId, outputs]) => {
      const type = outputs[0].__typename;
      const to = outputs[0].to;
      const totalAmount = this._getTotalAmount(outputs);
      return { to, assetId, type, outputs, totalAmount };
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

  private _filterByTypename<T>(typename: string) {
    return this.outputs?.filter((i) => i.__typename === typename) as T[];
  }

  private _getTotalAmount<T extends { amount: string }>(inputs: T[]) {
    return inputs.reduce((acc, input) => acc.add(bn(input.amount)), bn(0));
  }
}
