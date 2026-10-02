import { Button } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { base, description, subtitle, title } from './styles';

export function ErrorPageComponent() {
  const { t } = useTranslation();
  return (
    <div className={base}>
      <h1 className={title}>404</h1>
      <h2 className={subtitle}>{t('errors.not_found')}</h2>
      <p className={description}>{t('errors.not_found_body')}</p>
      <Button>
        <Link to="/">{t('errors.go_home')}</Link>
      </Button>
    </div>
  );
}
