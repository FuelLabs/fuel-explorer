import { Box, Flex, HStack, Nav, useBreakpoints } from '@fuels/ui';
import { isRoute } from 'app-commons';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Routes as PortalRoutes } from 'app-commons';
import { ConnectWallet } from 'app-portal';
import { Routes as StakingRoutes } from 'app-staking';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
import { NetworkSelector } from '../NetworkSelector/NetworkSelector';
import { SearchWidget } from '../Search/SearchWidget';
import { useTheme } from '../Theme/ThemeProvider';

export function TopNav() {
  // We need two of each variable bc both the mobile and desktop
  // nav elements are in the DOM and respond to click events.
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { isLaptop } = useBreakpoints();
  const { t } = useTranslation();
  const location = useLocation();
  const { setTheme, resolvedTheme } = useTheme();

  const pathname = location.pathname;
  const isStake = isRoute(pathname, [
    StakingRoutes.home,
    StakingRoutes.stakingRig,
    StakingRoutes.stakingL1,
    StakingRoutes.stakingL1CurrentPositions,
    StakingRoutes.stakingL1Validators,
    StakingRoutes.stakingL1Transactions,
    StakingRoutes.conversion,
  ]);

  const isBridge = isRoute(pathname, [
    PortalRoutes.bridge,
    PortalRoutes.bridgeHistory,
  ]);
  const isEcosystemBridge =
    isRoute(pathname, [PortalRoutes.ecosystem]) ||
    pathname.startsWith(`${PortalRoutes.ecosystem.pathname}/`);

  const isExplorer = !isBridge && !isEcosystemBridge && !isStake;

  useEffect(() => {
    if (isLaptop && isMobileSearchOpen) {
      setIsDesktopSearchOpen(true);
    } else if (!isLaptop && isDesktopSearchOpen) {
      setIsMobileSearchOpen(true);
    }
  }, [isLaptop, isDesktopSearchOpen, isMobileSearchOpen]);

  const themeToggle = (
    <Nav.ThemeToggle
      whenOpened="no-effect"
      theme={resolvedTheme}
      onToggle={setTheme}
    />
  );

  const logo = (
    <Link to="/" className="flex items-center">
      <Nav.Logo />
    </Link>
  );

  const tooling = (
    <>
      <Nav.MenuItem
        isActive={isExplorer}
        href="/"
        className="flex items-center"
      >
        {t('nav.explorer')}
      </Nav.MenuItem>
      <Nav.MenuItem isActive={isBridge} href={PortalRoutes.bridge()}>
        {t('nav.bridge')}
      </Nav.MenuItem>
      <Nav.MenuItem isActive={isStake} href={StakingRoutes.stakingL1()}>
        {t('nav.stake')}
      </Nav.MenuItem>
      <Nav.MenuItem
        isActive={isEcosystemBridge}
        href={PortalRoutes.ecosystem()}
      >
        {t('nav.ecosystem')}
      </Nav.MenuItem>
    </>
  );

  return (
    <Nav>
      <Nav.Desktop className={'md:px-6 lg:px-10 justify-between items-center'}>
        <Nav.Menu className={'items-center md:max-lg:gap-3'}>
          {logo}
          {tooling}
        </Nav.Menu>
        <Nav.Menu>{!isEcosystemBridge && <SearchWidget />}</Nav.Menu>
        <Nav.Menu className={'items-center laptop:gap-2'}>
          <LanguageSelect />
          <NetworkSelector />
          {themeToggle}
          <ConnectWallet />
        </Nav.Menu>
      </Nav.Desktop>
      <Nav.Mobile>
        <Nav.MobileContent>
          {logo}
          {!isEcosystemBridge && <SearchWidget />}
        </Nav.MobileContent>
        <Nav.Menu className="bg-[var(--fuel-background)]">
          <div className="flex w-full flex-col gap-4">
            <Flex className="w-full">
              <Box className="flex-1">{tooling}</Box>
              <ConnectWallet />
            </Flex>
            <HStack
              gap="2"
              align="center"
              className="border-t border-border pt-4"
            >
              <LanguageSelect />
              <NetworkSelector />
              {themeToggle}
            </HStack>
          </div>
        </Nav.Menu>
      </Nav.Mobile>
    </Nav>
  );
}
