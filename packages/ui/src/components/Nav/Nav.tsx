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

import { useStrictedChildren } from '../../hooks/useStrictedChildren';
import { createComponent, withNamespace } from '../../utils/component';
import { cx } from '../../utils/css';
import {
  type AsChildProp,
  BaseProps,
  type PropsOf,
  type WithAsProps,
} from '../../utils/types';
import { Badge } from '../Badge/Badge';
import { Box, HStack } from '../Box';
import type { BoxProps, HStackProps } from '../Box';
import { Button } from '../Button/Button';
import { FuelLogo } from '../FuelLogo/FuelLogo';
import type { FuelLogoProps } from '../FuelLogo/FuelLogo';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton';
import type { LinkProps } from '../Link/Link';
import { Link } from '../Link/Link';
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
  PropsOf<'span'> & {
    whenOpened?: 'hide' | 'show' | 'no-effect';
    theme?: 'dark' | 'light' | string;
    onToggle?: (theme: string) => void;
  };

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

export const NavRoot = createComponent<NavProps, typeof NavProvider>({
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

export const NavDesktop = createComponent<NavDesktopProps, 'nav'>({
  id: 'NavDesktop',
  baseElement: 'nav',
  render: (Root, { className, children, ...props }) => {
    const classes = styles();

    return (
      <section className={classes.desktopWrapper()}>
        <Root
          {...props}
          style={{ '--nav-height': '70px' } as React.CSSProperties}
          className={cx(classes.desktop({ className }))}
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

export const NavMobile = createComponent<NavMobileProps, 'nav'>({
  id: 'NavMobile',
  baseElement: 'nav',
  className: ({ className }) => styles().mobile({ className }),
  render: (Root, { isOpen, onOpenChange, children, className, ...props }) => {
    const [open, setOpen] = useState(() => Boolean(isOpen));
    const classes = styles();

    useEffect(() => {
      onOpenChange?.(Boolean(open));
    }, [open]);

    return (
      <NavMobileProvider value={{ isOpen: open, onOpenChange: setOpen }}>
        <Root
          {...props}
          style={{ '--nav-height': '60px' } as React.CSSProperties}
          className={cx(classes.mobileWrapper({ className }))}
        >
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
  className: ({ className }) => styles().mobileContent({ className }),
  render: (Root, { children, ...props }) => {
    const { isOpen, onOpenChange } = useNavMobileContext();

    return (
      <Root {...props} data-open={isOpen}>
        <AnimatePresence initial={false}>
          <HStack gap="2" className="flex-1 justify-between items-center">
            {Children.toArray(children).map((child: any) => {
              return cloneElement(child, { key: child.type.id });
            })}
          </HStack>
        </AnimatePresence>
        <IconButton
          aria-label="Toggle Menu"
          className="ml-2"
          icon={isOpen ? IconX : IconMenu2}
          iconSize={24}
          variant="link"
          onClick={() => onOpenChange((s) => !s)}
        />
      </Root>
    );
  },
});

/**
 * NavSpacer
 */
export const NavSpacer = createComponent<BaseProps<{}>, 'hr'>({
  id: 'NavSpacer',
  baseElement: 'hr',
  className: ({ className }) => styles().spacer({ className }),
});

/**
 * NavLogo
 */

export const NavLogo = createComponent<NavLogoProps, typeof FuelLogo>({
  id: 'NavLogo',
  className: ({ className }) => styles().logo({ className }),
  render: (_, { size, ...props }) => {
    const { width } = useWindowSize();
    const defaultSize = width < 960 ? 28 : 32;
    return <FuelLogo {...props} size={size || defaultSize} />;
  },
});

/**
 * NavMenu
 */

export const NavMenu = createComponent<NavMenuProps, 'div'>({
  id: 'NavMenu',
  className: ({ className }) => styles().menu({ className }),
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
            animate="open"
            exit="collapsed"
            initial="collapsed"
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
  className: ({ className }) => styles().menuItem({ className }),
  defaultProps: {
    color: 'gray',
  },
  render: (Comp, { isActive, ...props }) => {
    return <Comp {...props} data-active={isActive} />;
  },
});

/**
 * NavConnection
 */
const MotionHStack = motion<HStackProps>(HStack);

export const NavConnection = createComponent<NavConnectionProps, typeof Button>(
  {
    id: 'NavConnection',
    className: ({ className }) => styles().navConnection({ className }),
    render: (_, { whenOpened = 'show', ...props }) => {
      const navProps = useNavContext();
      const mobileProps = useNavMobileContext();
      const hasProps = navProps.network || navProps.account;
      const connectButton = (
        <Button
          leftIcon={IconWallet}
          radius="full"
          variant="solid"
          onClick={navProps.onConnect}
        >
          Connect
        </Button>
      );

      const content = (
        <>
          {navProps.network && (
            <Badge color="gray" radius="full" size="2">
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
          animate="open"
          exit="collapsed"
          initial="collapsed"
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
  },
);

/**
 * NavThemeToggle
 */

export const NavThemeToggle = createComponent<NavThemeToggleProps, 'span'>({
  id: 'NavThemeToggle',
  baseElement: 'span',
  render: (
    Root,
    { className, theme, whenOpened = 'hide', onToggle, ...props },
  ) => {
    const mobileProps = useNavMobileContext();
    const classes = styles();

    function handleToggle() {
      const next = theme === 'light' ? 'dark' : 'light';
      onToggle?.(next);
    }

    const content = (
      <Root
        {...props}
        aria-label="Toggle Theme"
        className={classes.themeToggle({ className })}
        role="button"
        tabIndex={0}
        onClick={handleToggle}
      >
        <Icon
          aria-label="Sun"
          className={classes.themeToggleIcon()}
          color="text-icon"
          icon={IconSunFilled}
          size={18}
          stroke={1}
        />
        <Icon
          aria-label="Moon"
          className={classes.themeToggleIcon()}
          color="text-icon"
          icon={IconMoonFilled}
          size={18}
          stroke={1}
        />
      </Root>
    );

    if (!mobileProps?.onOpenChange || whenOpened === 'no-effect') {
      return content;
    }

    const animContent = (
      <motion.div
        animate="open"
        exit="collapsed"
        initial="collapsed"
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
