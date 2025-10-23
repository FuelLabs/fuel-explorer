import { Box, Flex, Nav, useBreakpoints } from '@fuels/ui';
import { isRoute } from 'app-commons';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Routes as PortalRoutes } from 'app-commons';
import { ConnectWallet } from 'app-portal';
import { Routes as StakingRoutes } from 'app-staking';
import { NetworkSelector } from '../NetworkSelector/NetworkSelector';
import { SearchWidget } from '../Search/SearchWidget';
import { useTheme } from '../Theme/ThemeProvider';

export function TopNav() {
  // We need two of each variable bc both the mobile and desktop
  // nav elements are in the DOM and respond to click events.
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { isLaptop } = useBreakpoints();
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
  const isEcosystemBridge = isRoute(pathname, [PortalRoutes.ecosystem]);

  const isExplorer = !isBridge && !isEcosystemBridge && !isStake;

  useEffect(() => {
    if (isLaptop && isMobileSearchOpen) {
      setIsDesktopSearchOpen(true);
    } else if (!isLaptop && isDesktopSearchOpen) {
      setIsMobileSearchOpen(true);
    }
  }, [isLaptop, isDesktopSearchOpen, isMobileSearchOpen]);

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
        Explorer
      </Nav.MenuItem>
      <Nav.MenuItem isActive={isBridge} href={PortalRoutes.bridge()}>
        Bridge
      </Nav.MenuItem>
      <Nav.MenuItem isActive={isStake} href={StakingRoutes.stakingL1()}>
        Stake
      </Nav.MenuItem>
      <Nav.MenuItem
        isActive={isEcosystemBridge}
        href={PortalRoutes.ecosystem()}
      >
        Ecosystem
      </Nav.MenuItem>
    </>
  );

  return (
    <Nav>
      <Nav.Desktop className={'px-10 justify-between items-center'}>
        <Nav.Menu className={'items-center'}>
          {logo}
          {tooling}
        </Nav.Menu>
        <Nav.Menu>{!isEcosystemBridge && <SearchWidget />}</Nav.Menu>
        <Nav.Menu className={'items-center laptop:gap-2'}>
          <NetworkSelector />
          <Box className="border-r mr-[-12px] h-[40px] border-gray-3" />
          <ConnectWallet theme={resolvedTheme} setTheme={setTheme} />
        </Nav.Menu>
      </Nav.Desktop>
      <Nav.Mobile>
        <Nav.MobileContent>
          {logo}
          {!isEcosystemBridge && <SearchWidget />}
          <NetworkSelector />
        </Nav.MobileContent>
        <Nav.Menu>
          <Flex className="w-full">
            <Box className="flex-1">{tooling}</Box>
            <ConnectWallet theme={resolvedTheme} setTheme={setTheme} />
          </Flex>
        </Nav.Menu>
      </Nav.Mobile>
    </Nav>
  );
}
