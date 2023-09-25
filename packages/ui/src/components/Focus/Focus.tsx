// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="@react-aria/focus" />
import type { FocusScopeProps } from '@react-aria/focus';
import { FocusScope } from '@react-aria/focus';
import { Children, cloneElement } from 'react';
import type { ReactElement } from 'react';
import { mergeProps } from 'react-aria';

import { createComponent } from '../../utils/component';

import { useFocusNavigator, isRightChildrenType } from './useFocusNavigator';

export type FocusArrowNavigatorProps = FocusScopeProps;

export const FocusArrowNavigator = createComponent<
  FocusArrowNavigatorProps,
  typeof FocusScope
>({
  id: 'FocusArrowNavigator',
  render: (_, { children, ...props }) => {
    const { onKeyDown } = useFocusNavigator();

    if (isRightChildrenType(children)) {
      const child = Children.map(
        children as ReactElement[],
        (child: ReactElement) => {
          return cloneElement(child, mergeProps(child.props, { onKeyDown }));
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;
      return <FocusScope {...props}>{child}</FocusScope>;
    }

    throw new Error('Children type not accepted');
  },
});

export const Focus = {
  ArrowNavigator: FocusArrowNavigator,
  Scope: FocusScope,
};
