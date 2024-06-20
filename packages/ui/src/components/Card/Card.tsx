import { Card as RCard } from '@radix-ui/themes';
import {
  createComponent,
  createPolymorphicComponent,
  withNamespace,
} from '../../utils/component';
import type { BoxProps } from '../Box';
import { Box } from '../Box';
import type { HeadingProps } from '../Heading';
import { Heading } from '../Heading';
import { Text } from '../Text';
import type { TextProps } from '../Text';
import { styles } from './styles';

export type CardProps = BoxProps;
export type CardHeaderProps = BoxProps;
export type CardTitleProps = HeadingProps;
export type CardBodyProps = BoxProps;
export type CardDescriptionProps = TextProps;
export type CardFooterProps = BoxProps;

export const CardRoot = createPolymorphicComponent<CardProps, typeof Box>({
  id: 'Card',
  className: ({ className }) => styles().root({ className }),
  defaultProps: {
    as: 'article',
  },
  render: (_, props) => {
    const { className, ...rest } = props;
    return <RCard {...rest} className={className} />;
  },
});

export const CardHeader = createPolymorphicComponent<
  CardHeaderProps,
  typeof Box
>({
  id: 'CardHeader',
  baseElement: Box,
  className: ({ className }) => styles().header({ className }),
  defaultProps: {
    as: 'header',
  },
});

export const CardTitle = createComponent<CardTitleProps, typeof Heading>({
  id: 'CardTitle',
  baseElement: Heading,
  className: ({ className }) => styles().title({ className }),
  defaultProps: {
    size: '6',
  },
});

export const CardBody = createPolymorphicComponent<CardBodyProps, typeof Box>({
  id: 'CardBody',
  baseElement: Box,
  className: ({ className }) => styles().body({ className }),
});

export const CardDescription = createComponent<
  CardDescriptionProps,
  typeof Text
>({
  id: 'CardDescription',
  className: ({ className }) => styles().description({ className }),
  baseElement: Text,
});

export const CardFooter = createPolymorphicComponent<
  CardFooterProps,
  typeof Box
>({
  id: 'CardFooter',
  baseElement: Box,
  className: ({ className }) => styles().footer({ className }),
  defaultProps: {
    as: 'footer',
  },
});

export const Card = withNamespace(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
  Description: CardDescription,
  Footer: CardFooter,
});
