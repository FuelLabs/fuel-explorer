import type { WithVariants } from '../../hooks/useVariants';
import { createComponent } from '../../utils/component';
import { styles } from './BadgeAsset.styles';

type BadgeAssetBaseProps = {
  children: React.ReactNode;
  className?: string;
  icon: string;
};

type BadgeAssetVariant = 'solid' | 'transparent';

export type BadgeAssetProps = WithVariants<
  BadgeAssetBaseProps,
  BadgeAssetVariant
>;

export const BadgeAsset = createComponent<BadgeAssetProps, 'span'>({
  id: 'BadgeAsset',
  render: (_, { children, icon, className, variant }) => {
    const classes = styles({ variant, className });
    return (
      <span className={classes}>
        <img
          src={icon}
          className="w-5 h-5 rounded-full"
          alt={`${children} logo`}
        />
        {children}
      </span>
    );
  },
  defaultProps: {
    variant: 'solid',
  },
});
