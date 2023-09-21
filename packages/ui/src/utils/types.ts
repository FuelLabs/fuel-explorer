/* eslint-disable @typescript-eslint/ban-types */

import type {
  ComponentPropsWithoutRef,
  ComponentType,
  ElementType,
  ReactNode,
} from 'react';

export type RadixColors =
  | 'gray'
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'bronze'
  | 'gold'
  | 'brown'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'mint';

/**
 * CSS Types
 */

export type Spacing =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | `${string}px`
  | `${string}%`
  | `${string}rem`
  | `${string}em`
  | number;

export type Sizes =
  | Spacing
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full'
  | 'min'
  | 'max'
  | 'fit'
  | 'prose'
  | `${string}px`
  | `${string}%`
  | `${string}rem`
  | `${string}em`
  | number;

export type Colors =
  | 'text-white'
  | 'text-black'
  | 'text-transparent'
  | 'text-color'
  | 'text-icon'
  | 'text-secondary'
  | 'text-brand'
  | 'text-muted'
  | 'text-heading'
  | 'text-accent'
  | 'text-current'
  | `text-gray-${number}`
  | `text-${RadixColors}-${number}`;

/**
 * React Types
 * */

export type Children = ReactNode;
export type BaseProps<P> = P & {
  className?: string;
  children?: Children;
  autoFocus?: boolean;
  style?: React.CSSProperties;
};

export type WithGap = {
  gap?: string;
};

export type AsChildProp = {
  asChild?: boolean;
};

export type AsProp<T> = {
  as?: T;
};

export type WithAsProps = {
  as?: any;
  asChild?: boolean;
};

/**
 * Type helpers
 */

export type UnknownObj = Record<string, unknown>;
export type UnknownProps = Partial<BaseProps<unknown>>;
export type ComponentNamespace = Record<string, ComponentType<any>>;

export type HTMLPropsOf<T extends ElementType<any>> =
  JSX.LibraryManagedAttributes<T, ComponentPropsWithoutRef<T>>;

export type PropsOf<T extends ElementType<any>> = BaseProps<
  React.ComponentPropsWithoutRef<T>
>;

/**
 * Polymorhic component helpers
 */

type Extended<P = {}, OP = {}> = OP & Omit<P, keyof OP>;
type ComponentProp<C> = { as?: C };
type InheritedProps<C extends ElementType, P = {}> = Extended<
  HTMLPropsOf<C>,
  P
>;

export type PolymorphicRef<C> = C extends React.ElementType
  ? React.ComponentPropsWithRef<C>['ref']
  : never;

export type PolymorphicProps<C, P = {}> = C extends React.ElementType
  ? InheritedProps<C, P & ComponentProp<C>> & { ref?: PolymorphicRef<C> }
  : P & { as: React.ElementType };
