'use client';
import type { BaseProps } from '@fuels/ui';
import { Button, Box } from '@fuels/ui';
import { IconChecklist, IconCodeAsterix, IconCoins } from '@tabler/icons-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { tv } from 'tailwind-variants';

type AccountTabsProps = BaseProps<{
  accountId: string;
  isPredicate?: boolean;
}>;

export function AccountTabs({
  className,
  accountId,
  isPredicate,
  ...props
}: AccountTabsProps) {
  const classes = styles({ className });
  const pathname = usePathname();
  return (
    <Box className={classes.root()} {...props}>
      <Button
        as={NextLink}
        href={`/account/${accountId}`}
        color="gray"
        className={classes.button()}
        data-active={pathname === `/account/${accountId}`}
        variant="surface"
        leftIcon={IconCoins}
      >
        Assets
      </Button>
      <Button
        as={NextLink}
        href={`/account/${accountId}/transactions`}
        color="gray"
        className={classes.button()}
        data-active={pathname === `/account/${accountId}/transactions`}
        variant="surface"
        leftIcon={IconChecklist}
      >
        Transactions
      </Button>
      <Button
        as={NextLink}
        href={isPredicate ? `/account/${accountId}/predicate` : ''}
        color="gray"
        className={classes.button()}
        data-active={pathname === `/account/${accountId}/predicate`}
        variant="surface"
        leftIcon={IconCodeAsterix}
        disabled={!isPredicate}
      >
        Predicate
      </Button>
    </Box>
  );
}

const styles = tv({
  slots: {
    root: [
      'mobile:max-tablet:pb-4',
      'grid items-center gap-2',
      'flex justify-start max-w-full overflow-x-auto',
    ],
    button: [
      'bg-transparent text-muted',
      'enabled:hover:bg-gray-2 enabled:hover:text-heading transition-colors',
      'data-[active=true]:bg-gray-2 data-[active=true]:text-heading',
      'fuel-[Icon]:hover:text-icon',
      'fuel-[Icon]:data-[active=true]:text-icon',
      'disabled:opacity-50',
    ],
  },
});
