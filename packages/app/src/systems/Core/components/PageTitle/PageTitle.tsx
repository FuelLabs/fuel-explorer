'use client';
import type { BaseProps } from '@fuels/ui';
import { Heading, Badge, HStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export type PageTitleProps = BaseProps<{
  children: React.ReactNode;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}>;

export function PageTitle({
  children,
  icon,
  rightElement,
  className,
}: PageTitleProps) {
  const classes = styles();
  return (
    <Heading as="h2" className={classes.root({ className })}>
      {icon && (
        <Badge color="gray" size="2" className={classes.icon()}>
          {icon}
        </Badge>
      )}
      <HStack className={classes.title()}>{children}</HStack>
      <div className="flex items-center h-full tablet:self-end">
        {rightElement}
      </div>
    </Heading>
  );
}

const styles = tv({
  slots: {
    root: [
      'flex flex-wrap items-center justify-between gap-2',
      'border-border border-b pb-2',
      'tablet:flex-nowrap tablet:pb-4 tablet:gap-4',
    ],
    icon: ['h-full flex-shrink-0 px-2', 'tablet:self-start tablet:mt-2'],
    title: [
      'items-center basis-full gap-3 order-3 flex-shrink-0 justify-between',
      'tablet:flex-col tablet:items-start tablet:gap-0',
      'text-[1.7rem] tablet:text-[2rem] laptop:text-[2.2rem]',
      'tablet:order-none tablet:flex-1 tablet:justify-start',
    ],
  },
});
