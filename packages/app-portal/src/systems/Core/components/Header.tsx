import { Nav, useTheme } from '@fuels/ui';
import { NavLink } from 'react-router-dom';
import { Pages } from '~/types';

import { tv } from 'tailwind-variants';
import { removeTrailingSlash } from '../utils';

export function Header() {
  const classes = styles();
  const { toggleTheme } = useTheme();

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
          <Nav.MenuItem className={classes.menuItem()}>
            <a href={window.location.origin}>Explorer</a>
          </Nav.MenuItem>
          <Nav.MenuItem className={classes.menuItem()}>
            <NavLink to={Pages.bridge}>Bridge</NavLink>
          </Nav.MenuItem>
          <Nav.MenuItem className={classes.menuItem()}>
            <NavLink to={Pages.ecosystem}>Ecosystem</NavLink>
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
          <Nav.MenuItem className={classes.menuItem()}>
            <a href={window.location.origin}>Explorer</a>
          </Nav.MenuItem>
          <Nav.MenuItem className={classes.menuItem()}>
            <NavLink to={Pages.bridge}>Bridge</NavLink>
          </Nav.MenuItem>
          <Nav.MenuItem className={classes.menuItem()}>
            <NavLink to={Pages.ecosystem}>Ecosystem</NavLink>
          </Nav.MenuItem>
        </Nav.Menu>
      </Nav.Mobile>
    </Nav>
  );
}

const styles = tv({
  slots: {
    menuItem:
      'pointer [a]:color-inherit [a.active]:text-success [a]:decoration-none [a.active]:decoration-none',
  },
});
