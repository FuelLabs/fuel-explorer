import { cssObj } from '@fuel-ui/css';
import type { BaseProps } from '@fuel-ui/react';
import { Box, Card, Text } from '@fuel-ui/react';
import { bn } from 'fuels';
import { fromNow } from '~/systems/Core/utils/dayjs';

import type { TxItem } from '../../types';
import { TxTitle } from '../TxTitle/TxTitle';

type TxCardProps = BaseProps<{
  tx: TxItem;
}>;

export function TxCard({ tx, css, ...props }: TxCardProps) {
  return (
    <Card {...props} css={{ ...styles.root, ...css }}>
      <TxTitle
        type={tx.type}
        status={tx.status}
        txHash={tx.transaction.id}
        css={styles.title}
      />
      <Box.VStack css={styles.body}>
        <Box.Flex justify="between">
          <Text leftIcon="Users">4 accounts</Text>
        </Box.Flex>
        <Box.Flex justify="between" css={styles.row}>
          <Text leftIcon="Transfer">{tx.totalOperations} operations</Text>
          <Text leftIcon="ClockHour1" className="small">
            {fromNow(tx.timestamp)}
          </Text>
        </Box.Flex>
        <Box.Flex justify="between" css={styles.row}>
          <Text leftIcon="Coins">{tx.totalAssets} assets</Text>
          <Text leftIcon="GasStation" className="small">
            {bn(tx.gasUsed).format({ units: 3 })} ETH
          </Text>
        </Box.Flex>
      </Box.VStack>
    </Card>
  );
}

const styles = {
  root: cssObj({
    transition: 'all 0.2s ease-out',

    '&:hover': {
      borderColor: '$borderHover',
    },
  }),
  title: cssObj({
    py: '$4',
    px: '$4',
  }),
  body: cssObj({
    borderTop: '1px solid $cardBorder',
    py: '$4',
    px: '$4',
  }),
  row: cssObj({
    '.fuel_Text:first-of-type': {
      flex: 1,
    },
    '.small, .fuel_Icon': {
      fontSize: '$sm',
      color: '$textMuted',
    },
  }),
};
