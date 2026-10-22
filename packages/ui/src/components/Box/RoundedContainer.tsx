import { Box as RadixBox } from '@radix-ui/themes';

import { tv } from 'tailwind-variants';
import { createComponent } from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';
import { FrameCorners } from '../GridFrame/FrameCorners';

export type RoundedContainerProps = WithAsProps & PropsOf<typeof RadixBox>;

const styles = tv({
  slots: {
    root: 'fuel-cell p-4 bg-card-bg border border-card-border',
  },
});

export const RoundedContainer = createComponent<
  RoundedContainerProps,
  typeof RadixBox
>({
  id: 'RoundedContainer',
  baseElement: RadixBox,
  className: ({ className }) => styles().root({ className }),
  render: (Comp, { children, ...props }) => {
    // A cell inside a GridFrame; on its own it marks two corners.
    return (
      <Comp {...props}>
        {children}
        <FrameCorners variant="pair" />
      </Comp>
    );
  },
});
