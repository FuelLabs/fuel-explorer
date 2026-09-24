import { tv } from 'tailwind-variants';
import { createComponent } from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';

export type SectionTitleProps = WithAsProps & PropsOf<'h2'>;

const styles = tv({
  slots: {
    root: 'fuel-eyebrow m-0 flex items-center gap-8 text-heading',
    square: 'fuel-square shrink-0',
  },
});

export const SectionTitle = createComponent<SectionTitleProps, 'h2'>({
  id: 'SectionTitle',
  baseElement: 'h2',
  className: ({ className }) => styles().root({ className }),
  render: (_, { as: Root = 'h2', children, ...props }) => {
    return (
      <Root {...props}>
        <span aria-hidden className={styles().square()} />
        {children}
      </Root>
    );
  },
});
