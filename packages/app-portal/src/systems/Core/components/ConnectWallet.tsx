import { Button, Dropdown, shortAddress, useToast } from '@fuels/ui';
import {
  IconChevronDown,
  IconCopy,
  IconHistory,
  IconLogout,
  IconSwitch3,
  IconUserCircle,
} from '@fuels/ui';

import { useAccount, useConnectUI, useDisconnect } from '@fuels/react';
import { Routes } from 'app-commons';
import { useVerifySelectedChain } from 'app-commons';
import { useTranslation } from 'react-i18next';
import { useSwitchChain } from 'wagmi';

const ITEM = 'cursor-pointer justify-start gap-2 px-4';

export const ConnectWallet = () => {
  const { t } = useTranslation();
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
      title: t('portal.wallet.address_copied'),
      variant: 'success',
    });
  };

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  if (isConnected && account) {
    return (
      <div key="dropdown" className="fuel-appear">
        <Dropdown>
          <Dropdown.Trigger>
            {/* Same height as the language and network controls beside it. */}
            <button
              type="button"
              className="fuel-edge fuel-hover-fill fuel-label m-0 flex h-10 min-w-[165px] cursor-pointer items-center justify-between gap-2 border border-[var(--fuel-line)] bg-transparent px-4 text-[var(--fuel-element-high-em)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--fuel-focus)]"
            >
              <span className="font-mono normal-case">
                {shortAddress(account)}
              </span>
              <IconChevronDown size={14} className="shrink-0 opacity-60" />
            </button>
          </Dropdown.Trigger>

          <Dropdown.Content align="end" className="w-[200px]">
            {!isChainSupported && (
              <Dropdown.Item
                className={ITEM}
                onClick={() => {
                  switchChain({
                    chainId: expectedChainId,
                  });
                }}
              >
                <IconSwitch3 size="1em" />
                {t('portal.wallet.switch_network')}
              </Dropdown.Item>
            )}
            <Dropdown.Item
              className={ITEM}
              onClick={() => handleNavigate(Routes.account(account, 'assets'))}
            >
              <IconUserCircle size="1em" />
              {t('portal.wallet.my_account')}
            </Dropdown.Item>
            <Dropdown.Item className={ITEM} onClick={onCopy}>
              <IconCopy size="1em" />
              {t('portal.wallet.copy_address')}
            </Dropdown.Item>
            <Dropdown.Item
              className={ITEM}
              onClick={() => handleNavigate(Routes.bridgeHistory())}
            >
              <IconHistory size="1em" />
              {t('portal.wallet.bridge_history')}
            </Dropdown.Item>
            <Dropdown.Item
              className={`${ITEM} fuel-danger-item`}
              onClick={handleDisconnect}
            >
              <IconLogout size="1em" />
              {t('portal.wallet.disconnect')}
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>
    );
  }

  return (
    <div key="button" className="fuel-appear">
      {/*
       * TODO: Add isLoading back to the button.
       *
       * The button component creates a weird behavior where the Modal opened by the connectors
       * is not open when the button transitions between loading states.
       */}
      <Button
        onClick={connect}
        className="fuel-hit relative tablet:h-[40px] tablet:max-w-[165px] tablet:min-w-[140px] laptop:w-[165px]"
        size={{
          initial: '1',
          lg: '2',
        }}
      >
        {t('portal.wallet.connect')}
      </Button>
    </div>
  );
};
