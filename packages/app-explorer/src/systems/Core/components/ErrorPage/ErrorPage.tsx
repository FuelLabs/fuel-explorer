import { Button } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PageState } from '../PageState/PageState';

export function ErrorPageComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="py-8 tablet:py-16">
      <h1 className="sr-only">404</h1>
      <PageState
        title={t('errors.not_found')}
        description={t('errors.not_found_body')}
        action={
          <Button onClick={() => navigate('/')}>{t('errors.go_home')}</Button>
        }
      />
    </div>
  );
}
