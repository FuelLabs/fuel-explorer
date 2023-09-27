'use client';

import type {
  GroupedInput,
  GroupedOutput,
  Maybe,
} from '@fuel-explorer/graphql';
import { bn } from '@fuel-ts/math';
import { Grid, Heading, VStack } from '@fuels/ui';

import { TxAccountItem } from '../../component/TxAccountItem/TxAccountItem';
import { TxAssetItem } from '../../component/TxAssetItem/TxAssetItem';
import { TxBreadcrumb } from '../../component/TxBreadcrumb/TxBreadcrumb';
import { TxInput } from '../../component/TxInput/TxInput';
import { TxOutput } from '../../component/TxOutput/TxOutput';
import { TxSummary } from '../../component/TxSummary/TxSummary';
import type { TransactionNode, TxAccountType } from '../../types';

type TxScreenProps = {
  transaction?: Maybe<TransactionNode>;
};

export function TxScreen({ transaction: tx }: TxScreenProps) {
  if (!tx) return null;
  return (
    <VStack gap="6">
      <TxBreadcrumb transaction={tx} />
      <Heading>Transaction Details</Heading>
      <TxSummary transaction={tx}>
        <TxSummary.Details />
        <TxSummary.Params />
      </TxSummary>
      <VStack className="mt-10">
        <Heading as="h2" size="3">
          Assets
        </Heading>
        <Grid columns="4" className="gap-6">
          {tx.inputAssetIds?.map((assetId) => (
            <TxAssetItem
              key={assetId}
              assetId={assetId}
              // TODO: add right amounts
              amountIn={bn(0)}
              amountOut={bn(0)}
            />
          ))}
        </Grid>
      </VStack>
      <VStack className="mt-10">
        <Heading as="h2" size="3">
          Accounts
        </Heading>
        <Grid columns="4" className="gap-6">
          {tx.accountsInvolved?.map((acc) => (
            <TxAccountItem
              key={acc?.id}
              type={acc?.type as TxAccountType}
              id={acc?.id as string}
            />
          ))}
        </Grid>
      </VStack>
      <Grid columns="2" className="mt-10 gap-20">
        <VStack>
          <Heading as="h2" size="3">
            Inputs
          </Heading>
          {tx.groupedInputs?.map((input) => (
            <TxInput
              key={getInputId(input as GroupedInput)}
              input={input as GroupedInput}
            />
          ))}
        </VStack>
        <VStack>
          <Heading as="h2" size="3">
            Outputs
          </Heading>
          {tx.groupedOutputs?.map((output) => (
            <TxOutput
              key={getOutputId(output as GroupedOutput)}
              output={output as GroupedOutput}
            />
          ))}
        </VStack>
      </Grid>
    </VStack>
  );
}

function getInputId(input?: Maybe<GroupedInput>) {
  if (!input) return 0;
  if (input.type === 'InputCoin') return input.assetId;
  if (input.type === 'InputContract') return input.contractId;
  return input.sender;
}

function getOutputId(output?: Maybe<GroupedOutput>) {
  if (!output) return 0;
  if (output.type === 'ContractOutput') return output.inputIndex;
  if (output.type === 'ContractCreated') return output.contract?.id ?? 0;
  if (output.type === 'MessageOutput') return output.recipient;
  return output.assetId;
}
