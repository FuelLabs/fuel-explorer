import type { ReactElement } from 'react';
import { Children, cloneElement } from 'react';
import { mergeProps } from 'react-aria';

import { createComponent } from '../../utils/component';
import { pick } from '../../utils/helpers';
import type { PropsOf } from '../../utils/types';
import type { ButtonProps } from '../Button/Button';
import { Focus } from '../Focus/Focus';

import { styles } from './styles';

type PropsToOmit =
  | 'className'
  | 'onClick'
  | 'iconSize'
  | 'leftIcon'
  | 'leftIconAriaLabel'
  | 'rightIcon'
  | 'rightIconAriaLabel'
  | 'isLoading'
  | 'loadingText'
  | 'isDisabled'
  | 'justIcon'
  | 'isLink'
  | 'onClick';

export type ButtonGroupProps = Omit<ButtonProps, PropsToOmit> & PropsOf<'div'>;

const BUTTON_BASE_PROPS = ['size', 'color', 'variant', 'isDisabled', 'intent'];

export const ButtonGroup = createComponent<ButtonGroupProps, 'div'>({
  id: 'ButtonGroup',
  baseElement: 'div',
  className: ({ className }) => styles().root({ className }),
  render: (Comp, { children, ...props }) => {
    const buttons = (Children.toArray(children) as ReactElement[]).map(
      (child: ReactElement) =>
        cloneElement(
          child,
          mergeProps(child.props, pick(BUTTON_BASE_PROPS, props), {
            className: styles().button(),
          }),
        ),
    );
    return (
      <Comp {...props}>
        <Focus.ArrowNavigator>{buttons}</Focus.ArrowNavigator>
      </Comp>
    );
  },
});
