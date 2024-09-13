import { Address, VStack } from '@fuels/ui';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { useContext } from 'react';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { ReceiptContext } from '~/systems/Transaction/component/TxScripts/context';

export function TxReceiptAmount() {
  const { receipt: item } = useContext(ReceiptContext);
  const receipt = item?.item;
  const assetId = receipt?.assetId ?? '';
  const amount = bn(receipt?.amount);
  const contract = receipt?.to ?? receipt?.contractId ?? null;

  return (
    amount.gt(0) && (
      <VStack className="gap-1 items-end mobile:max-tablet:hidden">
        <Amount
          iconSize={16}
          assetId={assetId}
          value={amount}
          className="text-xs tablet:text-sm"
        />
        <Address
          iconSize={14}
          value={assetId}
          className="text-xs tablet:text-sm font-mono"
          linkProps={{
            as: NextLink,
            href: `/contract/${contract}/assets`,
          }}
        />
      </VStack>
    )
  );
}
