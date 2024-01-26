import { cssObj } from '@fuel-ui/css';
import { Nav } from '@fuel-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pages } from '~/types';

import { removeTrailingSlash } from '../utils';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLinkActive = (url: string) => {
    return removeTrailingSlash(location.pathname).startsWith(
      removeTrailingSlash(url)
    );
  };

  return (
    <Nav>
      <Nav.Desktop>
        <Nav.Logo />
        <Nav.Spacer />
        <Nav.Menu>
          <Nav.MenuItem
            as="div"
            css={styles.menuItem}
            isActive={isLinkActive(Pages.bridge)}
            onClick={() => navigate(Pages.bridge)}
          >
            Bridge
          </Nav.MenuItem>
          <Nav.MenuItem
            as="div"
            css={styles.menuItem}
            isActive={isLinkActive(Pages.ecosystem)}
            onClick={() => navigate(Pages.ecosystem)}
          >
            Ecosystem
          </Nav.MenuItem>
        </Nav.Menu>
        <Nav.ThemeToggle />
      </Nav.Desktop>
      <Nav.Mobile>
        <Nav.MobileContent>
          <Nav.Logo />
          <Nav.ThemeToggle />
        </Nav.MobileContent>
        <Nav.Menu>
          <Nav.MenuItem
            as="div"
            css={styles.menuItem}
            isActive={isLinkActive(Pages.bridge)}
            onClick={() => navigate(Pages.bridge)}
          >
            Bridge
          </Nav.MenuItem>
          <Nav.MenuItem
            as="div"
            css={styles.menuItem}
            isActive={isLinkActive(Pages.ecosystem)}
            onClick={() => navigate(Pages.ecosystem)}
          >
            Ecosystem
          </Nav.MenuItem>
        </Nav.Menu>
      </Nav.Mobile>
    </Nav>
  );
}

const styles = {
  menuItem: cssObj({
    cursor: 'pointer',
  }),
};
