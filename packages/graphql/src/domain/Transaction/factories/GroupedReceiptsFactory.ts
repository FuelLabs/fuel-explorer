import {
  GQLOperationReceipt,
  GQLOperationType,
  GQLReceiptType,
} from '~/graphql/generated/sdk-provider';

type AcceptedReceiptType =
  | GQLReceiptType.Call
  | GQLReceiptType.Return
  | GQLReceiptType.ScriptResult;

const GroupTypeMap: Record<
  AcceptedReceiptType,
  Omit<GQLOperationType, 'ROOTLESS'>
> = {
  CALL: 'FROM_CONTRACT',
  RETURN: 'FINAL_RESULT',
  SCRIPT_RESULT: 'FINAL_RESULT',
};

interface Group extends GQLOperationReceipt {
  type: AcceptedReceiptType;
}

export function GroupedReceiptsFactory(group: Group) {
  const type =
    (group.type && GroupTypeMap?.[group.type]) || GQLOperationType.Rootless;
  const top = {
    type,
    receipts: [] as Array<GQLOperationReceipt>,
  };
  top.receipts.push({ item: group.item } as GQLOperationReceipt);
  group.receipts && top.receipts.push(...group.receipts);
  return top;
}
