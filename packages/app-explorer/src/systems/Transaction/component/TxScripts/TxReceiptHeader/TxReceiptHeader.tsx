import { GQLReceiptType } from '@fuel-explorer/graphql/sdk';
import { Collapsible, Flex, HStack, VStack } from '@fuels/ui';
import { useContext } from 'react';
import { TxOperationHeader } from '~/systems/Transaction/component/TxScripts/TxOperationHeader';
import { TxReceiptAmount } from '~/systems/Transaction/component/TxScripts/TxReceiptAmount';
import { TxReceiptBadge } from '~/systems/Transaction/component/TxScripts/TxReceiptBadge/TxReceiptBadge';
import { ReceiptContext } from '~/systems/Transaction/component/TxScripts/context';

import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';
import { TxIconType } from '~/systems/Transaction/types';
import { RECEIPT_FIELDS_MAP } from './constants';
import { styles } from './styles';

const TX_ICON_MAP: Record<GQLReceiptType, TxIconType> = {
  TRANSFER_OUT: 'Transfer',
  TRANSFER: 'Transfer',
  SCRIPT_RESULT: 'Script',
  REVERT: 'ContractCall',
  RETURN_DATA: 'Message',
  RETURN: 'Message',
  PANIC: 'Message',
  MINT: 'Mint',
  MESSAGE_OUT: 'Message',
  LOG_DATA: 'Message',
  LOG: 'Message',
  CALL: 'ContractCall',
  BURN: 'Burn',
};

export function TxReceiptHeader() {
  const { receipt: item } = useContext(ReceiptContext);
  const receipt = item?.item;
  const classes = styles();
  const type = (receipt?.receiptType ?? 'UNKNOWN') as GQLReceiptType;
  const txIcon: TxIconType = TX_ICON_MAP?.[type] ?? 'Message';
  const fields = RECEIPT_FIELDS_MAP[type] || [];

  return (
    <Collapsible.Header className={classes.header()}>
      <Flex className="gap-2 flex-col tablet:flex-row w-full">
        <TxReceiptBadge />
        <HStack className="flex-1 gap-4 items-center w-full">
          <TxIcon
            type={txIcon}
            status={type === GQLReceiptType.Panic ? 'Failure' : 'Submitted'}
          />

          <VStack className="flex-1 gap-[2px]">
            {fields?.map((field, index) => (
              <TxOperationHeader
                key={`operation-header-${field.type}-${
                  field.requiredField ?? ''
                }-${field.field}-${field.fieldFallback}`}
                field={field}
                index={index}
                receipt={receipt}
              />
            ))}
          </VStack>
          <TxReceiptAmount />
        </HStack>
      </Flex>
    </Collapsible.Header>
  );
}
