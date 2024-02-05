import { cssObj } from '@fuel-ui/css';
import { Badge, Text } from '@fuel-ui/react';

export const ActionRequiredBadge = () => {
  return (
    <Text>
      <Badge css={styles.actionBadge} intent="primary">
        Action Required
      </Badge>
    </Text>
  );
};

const styles = {
  actionBadge: cssObj({
    fontSize: '$xs',
    lineHeight: 1,
    fontWeight: '$medium',
    textTransform: 'none',
  }),
};
