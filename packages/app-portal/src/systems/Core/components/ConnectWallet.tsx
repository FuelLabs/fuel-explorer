import {
  Box,
  Button,
  type Colors,
  Dropdown,
  HStack,
  Nav,
  Text,
  shortAddress,
  useToast,
} from '@fuels/ui';
import {
  IconCopy,
  IconHistory,
  IconLogout,
  IconSettingsFilled,
  IconSwitch3,
  IconUserCircle,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

import { useAccount, useConnectUI, useDisconnect } from '@fuels/react';
import { Routes } from 'app-commons';
import { useVerifySelectedChain } from 'app-commons';
import { useSwitchChain } from 'wagmi';

interface ConnectWalletProps {
  theme?: string;
  setTheme?: (theme: string) => void;
}

export const ConnectWallet = ({ theme, setTheme }: ConnectWalletProps = {}) => {
  const { toast } = useToast();
  const { connect, isConnected } = useConnectUI();

  const { account } = useAccount();
  const { disconnect } = useDisconnect();

  const { switchChain } = useSwitchChain();
  const { isChainSupported, expectedChainId } = useVerifySelectedChain();

  const handleDisconnect = () => {
    disconnect();
  };

  const onCopy = async () => {
    await navigator.clipboard.writeText(account ?? '');
    toast({
      title: 'Address has been copied to clipboard',
      variant: 'success',
    });
  };

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  const _handleThemeToggle = (nextTheme: string) => {
    // Nav.ThemeToggle passes the next theme as parameter
    setTheme?.(nextTheme);
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      {isConnected && account ? (
        <motion.div
          key="dropdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dropdown>
            <Dropdown.Trigger className="bg-transparent hover:bg-[var(--accent-a4)]">
              <Button
                color="gray"
                variant="soft"
                size={{
                  initial: '1',
                  lg: '2',
                }}
                className="text-[var(--accent-a11)] h-[40px] max-w-[165px] w-full pl-[20px]"
                iconColor={'text-[var(--accent-a11)]' as Colors}
                rightIcon={IconSettingsFilled}
                rightIconClassName="ml-[8px] w-[26px] h-[26px] opacity-50"
              >
                {shortAddress(account)}
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Content color="gray" className="w-[180px]">
              {!isChainSupported && (
                <Dropdown.Item
                  className="gap-2 px-[16px] justify-start hover:backdrop-blur-[5px] hover:bg-white/[.04] hover:text-black dark:hover:text-[inherit] h-[30px] cursor-pointer"
                  onClick={() => {
                    switchChain({
                      chainId: expectedChainId,
                    });
                  }}
                >
                  <IconSwitch3 size="1em" />
                  Switch Network
                </Dropdown.Item>
              )}
              {account && (
                <>
                  <Dropdown.Item
                    className="gap-1 px-[16px] justify-start hover:backdrop-blur-[5px] hover:bg-white/[.04] hover:text-black dark:hover:text-[inherit] h-[30px] cursor-pointer"
                    onClick={() =>
                      handleNavigate(Routes.account(account, 'assets'))
                    }
                  >
                    <IconUserCircle size="1em" />
                    My Account
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="gap-2 px-[16px] justify-start hover:backdrop-blur-[5px] hover:bg-white/[.04] hover:text-black dark:hover:text-[inherit] h-[30px] cursor-pointer"
                    onClick={onCopy}
                  >
                    <IconCopy size="1em" />
                    Copy address
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="gap-2 px-[16px] justify-start hover:backdrop-blur-[5px] hover:bg-white/[.04] hover:text-black dark:hover:text-[inherit] h-[30px] cursor-pointer"
                    onClick={() => handleNavigate(Routes.bridgeHistory())}
                  >
                    <IconHistory size="1em" />
                    Bridge History
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Item
                className="gap-2 px-[16px] justify-start hover:backdrop-blur-[5px] hover:bg-white/[.04] hover:text-black dark:hover:text-[inherit] h-[30px] cursor-pointer"
                color="red"
                onClick={handleDisconnect}
              >
                <IconLogout size="1em" />
                Disconnect
              </Dropdown.Item>
              <Dropdown.Item
                className="flex flex-col hover:bg-transparent px-0 h-[50px] mt-2"
                onSelect={(e) => e.preventDefault()}
              >
                <Box className="border-t w-full border-gray-3 " />
                <HStack className="justify-center items-normal pl-[13px]">
                  <Text
                    size="2"
                    className="text-[var(--accent-a11)] flex items-center"
                  >
                    Settings
                  </Text>
                  <Nav.ThemeToggle
                    whenOpened="no-effect"
                    theme={theme}
                    onToggle={_handleThemeToggle}
                    className="ml-auto border border-gray-3 scale-75 bg-gray-2 translate-x-[11px]"
                  />
                </HStack>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </motion.div>
      ) : (
        <motion.div
          key="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/*
           * TODO: Add isLoading back to the button.
           *
           * The button component creates a weird behavior where the Modal opened by the connectors
           * is not open when the button transitions between loading states.
           */}
          <Button
            // isLoading={loading}
            // loadingText={isConnecting ? 'Connecting...' : 'Loading...'}
            variant="solid"
            color={'brand' as any}
            onClick={connect}
            className="tablet:h-[40px] tablet:max-w-[165px] tablet:min-w-[140px] laptop:w-[165px]"
            size={{
              initial: '1',
              lg: '2',
            }}
          >
            Connect Wallet
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
