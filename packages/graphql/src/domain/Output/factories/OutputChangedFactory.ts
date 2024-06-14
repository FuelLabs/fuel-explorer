import { bn } from 'fuels';
import { groupBy } from 'lodash';
import { GQLNode } from '~/core/GQLNode';
import {
  type GQLChangeOutput,
  type GQLGroupedOutputChanged,
  GQLGroupedOutputType,
  type GQLOutput,
} from '~/graphql/generated/sdk-provider';

type Source = GQLChangeOutput;
type Typename = GQLGroupedOutputChanged['__typename'];
export type OutputChangeGroupedEntry = GQLGroupedOutputChanged;

export class OutputChangedFactory {
  value: OutputChangeGroupedEntry[];
  private constructor(data: GQLOutput[]) {
    const outputs = GQLNode.filterByType(data, 'ChangeOutput');
    this.value = this.entriesFromOutputs(outputs as Source[]);
  }

  static create(outputsData: GQLOutput[]) {
    return new OutputChangedFactory(outputsData);
  }

  private entriesFromOutputs(outputs: Source[]) {
    return Object.entries(groupBy(outputs, (i) => i.assetId)).map(
      ([assetId, outputs]) => {
        const to = outputs[0].to;
        const totalAmount = this.getTotalAmount(outputs).toString();
        return {
          __typename: 'GroupedOutputChanged' as Typename,
          type: GQLGroupedOutputType.OutputChanged,
          to,
          assetId,
          totalAmount,
          outputs,
        };
      },
    );
  }

  private getTotalAmount(outputs: Source[]) {
    return outputs.reduce((acc, output) => acc.add(bn(output.amount)), bn(0));
  }
}
