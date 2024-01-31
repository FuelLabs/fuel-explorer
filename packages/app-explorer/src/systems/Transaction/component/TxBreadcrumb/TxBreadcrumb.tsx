'use client';

import type { BreadcrumbProps } from '@fuels/ui';
import {
  Address,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Text,
} from '@fuels/ui';
import { IconHome } from '@tabler/icons-react';
import NextLink from 'next/link';

type TxBreadcrumbProps = BreadcrumbProps & {
  transactionId: string;
};

export function TxBreadcrumb({ transactionId, ...props }: TxBreadcrumbProps) {
  return (
    <Breadcrumb {...props} className="flex items-center gap-2">
      <BreadcrumbLink asChild>
        <NextLink href="/">
          <Icon icon={IconHome} size={24} color="text-muted" />
        </NextLink>
      </BreadcrumbLink>
      <BreadcrumbItem>
        <Text size={'6'} weight={'medium'} className="mr-4 color-current">
          Transaction
        </Text>
        <Address full value={transactionId} fixed="b256" />
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
