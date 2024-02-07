import { Nav, useTheme } from '@fuels/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pages } from '~/types';

import { tv } from 'tailwind-variants';
import { removeTrailingSlash } from '../utils';

export function Header() {
  const classes = styles();
  const { toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isLinkActive = (url: string) => {
    return removeTrailingSlash(location.pathname).startsWith(
      removeTrailingSlash(url),
    );
  };

  const themeToggle = (
    <Nav.ThemeToggle whenOpened="no-effect" onToggle={() => toggleTheme()} />
  );

  return (
    <Nav>
      <Nav.Desktop className={'px-10 justify-between'}>
        <Nav.Menu>
          <Nav.Logo />
        </Nav.Menu>
        <Nav.Menu>
          <Nav.MenuItem
            as="div"
            className={classes.menuItem()}
            isActive={isLinkActive(Pages.bridge)}
            onClick={() => navigate(Pages.bridge)}
          >
            Bridge
          </Nav.MenuItem>
          <Nav.MenuItem
            as="div"
            className={classes.menuItem()}
            isActive={isLinkActive(Pages.ecosystem)}
            onClick={() => navigate(Pages.ecosystem)}
          >
            Ecosystem
          </Nav.MenuItem>
          {themeToggle}
        </Nav.Menu>
      </Nav.Desktop>
      <Nav.Mobile>
        <Nav.MobileContent>
          <Nav.Logo />
          {themeToggle}
        </Nav.MobileContent>
        <Nav.Menu>
          <Nav.MenuItem
            as="div"
            className={classes.menuItem()}
            isActive={isLinkActive(Pages.bridge)}
            onClick={() => navigate(Pages.bridge)}
          >
            Bridge
          </Nav.MenuItem>
          <Nav.MenuItem
            as="div"
            className={classes.menuItem()}
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

export const styles = tv({
  slots: {
    menuItem: 'pointer',
  },
});
