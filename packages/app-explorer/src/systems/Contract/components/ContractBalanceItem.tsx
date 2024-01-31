import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';

type ContractBalanceItemProps = {
  amount: string;
  assetId: string;
};

export function ContractBalanceItem({
  amount,
  assetId,
}: ContractBalanceItemProps) {
  const balanceItem = { assetId, amount };
  return (
    <BalanceItem
      key={balanceItem.assetId + balanceItem.amount}
      item={balanceItem}
    />
  );
}
