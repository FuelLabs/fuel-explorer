'use client';

import { Heading, Badge, Grid, Flex } from '@fuels/ui';
import type { BaseProps } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export type PageTitleProps = BaseProps<{
  icon: React.ReactNode;
  children: React.ReactNode;
}>;

export function PageTitle({ children, icon, className }: PageTitleProps) {
  const classes = styles();
  return (
    <Heading as="h2" size="3" className={classes.root({ className })}>
      <Grid
        gap="2"
        className="grid-cols-2 grid-cols-[214px_1fr] grid-rows-[40px_1fr]"
      >
        <Flex className="col-span-1 sm:w-10">
          <Badge
            color="gray"
            size="2"
            className="text-lg px-2 col-start-1 row-start-1"
          >
            {icon}
          </Badge>
        </Flex>
        {children}
      </Grid>
    </Heading>
  );
}

const styles = tv({
  slots: {
    root: 'flex items-center gap-5 text-gray-11 pb-4 border-b border-border font-normal',
  },
});
