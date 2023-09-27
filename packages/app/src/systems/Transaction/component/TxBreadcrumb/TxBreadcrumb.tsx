'use client';

import type { BreadcrumbProps } from '@fuels/ui';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Copyable,
  Icon,
  shortAddress,
} from '@fuels/ui';
import { IconHome } from '@tabler/icons-react';
import Link from 'next/link';

import type { TransactionNode } from '../../types';

type TxBreadcrumbProps = BreadcrumbProps & {
  transaction: TransactionNode;
};

export function TxBreadcrumb({ transaction: tx, ...props }: TxBreadcrumbProps) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbLink asChild>
        <Link href="/">
          <Icon icon={IconHome} size={24} color="text-muted" />
        </Link>
      </BreadcrumbLink>
      <BreadcrumbItem>
        <Copyable value={tx.id}>{shortAddress(tx.id)}</Copyable>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
