import type { BaseProps, CardProps, BoxProps } from '@fuel-explorer/ui';
import {
  Text,
  HStack,
  createComponent,
  Card,
  withNamespace,
  Box,
  EntityItem,
  VStack,
  Badge,
} from '@fuel-explorer/ui';
import { bn } from '@fuel-ts/math';
import {
  IconCalendar,
  IconCoins,
  IconGasStation,
  IconTransfer,
  IconUsers,
} from '@tabler/icons-react';
import { createContext, useContext } from 'react';
import { tv } from 'tailwind-variants';
import { fromNow, fullTime } from '~/systems/Core/utils/dayjs';

import { useTx } from '../../hooks/useTx';
import type { TransactionNode, TxItem } from '../../types';
import { TX_INTENT_MAP, TxIcon } from '../TxIcon/TxIcon';

export type TxSummaryProps = BaseProps<{ transaction: TransactionNode }>;
export type TxSummaryDetailsProps = CardProps;
export type TxSummaryParamsProps = CardProps;

type Context = { tx: TxItem };
const ctx = createContext<Context>({} as Context);

export const TxSummaryRoot = createComponent<TxSummaryProps, typeof HStack>({
  id: 'TxSummary',
  baseElement: HStack,
  render: (Comp, { transaction, className, ...props }) => {
    const classes = styles();
    const tx = useTx(transaction);
    return (
      <ctx.Provider value={{ tx }}>
        <Comp {...props} className={classes.root({ className })} />
      </ctx.Provider>
    );
  },
});

type TxSummaryRowProps = BoxProps & { label: string };
const TxSummaryRow = createComponent<TxSummaryRowProps, typeof Box>({
  id: 'TxSummaryRow',
  baseElement: Box,
  render: (Comp, { className, children, label, ...props }) => {
    const classes = styles();
    return (
      <Comp {...props} className={classes.row({ className })}>
        <Text className={classes.rowLabel()}>{label}</Text>
        <HStack align="center">{children}</HStack>
      </Comp>
    );
  },
});

export const TxSummaryDetails = createComponent<
  TxSummaryDetailsProps,
  typeof Card
>({
  id: 'TxSummaryDetails',
  baseElement: Card,
  render: (Comp, { className, ...props }) => {
    const { tx } = useContext(ctx);
    const classes = styles();
    return (
      <Comp {...props} className={classes.details({ className })}>
        <Card.Body as={VStack} className="p-0">
          <TxSummaryRow label="Type">
            <EntityItem>
              <EntityItem.Slot>
                <TxIcon status={tx.status} type={tx.type} />
              </EntityItem.Slot>
              <EntityItem.Info id={tx.transaction?.id} title={tx.title} />
            </EntityItem>
          </TxSummaryRow>
          <TxSummaryRow label="Timestamp">
            <Text as="span">{fromNow(tx.timestamp)}</Text>
            <Text as="span" iconColor="text-muted" leftIcon={IconCalendar}>
              {fullTime(tx.timestamp)}
            </Text>
          </TxSummaryRow>
          <TxSummaryRow label="Status">
            <Badge color={TX_INTENT_MAP[tx.status]} size="2">
              {tx.status}
            </Badge>
          </TxSummaryRow>
          <TxSummaryRow label="Block">
            <Text>#000001</Text>
          </TxSummaryRow>
          <TxSummaryRow label="Gas Spent">
            <Text
              iconColor="text-muted"
              iconSize={24}
              leftIcon={IconGasStation}
            >
              {bn(tx.gasUsed).format({ units: 3 })} ETH
            </Text>
          </TxSummaryRow>
        </Card.Body>
      </Comp>
    );
  },
});

export const TxSummaryParams = createComponent<
  TxSummaryParamsProps,
  typeof Card
>({
  id: 'TxSummaryParams',
  baseElement: Card,
  render: (Comp, { className, ...props }) => {
    const { tx } = useContext(ctx);
    const classes = styles();
    return (
      <Comp {...props} className={classes.params({ className })}>
        <Card.Body as={VStack} className="p-0">
          <Text iconSize={24} leftIcon={IconCoins}>
            {tx.totalAssets} assets
          </Text>
          <Text iconSize={24} leftIcon={IconUsers}>
            {tx.totalAccounts} accounts involved
          </Text>
          <Text iconSize={24} leftIcon={IconTransfer}>
            {tx.totalOperations} operations
          </Text>
        </Card.Body>
      </Comp>
    );
  },
});

export const TxSummary = withNamespace(TxSummaryRoot, {
  Details: TxSummaryDetails,
  Params: TxSummaryParams,
});

const styles = tv({
  slots: {
    root: 'grid grid-cols-[2fr,1fr]',
    details: 'p-6',
    params: 'p-6 fuel-[Text]:text-lg',
    row: 'grid grid-cols-[100px,1fr] gap-8 items-center',
    rowLabel: 'text-lg text-medium text-secondary',
  },
});
