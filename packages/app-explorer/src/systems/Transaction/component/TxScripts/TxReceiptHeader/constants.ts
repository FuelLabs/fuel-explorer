import { GQLReceiptType } from '@fuel-explorer/graphql/sdk';
import { Routes } from '~/routes';
import {
  ReceiptHeaderOperation,
  ReceiptHeaderOperationDataType,
} from './types';

export const RECEIPT_FIELDS_MAP: Record<
  GQLReceiptType,
  Array<ReceiptHeaderOperation>
> = {
  [GQLReceiptType.Call]: [
    {
      label: 'Contract:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'to',
      fieldFallback: 'contractId',
      hrefFactory: Routes.contractAssets,
    },
    { label: 'Method', field: 'param1' },
  ],
  [GQLReceiptType.Mint]: [
    {
      label: 'Value',
      type: ReceiptHeaderOperationDataType.AMOUNT,
      field: 'val',
      requiredField: 'subId',
    },
    {
      label: 'Id:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'id',
    },
    {
      label: 'SubId:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'subId',
    },
  ],
  [GQLReceiptType.Burn]: [
    {
      label: 'Value',
      type: ReceiptHeaderOperationDataType.AMOUNT,
      field: 'val',
      requiredField: 'subId',
    },
    {
      label: 'Id:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'id',
    },
    {
      label: 'Sub Id:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'subId',
    },
  ],
  [GQLReceiptType.TransferOut]: [
    {
      label: 'Id:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'id',
    },
    {
      label: 'To:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'toAddress',
      fieldFallback: 'to',
      hrefFactory: Routes.accountAssets,
    },
  ],
  [GQLReceiptType.Transfer]: [
    {
      label: 'Id:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'id',
    },
    {
      label: 'To:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'toAddress',
      fieldFallback: 'to',
      hrefFactory: Routes.accountAssets,
    },
  ],
  [GQLReceiptType.MessageOut]: [
    {
      label: 'To:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'sender',
      requiredField: 'recipient',
      hrefFactory: Routes.accountAssets,
    },
    {
      label: 'From:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'recipient',
      requiredField: 'sender',
      hrefFactory: Routes.accountAssets,
    },
  ],
  [GQLReceiptType.Log]: [
    { label: 'PC', field: 'pc' },
    { label: 'Data:', field: 'data' },
  ],
  [GQLReceiptType.LogData]: [
    { label: 'PC', field: 'pc' },
    { label: 'Data:', field: 'data' },
  ],
  [GQLReceiptType.Panic]: [
    { label: 'Reason:', field: 'reason' },
    {
      label: 'Contract Id:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'contractId',
      hrefFactory: Routes.contractAssets,
    },
  ],
  [GQLReceiptType.Revert]: [
    { label: 'Reason:', field: 'reason' },
    {
      label: 'Contract Id:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'contractId',
      hrefFactory: Routes.contractAssets,
    },
  ],
  [GQLReceiptType.ReturnData]: [
    { label: 'PC', field: 'pc' },
    { label: 'Data:', field: 'data' },
  ],
  [GQLReceiptType.Return]: [{ label: 'Value:', field: 'val' }],
  [GQLReceiptType.ScriptResult]: [
    { label: 'Gas Used:', field: 'gasUsed' },
    { label: 'Result:', field: 'result' },
  ],
};
