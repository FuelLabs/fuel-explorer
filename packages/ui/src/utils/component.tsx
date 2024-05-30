import type { ComponentType, ElementRef, ElementType } from 'react';
import { forwardRef } from 'react';

import { cx, fClass } from './css';
import type {
  ComponentNamespace,
  PolymorphicProps,
  PropsOf,
  WithAsProps,
} from './types';

export type CreatedForwardedComponent<
  P extends PropsOf<any>,
  C extends ElementType<any>,
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<ElementRef<C>>
>;
export type PolymorphicComponentProps = {
  id: string;
  polymorphic?: boolean;
};

type CreateOpts<P extends PropsOf<any>, C extends ElementType<any>> = {
  id: string;
  baseElement?: C;
  className?: (props: P) => string;
  defaultProps?: ComponentType<P>['defaultProps'];
  render?: (Comp: C, props: P) => JSX.Element | null;
};

export function createComponent<
  P extends PropsOf<any>,
  C extends ElementType<any>,
>(opts: CreateOpts<P, C>): CreatedForwardedComponent<P, C> {
  const {
    id,
    baseElement: El = 'div' as C,
    className: getClass,
    render,
  } = opts;

  if (!El && !render) {
    throw new Error('Must provide either baseElement or render');
  }

  type T = ElementRef<typeof El>;

  const Comp: CreatedForwardedComponent<P, C> = forwardRef<T, P>(
    (props, ref) => {
      const baseClass = getClass?.(props) ?? props.className;
      const className = cx(baseClass, fClass(id));
      const itemProps = { ref, ...props, className } as any;

      return render ? render(El, itemProps) : <El {...itemProps} />;
    },
  );

  if (opts.defaultProps) {
    Comp.defaultProps = opts.defaultProps;
  }

  const ReturnComp = Comp as typeof Comp & PolymorphicComponentProps;

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
