import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';

type ContractBalanceItemProps = {
  balanceItem?: any;
  isLoading?: boolean;
};

export function ContractBalanceItem({
  balanceItem,
  isLoading,
}: ContractBalanceItemProps) {
  return (
    <BalanceItem
      key={balanceItem.assetId + balanceItem.amount}
      item={balanceItem}
      isLoading={isLoading}
    />
  );
}
