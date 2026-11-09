import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="not-found-page">
      <h1>404 - {t('errors.not_found')}</h1>
      <p>{t('errors.not_found_short')}</p>
      <Link to="/">{t('errors.go_home')}</Link>
    </div>
  );
};

export default NotFoundPage;
