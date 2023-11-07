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
      'md:grid md:grid-cols-[1fr_auto] md:items-start',
      'md:border-b border-border md:pb-4',
      'mx-4 md:mx-8 xl:mx-0',
    ],
    title: ['items-center md:items-start flex-1'],
    text: ['text-[2rem] md:text-[2.2rem]'],
    icon: ['h-full self-stretch text-lg px-2 mt-2'],
  },
});
