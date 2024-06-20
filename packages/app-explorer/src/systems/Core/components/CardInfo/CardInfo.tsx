'use client';

import { Box, Card, Text } from '@fuels/ui';
import type { BaseProps } from '@fuels/ui';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type CardInfoProps = BaseProps<{
  name?: string;
  description?: ReactNode | null;
  children?: ReactNode;
}>;

export function CardInfo({
  className,
  name,
  description,
  children,
  ...props
}: CardInfoProps) {
  const classes = styles();
  return (
    <Card {...props} className={classes.root({ className })}>
      <Card.Body className={classes.body()}>
        {name && (
          <Text as="h3" className={classes.name()}>
            {name}
          </Text>
        )}
        <Box>{children}</Box>
        <Text className="text-xs text-muted">{description}</Text>
      </Card.Body>
    </Card>
  );
}

const styles = tv({
  slots: {
    root: 'py-2 gap-0',
    name: 'mb-2 text-sm text-muted leading-1',
    body: 'py-2',
  },
});
