import { css, cssObj } from '@fuel-ui/css';
import { Box, Heading } from '@fuel-ui/react';
import type { ReactNode } from 'react';

import { AssetId } from '../AssetId';

type EntityItemProps = {
  icon: ReactNode;
  title: ReactNode;
  id: string;
  size?: 'sm' | 'md' | 'lg';
};

export function EntityItem({ icon, title, id, size = 'md' }: EntityItemProps) {
  return (
    <Box className={styles.root({ size })}>
      <Box className="icon">{icon}</Box>
      <Box>
        <Heading as="h6">{title}</Heading>
        <AssetId id={id} css={styles.assetId} />
      </Box>
    </Box>
  );
}

const styles = {
  root: css({
    display: 'flex',
    gap: '$3',

    h6: {
      margin: 0,
      lineHeight: '1',
    },

    '.icon > *': {
      width: '$full',
      height: '$full',
    },

    '.fuel_Tag': {
      px: '$0',
    },

    variants: {
      size: {
        sm: {
          '.icon': {
            height: '$6',
            width: '$6',
          },
          '.fuel_Copyable': {
            fontSize: '$xs',
            width: '$5',
            height: '$5',
          },
          h6: {
            fontSize: '$sm',
            lineHeight: '0.8',
          },
        },
        md: {
          '.icon': {
            height: '$8',
            width: '$8',
          },
        },
        lg: {
          '.icon': {
            height: '$10',
            width: '$10',
          },
        },
      },
    },
  }),
  assetId: cssObj({
    fontSize: '$sm',
    lineHeight: '$tighter',
  }),
};
