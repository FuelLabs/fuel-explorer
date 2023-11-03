import type {
  ContractBalanceConnectionItemFragment,
  Maybe,
} from '@fuel-explorer/graphql';
import { Asset, Card, HStack, VStack } from '@fuels/ui';
import { bn } from 'fuels';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

type TabAssetsProps = {
  contractBalances?: Maybe<ContractBalanceConnectionItemFragment>;
};

export function TabAssets({ contractBalances }: TabAssetsProps) {
  const nonZeroBalances = contractBalances?.edges.filter(
    (contractBalance) => !bn(contractBalance.node.amount).isZero(),
  );

  return (
    <VStack gap="4" className="mt-1">
      {!nonZeroBalances?.length && (
        <EmptyCard hideImage>
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

type ContractBalanceItemProps = {
  amount: string;
  assetId: string;
};

export function ContractBalanceItem({
  amount,
  assetId,
}: ContractBalanceItemProps) {
  const listedAsset = useAsset(assetId);
  const asset = {
    ...listedAsset,
    symbol: listedAsset?.symbol ?? '',
    name: listedAsset?.name ?? '',
  };

  return (
    <Card>
      <Card.Body>
        <Asset
          hideIcon
          className="w-full justify-between"
          asset={asset}
          amount={amount}
        >
          <HStack gap="4" className="items-center">
            <Asset.Icon />
            <Asset.Name className="text-gray-12" />
            <Asset.Symbol className="text-gray-9" />
          </HStack>
          <Asset.Amount />
        </Asset>
      </Card.Body>
    </Card>
  );
}
