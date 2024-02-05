"use client";
import type {
  ContractBalanceConnectionItemFragment,
  Maybe,
} from "@fuel-explorer/graphql";
import { VStack } from "@fuels/ui";
import { bn } from "fuels";
import { EmptyCard } from "~/systems/Core/components/EmptyCard/EmptyCard";

import { ContractBalanceItem } from "./ContractBalanceItem";

type TabAssetsProps = {
  balances?: Maybe<ContractBalanceConnectionItemFragment>;
};

export function ContractAssetList({ balances }: TabAssetsProps) {
  const nonZeroBalances = balances?.edges.filter(
    (contractBalance) => !bn(contractBalance.node.amount).isZero(),
  );

  return (
    <VStack gap="4" className="mt-1">
      {!nonZeroBalances?.length && (
        <EmptyCard>
          <EmptyCard.Title>No Assets</EmptyCard.Title>
          <EmptyCard.Description>
            This contract does not have any assets.
          </EmptyCard.Description>
        </EmptyCard>
      )}
      {nonZeroBalances?.map((contractBalance) => {
        if (bn(contractBalance.node.amount).isZero()) return null;

        return (
          <ContractBalanceItem
            key={contractBalance.cursor + JSON.stringify(contractBalance.node)}
            {...contractBalance.node}
          />
        );
      })}
    </VStack>
  );
}
