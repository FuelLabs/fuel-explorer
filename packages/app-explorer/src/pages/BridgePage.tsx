import { useNavigate, useSearchParams } from 'react-router-dom';
import { BridgePage as PortalBridgePage } from '~portal/systems/Bridge/page-root';

export default function BridgePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const navigationProps = {
    navigate,
    searchParams,
  };

  return <PortalBridgePage navigationProps={navigationProps} />;
}
