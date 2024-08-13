'use client';
import type { BaseProps } from '@fuels/ui';
import { HStack, Heading } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export type PageTitleProps = BaseProps<{
  as?: string;
  size?: '1' | '2' | '3';
  children: React.ReactNode;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}>;

export function PageTitle({
  children,
  as = 'h2',
  size = '1',
  rightElement,
  className,
}: PageTitleProps) {
  const classes = styles({ size });
  return (
    <Heading as={as} className={classes.root({ className })}>
      <HStack className={classes.title()}>{children}</HStack>
      <div className="flex items-center h-full tablet:self-center">
        {rightElement}
      </div>
    </Heading>
  );
}

const styles = tv({
  slots: {
    root: [
      'first:mb-4 flex items-center justify-between gap-2',
      'tablet:flex-nowrap tablet:gap-4',
    ],
    icon: ['h-full flex-shrink-0 px-2', 'tablet:self-start tablet:mt-1.5'],
    title: [
      'items-center basis-full gap-3 order-3 flex-shrink-0 justify-between',
      'tablet:flex-col tablet:items-start tablet:gap-0',
      'text-[1.7rem] tablet:text-[2rem] laptop:text-[2.2rem]',
      'tablet:order-none tablet:flex-1 tablet:justify-start',
    ],
  },
  variants: {
    size: {
      '1': {
        root: 'flex-wrap pb-2 tablet:pb-4',
        title: 'text-[1.7rem] tablet:text-[2rem] laptop:text-[2.2rem]',
      },
      '2': {
        title: 'text-[1.4rem] tablet:text-[1.7rem] laptop:text-[1.9rem]',
        root: 'pb-2 tablet:pb-4',
      },
      '3': {
        title: 'text-[1.2rem] tablet:text-[1.4rem] laptop:text-[1.6rem]',
        root: 'pb-2',
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
});
