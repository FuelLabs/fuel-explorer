import { IconCircleCheckFilled } from '@tabler/icons-react';
import React, { createContext, useContext, useMemo } from 'react';
import { createComponent, withNamespace } from '../../utils/component';
import { icon, item, root } from './Stepper.styles';

type StepperBaseProps = {
  children: React.ReactNode;
  className?: string;
};

type StepperItemVariant = 'idle' | 'completed' | 'active';

export interface StepperProps extends StepperBaseProps {
  step: number;
}
export type StepperItemProps = StepperBaseProps;

type StepperItemContextType = {
  total: number;
  step: number;
  index: number;
};

type StepperItemIconContextType = {
  index: number;
  variant: StepperItemVariant;
};

const StepperItemContext = createContext<StepperItemContextType | undefined>(
  undefined,
);

const StepperItemIconContext = createContext<
  StepperItemIconContextType | undefined
>(undefined);

export const StepperRoot = createComponent<StepperProps, 'ol'>({
  id: 'Stepper',
  render: (_, { children, className, step }) => {
    const classes = root({ className });
    const total = React.Children.count(children);

    return (
      <ol className={classes}>
        {React.Children.map(children, (child, index) => {
          return (
            <StepperItemContext.Provider
              value={{ index: index + 1, total, step }}
            >
              {child}
            </StepperItemContext.Provider>
          );
        })}
      </ol>
    );
  },
});

export const StepperItem = createComponent<StepperItemProps, 'li'>({
  id: 'StepperItem',
  render: (_, { children, className }) => {
    const ctx = useContext(StepperItemContext);

    const variant = useMemo<StepperItemVariant>(() => {
      if (ctx?.index === ctx?.step) {
        return 'active';
      }
      if (ctx && ctx.step > ctx.index) {
        return 'completed';
      }

      return 'idle';
    }, [ctx]);

    if (!ctx) {
      throw new Error('StepperItem must be used within a StepperItem');
    }

    const classes = item({
      className,
      variant,
      separator: Boolean(ctx.index < ctx.total),
    });

    return (
      <li className={classes}>
        <span className="flex items-center whitespace-nowrap text-sm">
          <StepperItemIconContext.Provider
            value={{ index: ctx.index, variant }}
          >
            {children}
          </StepperItemIconContext.Provider>
        </span>
      </li>
    );
  },
});

export const StepperItemIcon = createComponent<{}, 'div'>({
  id: 'StepperItemIcon',
  render: () => {
    const ctx = useContext(StepperItemIconContext);

    if (!ctx) {
      throw new Error('StepperItemIcon must be used within a StepperItem');
    }

    const classes = icon({ variant: ctx.variant });

    if (ctx.variant === 'completed') {
      return (
        <span className={classes}>
          <IconCircleCheckFilled size={18} className="text-current" />
        </span>
      );
    }

    return (
      <span className={classes}>{ctx.index.toString().padStart(2, '0')}</span>
    );
  },
});

export const Stepper = withNamespace(StepperRoot, {
  Item: StepperItem,
  ItemIcon: StepperItemIcon,
});
