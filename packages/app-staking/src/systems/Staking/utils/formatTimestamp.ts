import { intlLanguage } from 'app-commons';
import { getI18n } from 'react-i18next';

export const formatTimestamp = (timestamp?: number) => {
  if (!timestamp) {
    return getI18n().t('staking.date.unknown');
  }

  return new Intl.DateTimeFormat(intlLanguage(), {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestamp * 1000));
};
