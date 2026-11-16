import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';

export const BridgeListEmpty = () => {
  const { t } = useTranslation();
  const classes = styles();

  return (
    <div className={classes.root()}>
      <p className={classes.text()}>{t('portal.history.empty')}</p>
    </div>
  );
};

const styles = tv({
  slots: {
    root: 'fuel-appear border-t border-[var(--fuel-border)] py-8',
    text: 'm-0 text-base text-[var(--fuel-element-low-em)]',
  },
});
