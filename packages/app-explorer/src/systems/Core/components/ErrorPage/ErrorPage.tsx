import { Button } from '@fuels/ui';
import { Link } from 'react-router-dom';
import { base, description, subtitle, title } from './styles';

export function ErrorPageComponent() {
  return (
    <div className={base}>
      <h1 className={title}>404</h1>
      <h2 className={subtitle}>Page Not Found</h2>
      <p className={description}>
        The page you are looking for doesn&apos;t exist or an other error
        occurred.
      </p>
      <Button>
        <Link to="/">Go back to home</Link>
      </Button>
    </div>
  );
}
