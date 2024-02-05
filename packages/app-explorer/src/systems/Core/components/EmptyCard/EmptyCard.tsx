'use client';
import type { CardProps, HeadingProps, TextProps } from '@fuels/ui';
import { Card, Heading, Text, createComponent, withNamespace } from '@fuels/ui';
import { tv } from 'tailwind-variants';

import { ReactComponent as EmptySvg } from './empty.svg';

export type EmptyCardProps = CardProps & { hideImage?: boolean };
export type EmptyCardTitleProps = HeadingProps;
export type EmptyCardDescriptionProps = TextProps;

export const EmptyCardRoot = createComponent<EmptyCardProps, typeof Card>({
  id: 'EmptyCard',
  render: (_, { children, className, hideImage, ...props }) => {
    const classes = styles({ className });
    return (
      <Card {...props} className={classes.root({ className })}>
        {!hideImage && (
          <EmptySvg
            width={80}
            height={80}
            viewBox="0 0 682.66 682.66"
            className={classes.image({
              className: '[&_path]:stroke-[8] text-muted',
            })}
          />
        )}
        {children}
      </Card>
    );
  },
});

export const EmptyCardTitle = createComponent<
  EmptyCardTitleProps,
  typeof Card.Title
>({
  id: 'EmptyCardTitle',
  render: (_, { className, ...props }) => {
    const classes = styles({ className });
    return <Heading {...props} as="h4" size="5" className={classes.title()} />;
  },
});

export const EmptyCardDescription = createComponent<
  EmptyCardDescriptionProps,
  typeof Text
>({
  id: 'EmptyCardDescription',
  render: (_, { className, ...props }) => {
    const classes = styles({ className });
    return <Text {...props} className={classes.description()} />;
  },
});

export const EmptyCard = withNamespace(EmptyCardRoot, {
  Title: EmptyCardTitle,
  Description: EmptyCardDescription,
});

const styles = tv({
  slots: {
    root: 'p-6 text-center flex flex-col items-center gap-0',
    image: 'mb-6',
    title: 'font-semibold text-heading',
    description: 'text-sm text-secondary mt-2',
  },
});
