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
      <div className="flex items-center h-full">{rightElement}</div>
    </Heading>
  );
}

const styles = tv({
  slots: {
    root: [
      'flex flex-wrap items-center justify-between gap-4',
      'tablet:flex-nowrap',
    ],
    icon: ['h-full flex-shrink-0 px-2'],
    title: [
      'items-center basis-full gap-3 order-3 flex-shrink-0 justify-between',
      'text-[1.7rem]',
      'mobile:text-[2rem] tablet:text-[2.2rem]',
      'tablet:order-none tablet:flex-1 tablet:justify-start',
    ],
  },
});
