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
      <HStack className={classes.title()}>
        {icon && (
          <Badge color="gray" size="2" className={classes.icon()}>
            {icon}
          </Badge>
        )}
        <div className={classes.text()}>{children}</div>
      </HStack>
      <div className="flex items-center h-full">{rightElement}</div>
    </Heading>
  );
}

const styles = tv({
  slots: {
    root: [
      'tablet:grid tablet:grid-cols-[1fr_auto] tablet:items-start',
      'tablet:border-b border-border tablet:pb-4',
      'mx-4 tablet:mx-8 desktop:mx-0',
    ],
    title: ['items-center tablet:items-start flex-1'],
    text: ['text-[1.7rem] tablet:text-[2rem]'],
    icon: ['h-full self-stretch text-lg px-2 mt-2'],
  },
});
