import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  shortAddress,
  useToast,
} from '@fuels/ui';
import {
  IconCheck,
  IconChevronDown,
  IconCopy,
  IconLogout,
  IconSwitch3,
} from '@fuels/ui';
import { useVerifySelectedChain } from 'app-commons';
import { useModal } from 'connectkit';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';
import { useRiseMotion } from '../../utils/motion';

const COPIED_MS = 1500;

type AccountButtonProps = {
  showConnectButton?: boolean;
};

export function AccountButton({ showConnectButton }: AccountButtonProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { setOpen } = useModal();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const rise = useRiseMotion();

  const { switchChain } = useSwitchChain();
  const { isChainSupported, expectedChainId } = useVerifySelectedChain();

  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const onCopy = async () => {
    await navigator.clipboard.writeText(address ?? '');
    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), COPIED_MS);
    toast({
      title: t('staking.account.copied_toast'),
      variant: 'success',
    });
  };

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {address ? (
        <motion.div key="connected" {...rise}>
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="2"
                variant="ghost"
                color="gray"
                rightIcon={IconChevronDown}
                className="w-full tablet:w-[170px]"
              >
                <img
                  src="https://cdn.fuel.network/assets/eth.svg"
                  alt=""
                  className="w-[1.3rem] h-[1.3rem] shrink-0 rounded-full mobile:max-desktop:w-[1rem] mobile:max-desktop:h-[1rem]"
                />
                {isChainSupported
                  ? shortAddress(address)
                  : t('staking.account.unsupported')}
              </Button>
            </DropdownTrigger>

            <DropdownContent>
              {!isChainSupported && (
                <DropdownItem
                  className="justify-start gap-1 !rounded-none"
                  onClick={() => {
                    switchChain({
                      chainId: expectedChainId,
                    });
                  }}
                >
                  <IconSwitch3 size="1em" />
                  {t('staking.account.switch')}
                </DropdownItem>
              )}
              <DropdownItem
                className="justify-start gap-1 !rounded-none"
                onSelect={(event) => {
                  // The menu stays open so the label can confirm the copy.
                  event.preventDefault();
                  onCopy();
                }}
              >
                {copied ? (
                  <IconCheck size="1em" className="fuel-appear" />
                ) : (
                  <IconCopy size="1em" />
                )}
                {copied
                  ? t('staking.account.copied')
                  : t('staking.account.copy')}
              </DropdownItem>
              <DropdownItem
                className="justify-start gap-1 !rounded-none"
                onClick={() => disconnect()}
              >
                <IconLogout size="1em" />
                {t('staking.account.disconnect')}
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </motion.div>
      ) : showConnectButton ? (
        <motion.div key="disconnected" {...rise}>
          <Button size="2" onClick={() => setOpen(true)} className="w-[190px]">
            {t('staking.connect_ethereum')}
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
