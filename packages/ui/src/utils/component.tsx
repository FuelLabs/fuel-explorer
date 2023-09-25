/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType, ElementType, ElementRef } from 'react';
import { forwardRef } from 'react';

import { cx, fClass } from './css';
import type {
  ComponentNamespace,
  PolymorphicProps,
  PropsOf,
  WithAsProps,
} from './types';
type CreateOpts<
  P extends PropsOf<any>,
  C extends ComponentType<any> | ElementType<any>,
> = {
  id: string;
  baseElement?: C;
  className?: string | ((props: P) => string);
  defaultProps?: ComponentType<P>['defaultProps'];
  render?: (Comp: C, props: P) => JSX.Element | null;
};

export function createComponent<
  P extends PropsOf<any>,
  C extends ComponentType<any> | ElementType<any>,
>(opts: CreateOpts<P, C>) {
  const { id, baseElement: El = 'div', className: getClass, render } = opts;

  if (!El && !render) {
    throw new Error('Must provide either baseElement or render');
  }

  type T = ElementRef<typeof El>;
  const Comp = forwardRef<T, P & PropsOf<typeof El>>(
    ({ className, ...props }, ref) => {
      const baseClass =
        typeof getClass === 'function' ? getClass(props as P) : getClass;
      const classes = cx(baseClass, className, fClass(id));
      const itemProps = { ref, className: classes, ...props } as any;
      return render ? render(El as C, itemProps) : <El {...itemProps} />;
    },
  );

  if (opts.defaultProps) {
    Comp.defaultProps = opts.defaultProps;
  }

  const ReturnComp = Comp as typeof Comp & {
    id: string;
    polymorphic?: boolean;
  };

  ReturnComp.id = id;
  ReturnComp.displayName = id;
  return ReturnComp;
}

export function withNamespace<
  C extends ComponentType<any> | ElementType<any>,
  N extends ComponentNamespace,
>(Comp: C, namespace: N) {
  for (const [key, SubComp] of Object.entries(namespace)) {
    Comp[key] = SubComp;
  }
  return Comp as C & N;
}

function polymorphicRender<
  P extends WithAsProps & PropsOf<any>,
  C extends ComponentType | ElementType = ComponentType<P>,
>(Base: C, { as: Root = 'div', asChild, children, ...props }: P) {
  const El = Base as any;
  const innerChildren = asChild ? children : <Root>{children}</Root>;
  return (
    <El {...props} asChild>
      {innerChildren}
    </El>
  );
}

export function createPolymorphicComponent<
  P extends PropsOf<C>,
  C extends ComponentType<any> | ElementType<any> = ComponentType<P>,
>(opts: CreateOpts<P, C>) {
  type Props = Omit<P, 'as' | 'asChild'>;
  type PolymorphicComponent = <T = C>(
    props: PolymorphicProps<T, Props>,
  ) => React.ReactElement;

  const Comp = createComponent<P, C>({
    ...opts,
    render: opts.render ?? polymorphicRender,
  });
  return Comp as PolymorphicComponent & typeof Comp;
}
