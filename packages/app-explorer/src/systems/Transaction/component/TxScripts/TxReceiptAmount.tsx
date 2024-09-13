import { Address, VStack } from '@fuels/ui';
import { bn } from 'fuels';
import { useContext } from 'react';

import NextLink from 'next/link';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { TxScriptsContext } from '~/systems/Transaction/component/TxScripts/ReceiptItem/constants';

export function TxReceiptAmount() {
  const { receipt: item } = useContext(TxScriptsContext);
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
