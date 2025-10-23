import type { GQLReceipt } from '@fuel-explorer/graphql/sdk';
import { VStack } from '@fuels/ui';
import clsx from 'clsx';
import { bn } from 'fuels';
import { useContext } from 'react';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { ReceiptContext } from '~/systems/Transaction/component/TxScripts/context';
import { notBoolean } from './utils';

export function TxReceiptAmount({
  className,
  valueField,
}: {
  className?: string;
  singleMode?: boolean;
  valueField?: keyof GQLReceipt;
}) {
  const { receipt: item } = useContext(ReceiptContext);
  const receipt = item?.item;
  const assetId = receipt?.assetId ?? '';
  const amountField = notBoolean(
    (valueField && receipt?.[valueField]) || receipt?.amount,
  );
  const amount = bn(amountField);
  const decimals =
    receipt && ['MINT', 'TRANSFER_OUT'].includes(receipt?.receiptType)
      ? receipt?.decimals || undefined
      : undefined;
  if (!amount?.gt?.(0)) {
    return null;
  }

  return (
    <VStack className={clsx('gap-1 items-end self-end', className)}>
      <Amount
        iconSize={16}
        assetId={assetId}
        value={amount}
        className="text-primary text-base"
        decimals={decimals}
      />
    </VStack>
  );
}
