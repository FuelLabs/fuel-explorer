import { bn } from "@fuel-ts/math";
import { groupBy } from "lodash";

import type {
  InputCoin,
  InputContract,
  InputMessage,
  TransactionItemFragment,
} from "../generated/types";

type Inputs = TransactionItemFragment["inputs"];

export class InputDomain {
  constructor(private inputs: Inputs) {}

  get groupedInputs() {
    return [...this.assetInputs, ...this.contractInputs, ...this.messageInputs];
  }

  get assetInputs() {
    const inputs = this._filterByTypename<InputCoin>("InputCoin");
    const entries = Object.entries(groupBy(inputs, (i) => i.assetId));
    return entries.map(([assetId, inputs]) => {
      const type = inputs[0].__typename;
      const owner = inputs[0].owner;
      const totalAmount = this._getTotalAmount(inputs);
      return { owner, assetId, type, totalAmount, inputs };
    });
  }

  get contractInputs() {
    const inputs = this._filterByTypename<InputContract>("InputContract");
    const entries = Object.entries(groupBy(inputs, (i) => i.contract.id));
    return entries.map(([contractId, inputs]) => {
      const type = inputs[0].__typename;
      return { contractId, type, inputs };
    });
  }

  get messageInputs() {
    const inputs = this._filterByTypename<InputMessage>("InputMessage");
    return inputs.map((input) => {
      const type = input.__typename;
      const sender = input.sender;
      const recipient = input.recipient;
      const data = input.data;
      return { type, sender, recipient, data, inputs: [input] };
    });
  }

  private _filterByTypename<T>(typename: string) {
    return this.inputs?.filter((i) => i.__typename === typename) as T[];
  }

  private _getTotalAmount(inputs: InputCoin[]) {
    return inputs.reduce((acc, input) => acc.add(bn(input.amount)), bn(0));
  }
}
