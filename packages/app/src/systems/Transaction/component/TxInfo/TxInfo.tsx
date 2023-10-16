'use client';

import { Card } from '@fuels/ui';
import type { BaseProps } from '@fuels/ui';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type TxInfoProps = BaseProps<{
  name: string;
  description?: string | null;
  children?: ReactNode;
}>;

export function TxInfo({
  className,
  name,
  description,
  children,
  ...props
}: TxInfoProps) {
  const classes = styles();
  return (
    <Card {...props} className={classes.root({ className })}>
      <Card.Header className="gap-0">
        <Card.Description className="font-medium text-sm h-6 flex items-center">
          {name}
        </Card.Description>
        <Card.Description className="font-medium text-md text-current my-1 h-6 flex items-center color-2">
          {children}
        </Card.Description>
        <Card.Description className="text-sm flex items-center">
          {description || '  '}
        </Card.Description>
      </Card.Header>
    </Card>
  );
}

const styles = tv({
  slots: {
    root: ['py-0 gap-0 border border-card-border fuel-[CardHeader]:py-4'],
  },
});
