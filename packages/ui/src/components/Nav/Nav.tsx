import {
  IconMenu2,
  IconMoonFilled,
  IconSunFilled,
  IconWallet,
  IconX,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Children, cloneElement, useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { useStrictedChildren } from '~/hooks/useStrictedChildren';
import { createComponent, withNamespace } from '~/utils/component';
import type { AsChildProp, PropsOf, WithAsProps } from '~/utils/types';

import { Badge } from '../Badge/Badge';
import { Box, HStack } from '../Box';
import type { BoxProps, HStackProps } from '../Box';
import { Button } from '../Button/Button';
import { FuelLogo, type FuelLogoProps } from '../FuelLogo/FuelLogo';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton';
import type { LinkProps } from '../Link/Link';
import { Link } from '../Link/Link';
import { useTheme } from '../Theme/useTheme';

import { styles } from './styles';
import { NavProvider, useNavContext } from './useNavContext';
import { NavMobileProvider, useNavMobileContext } from './useNavMobileContext';

/**
 * Types
 */

export type NetworkObj = {
  id?: string;
  name: string;
  url: string;
};

export type NavProps = {
  network?: NetworkObj;
  account?: string;
  onConnect?: () => void;
  children?: React.ReactNode;
};

export type NavLogoProps = FuelLogoProps;
export type NavMenuProps = HStackProps;
export type NavMenuItemProps = LinkProps & { isActive?: boolean };
export type NavDesktopProps = PropsOf<'nav'>;

export type NavConnectionProps = HStackProps & {
  whenOpened?: 'hide' | 'show' | 'no-effect';
};

export type NavThemeToggleProps = AsChildProp &
  PropsOf<'span'> & { whenOpened?: 'hide' | 'show' | 'no-effect' };

export type NavMobileProps = WithAsProps &
  PropsOf<'nav'> & {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
  };

export type NavMobileContentProps = WithAsProps & BoxProps;

/**
 * NavRoot
 */

const ROOT_CHILD_ITEMS = ['NavDesktop', 'NavMobile'];

export const NavRoot = createComponent<NavProps>({
  id: 'Nav',
  render: (_, { network, account, onConnect, children }) => {
    const newChildren = useStrictedChildren('Nav', ROOT_CHILD_ITEMS, children);
    return (
      <NavProvider value={{ network, account, onConnect }}>
        {newChildren}
      </NavProvider>
    );
  },
});

/**
 * NavDesktop
 */

const DESKTOP_CHILD_ITEMS = [
  'NavLogo',
  'NavMenu',
  'NavSpacer',
  'NavConnection',
  'NavThemeToggle',
];

export const NavDesktop = createComponent<NavDesktopProps, 'nav'>({
  id: 'NavDesktop',
  baseElement: 'nav',
  render: (Root, { className, ...props }) => {
    const classes = styles();
    const { width } = useWindowSize();
    const children = useStrictedChildren(
      'NavDesktop',
      DESKTOP_CHILD_ITEMS,
      props.children,
    );

    if (width < 1024) return null;
    return (
      <section className={classes.navWrapper()}>
        <Root
          {...props}
          className={classes.desktop({ className })}
          style={{ '--nav-height': '70px' } as any}
        >
          {children}
        </Root>
      </section>
    );
  },
});

/**
 * NavMobile
 */

const MOBILE_CHILD_ITEMS = [
  'NavLogo',
  'NavMenu',
  'NavSpacer',
  'NavConnection',
  'NavThemeToggle',
  'NavMobileContent',
];

export const NavMobile = createComponent<NavMobileProps, 'nav'>({
  id: 'NavMobile',
  baseElement: 'nav',
  className: () => styles().mobile(),
  render: (Root, { isOpen, onOpenChange, ...props }) => {
    const { width } = useWindowSize();
    const [open, setOpen] = useState(() => Boolean(isOpen));
    const children = useStrictedChildren(
      'NavMobile',
      MOBILE_CHILD_ITEMS,
      props.children,
    );

    useEffect(() => {
      onOpenChange?.(Boolean(open));
    }, [open]);

    if (width >= 1024) return null;
    return (
      <NavMobileProvider value={{ isOpen: open, onOpenChange: setOpen }}>
        <Root {...props} style={{ '--nav-height': '60px' } as any}>
          {children}
        </Root>
      </NavMobileProvider>
    );
  },
});

export const NavMobileContent = createComponent<
  NavMobileContentProps,
  'header'
>({
  id: 'NavMobileContent',
  baseElement: 'header',
  className: () => styles().mobileContent(),
  render: (Root, { children, ...props }) => {
    const { isOpen, onOpenChange } = useNavMobileContext();

    return (
      <Root {...props} data-open={isOpen}>
        <AnimatePresence initial={false}>
          {Children.toArray(children).map((child: any) => {
            return cloneElement(child, { key: child.type.id });
          })}
        </AnimatePresence>
        <IconButton
          variant="link"
          aria-label="Toggle Menu"
          icon={isOpen ? IconX : IconMenu2}
          iconSize={24}
          onClick={() => onOpenChange((s) => !s)}
          className="ml-2"
        />
      </Root>
    );
  },
});

/**
 * NavSpacer
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export const NavSpacer = createComponent<{}, 'hr'>({
  id: 'NavSpacer',
  baseElement: 'hr',
  className: 'flex-1 opacity-0',
});

/**
 * NavLogo
 */

export const NavLogo = createComponent<NavLogoProps>({
  id: 'NavLogo',
  className: () => styles().logo(),
  render: (_, { size, ...props }) => {
    const { width } = useWindowSize();
    const defaultSize = width < 1024 ? 28 : 32;
    return <FuelLogo {...props} size={size || defaultSize} />;
  },
});

/**
 * NavMenu
 */

export const NavMenu = createComponent<NavMenuProps, 'div'>({
  id: 'NavMenu',
  className: () => styles().menu(),
  render: (Root, props) => {
    const mobileProps = useNavMobileContext();
    const content = <Root {...props} />;

    if (!mobileProps?.onOpenChange) {
      return content;
    }

    return (
      <AnimatePresence>
        {mobileProps.isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                height: 'auto',
                opacity: 1,
                transition: {
                  height: { duration: 0.2, easings: ['easeOut'] },
                  opacity: { delay: 0.2, duration: 0.2, easings: ['easeOut'] },
                },
              },
              collapsed: {
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.2, delay: 0.1, easings: ['easeOut'] },
                  opacity: { duration: 0.2, easings: ['easeOut'] },
                },
              },
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
});

/**
 * NavMenuItem
 */

export const NavMenuItem = createComponent<NavMenuItemProps, typeof Link>({
  id: 'NavMenuItem',
  baseElement: Link,
  className: () => styles().menuItem(),
  render: (Comp, { isActive, ...props }) => {
    return <Comp {...props} data-active={isActive} />;
  },
});

/**
 * NavConnection
 */
const MotionHStack = motion<HStackProps>(HStack);

export const NavConnection = createComponent<NavConnectionProps>({
  id: 'NavConnection',
  className: () => styles().navConnection(),
  render: (_, { whenOpened = 'show', ...props }) => {
    const navProps = useNavContext();
    const mobileProps = useNavMobileContext();
    const hasProps = navProps.network || navProps.account;
    const connectButton = (
      <Button
        radius="full"
        variant="solid"
        leftIcon={IconWallet}
        onClick={navProps.onConnect}
      >
        Connect
      </Button>
    );

    const content = (
      <>
        {navProps.network && (
          <Badge radius="full" size="2" color="gray">
            <Box className="h-2 w-2 rounded-full bg-brand" />
            {navProps.network.name}
          </Badge>
        )}
        {/* {navProps.account && ( */}
        {/*   <AvatarGenerated */}
        {/*     {...props} */}
        {/*     {...classes.avatar} */}
        {/*     hash={navProps.account} */}
        {/*     size="sm" */}
        {/*   /> */}
        {/* )} */}
      </>
    );

    if (!mobileProps?.onOpenChange && !hasProps) {
      return connectButton;
    }
    if (!mobileProps?.onOpenChange || whenOpened === 'no-effect') {
      return <HStack gap="2">{content}</HStack>;
    }

    const animContent = (
      <MotionHStack
        {...(props as any)}
        initial="collapsed"
        animate="open"
        exit="collapsed"
        transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
        variants={{
          open: { opacity: 1, x: '0' },
          collapsed: { opacity: 0, x: 100 },
        }}
      >
        {content}
      </MotionHStack>
    );

    return (
      <>
        {!mobileProps.isOpen && whenOpened === 'hide' && animContent}
        {mobileProps.isOpen && whenOpened === 'show' && animContent}
      </>
    );
  },
});

/**
 * NavThemeToggle
 */

export const NavThemeToggle = createComponent<NavThemeToggleProps, 'span'>({
  id: 'NavThemeToggle',
  baseElement: 'span',
  render: (Root, { className, whenOpened = 'hide', ...props }) => {
    const { theme: current, toggleTheme } = useTheme();
    const mobileProps = useNavMobileContext();
    const classes = styles();
    const content = (
      <Root
        {...props}
        tabIndex={0}
        role="button"
        data-theme={current}
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className={classes.themeToggle({ className })}
      >
        <Icon
          icon={IconSunFilled}
          stroke={1}
          aria-label="Sun"
          size={18}
          color="text-icon"
          className={classes.themeToggleIcon()}
        />
        <Icon
          icon={IconMoonFilled}
          stroke={1}
          aria-label="Moon"
          size={18}
          color="text-icon"
          className={classes.themeToggleIcon()}
        />
      </Root>
    );

    if (!mobileProps?.onOpenChange || whenOpened === 'no-effect') {
      return content;
    }

    const animContent = (
      <motion.div
        initial="collapsed"
        animate="open"
        exit="collapsed"
        transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
        variants={{
          open: { opacity: 1, width: 'auto' },
          collapsed: { opacity: 0, width: 0 },
        }}
      >
        {content}
      </motion.div>
    );

    return (
      <>
        {!mobileProps.isOpen && whenOpened === 'hide' && animContent}
        {mobileProps.isOpen && whenOpened === 'show' && animContent}
      </>
    );
  },
});

/**
 * Nav
 */

export const Nav = withNamespace(NavRoot, {
  Desktop: NavDesktop,
  Mobile: NavMobile,
  Logo: NavLogo,
  Menu: NavMenu,
  MenuItem: NavMenuItem,
  Spacer: NavSpacer,
  Connection: NavConnection,
  ThemeToggle: NavThemeToggle,
  MobileContent: NavMobileContent,
});
