import {
  createComponent,
  createPolymorphicComponent,
  withNamespace,
} from '~/utils/component';

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
  baseElement: Box,
  className: () => styles().root(),
  defaultProps: {
    as: 'article',
  },
});

export const CardHeader = createPolymorphicComponent<
  CardHeaderProps,
  typeof Box
>({
  id: 'CardHeader',
  baseElement: Box,
  className: () => styles().header(),
  defaultProps: {
    as: 'header',
  },
});

export const CardTitle = createComponent<CardTitleProps, typeof Heading>({
  id: 'CardTitle',
  baseElement: Heading,
  className: () => styles().title(),
});

export const CardBody = createPolymorphicComponent<CardBodyProps, typeof Box>({
  id: 'CardBody',
  baseElement: Box,
  className: () => styles().body(),
});

export const CardDescription = createComponent<
  CardDescriptionProps,
  typeof Text
>({
  id: 'CardDescription',
  baseElement: Text,
  className: () => styles().description(),
});

export const CardFooter = createPolymorphicComponent<
  CardFooterProps,
  typeof Box
>({
  id: 'CardFooter',
  baseElement: Box,
  className: () => styles().footer(),
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
