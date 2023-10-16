'use client';

import type { BreadcrumbProps } from '@fuels/ui';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Copyable,
  Icon,
  Text,
} from '@fuels/ui';
import { IconHome } from '@tabler/icons-react';
import Link from 'next/link';

type TxBreadcrumbProps = BreadcrumbProps & {
  transactionId: string;
};

export function TxBreadcrumb({ transactionId, ...props }: TxBreadcrumbProps) {
  return (
    <Breadcrumb {...props} className="flex items-center">
      <BreadcrumbLink asChild>
        <Link href="/">
          <Icon icon={IconHome} size={24} color="text-muted" />
        </Link>
      </BreadcrumbLink>
      <BreadcrumbItem>
        <Text size={'6'} weight={'medium'} className="mr-2 color-current">
          Transaction
        </Text>
        <Copyable value={transactionId}>{transactionId}</Copyable>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
