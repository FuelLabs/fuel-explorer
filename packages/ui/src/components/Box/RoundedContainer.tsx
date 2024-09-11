import { Box as RadixBox } from '@radix-ui/themes';

import { tv } from 'tailwind-variants';
import { createComponent } from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';

export type RoundedContainerProps = WithAsProps & PropsOf<typeof RadixBox>;

const styles = tv({
  slots: {
    root: 'rounded-[13px] p-4 bg-white dark:bg-card-bg',
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
    return <Comp {...props}>{children}</Comp>;
  },
});
