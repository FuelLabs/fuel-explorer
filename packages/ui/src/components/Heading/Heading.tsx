import { Heading as RadixHeading } from '@radix-ui/themes';
import type { WithIconProps } from '~/hooks/useIconProps';
import { useIconProps } from '~/hooks/useIconProps';
import { createComponent } from '~/utils/component';
import { cx } from '~/utils/css';
import type { PropsOf } from '~/utils/types';

export type HeadingProps = Omit<WithIconProps, 'size'> &
  PropsOf<typeof RadixHeading>;

export const Heading = createComponent<HeadingProps, typeof RadixHeading>({
  id: 'Heading',
  baseElement: RadixHeading,
  className: 'font-medium',
  render(Comp, { className, iconColor = 'text-icon', ...props }) {
    const itemProps = useIconProps({ iconColor, ...props } as WithIconProps);
    return (
      <Comp
        {...itemProps}
        className={cx('flex items-center gap-2', className)}
      />
    );
  },
});
