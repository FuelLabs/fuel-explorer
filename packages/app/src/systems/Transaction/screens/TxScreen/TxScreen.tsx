'use client';

import type {
  GroupedInput,
  GroupedOutput,
  Maybe,
} from '@fuel-explorer/graphql';
import { bn } from '@fuel-ts/math';
import { Grid, Heading, VStack } from '@fuels/ui';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

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
  const hasInputs = tx.groupedInputs?.length ?? 0 > 0;
  const hasOutputs = tx.groupedOutputs?.length ?? 0 > 0;
  const hasAssets = tx.inputAssetIds?.length ?? 0 > 0;
  const hasAccounts = tx.accountsInvolved?.length ?? 0 > 0;
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
        {hasAssets ? (
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
        ) : (
          <EmptyCard>
            <EmptyCard.Title>No Assets</EmptyCard.Title>
            <EmptyCard.Description>
              This transaction does not have any assets.
            </EmptyCard.Description>
          </EmptyCard>
        )}
      </VStack>
      <VStack className="mt-10">
        <Heading as="h2" size="3">
          Accounts
        </Heading>
        {hasAccounts ? (
          <Grid columns="4" className="gap-6">
            {tx.accountsInvolved?.map((acc) => (
              <TxAccountItem
                key={acc?.id}
                type={acc?.type as TxAccountType}
                id={acc?.id as string}
              />
            ))}
          </Grid>
        ) : (
          <EmptyCard>
            <EmptyCard.Title>No Accounts</EmptyCard.Title>
            <EmptyCard.Description>
              This transaction does not have any accounts.
            </EmptyCard.Description>
          </EmptyCard>
        )}
      </VStack>
      <Grid columns="2" className="mt-10 gap-20">
        <VStack>
          <Heading as="h2" size="3">
            Inputs
          </Heading>
          {hasInputs ? (
            tx.groupedInputs?.map((input) => (
              <TxInput
                key={getInputId(input as GroupedInput)}
                input={input as GroupedInput}
              />
            ))
          ) : (
            <EmptyCard>
              <EmptyCard.Title>No Inputs</EmptyCard.Title>
              <EmptyCard.Description>
                This transaction does not have any inputs.
              </EmptyCard.Description>
            </EmptyCard>
          )}
        </VStack>
        <VStack>
          <Heading as="h2" size="3">
            Outputs
          </Heading>
          {hasOutputs ? (
            tx.groupedOutputs?.map((output) => (
              <TxOutput
                key={getOutputId(output as GroupedOutput)}
                output={output as GroupedOutput}
              />
            ))
          ) : (
            <EmptyCard>
              <EmptyCard.Title>No Outputs</EmptyCard.Title>
              <EmptyCard.Description>
                This transaction does not have any outputs.
              </EmptyCard.Description>
            </EmptyCard>
          )}
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
