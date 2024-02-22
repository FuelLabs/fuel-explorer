import { cssObj } from '@fuel-ui/css';
import { Nav } from '@fuel-ui/react';
import { NavLink } from 'react-router-dom';
import { Pages } from '~/types';

export function Header() {
  return (
    <Nav>
      <Nav.Desktop css={{ zIndex: 10 }}>
        <Nav.Logo />
        <Nav.Spacer />
        <Nav.Menu>
          <Nav.MenuItem css={styles.menuItem}>
            <a href={window.location.origin}>Explorer</a>
          </Nav.MenuItem>
          <Nav.MenuItem css={styles.menuItem}>
            <NavLink to={Pages.bridge}>Bridge</NavLink>
          </Nav.MenuItem>
          <Nav.MenuItem css={styles.menuItem}>
            <NavLink to={Pages.ecosystem}>Ecosystem</NavLink>
          </Nav.MenuItem>
        </Nav.Menu>
        <Nav.ThemeToggle />
      </Nav.Desktop>
      <Nav.Mobile css={{ zIndex: 10 }}>
        <Nav.MobileContent>
          <Nav.Logo />
          <Nav.ThemeToggle />
        </Nav.MobileContent>
        <Nav.Menu>
          <Nav.MenuItem css={styles.menuItem}>
            <a href={window.location.origin}>Explorer</a>
          </Nav.MenuItem>
          <Nav.MenuItem css={styles.menuItem}>
            <NavLink to={Pages.bridge}>Bridge</NavLink>
          </Nav.MenuItem>
          <Nav.MenuItem css={styles.menuItem}>
            <NavLink to={Pages.ecosystem}>Ecosystem</NavLink>
          </Nav.MenuItem>
        </Nav.Menu>
      </Nav.Mobile>
    </Nav>
  );
}

const styles = {
  menuItem: cssObj({
    cursor: 'pointer',
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'a.active': {
      color: '$accent9',
    },
  }),
};
