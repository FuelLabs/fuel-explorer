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
  IconChevronDown,
  IconCopy,
  IconLogout,
  IconSwitch3,
} from '@tabler/icons-react';
import { useVerifySelectedChain } from 'app-commons';
import { useModal } from 'connectkit';
import { AnimatePresence, type Variants, motion } from 'framer-motion';
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';

const animations: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    height: 'initial',
    transition: {
      duration: 0.3,
    },
  },
};

type AccountButtonProps = {
  showConnectButton?: boolean;
};

export function AccountButton({ showConnectButton }: AccountButtonProps) {
  const { toast } = useToast();
  const { setOpen } = useModal();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { switchChain } = useSwitchChain();
  const { isChainSupported, expectedChainId } = useVerifySelectedChain();

  const onCopy = async () => {
    await navigator.clipboard.writeText(address ?? '');
    toast({
      title: 'Address has been copied to clipboard',
      variant: 'success',
    });
  };

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {address ? (
        <motion.div
          key="connected"
          variants={animations}
          initial="closed"
          animate="open"
          exit="closed"
          className="overflow-hidden"
        >
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="2"
                variant="outline"
                color="gray"
                rightIcon={IconChevronDown}
                className="w-full tablet:w-[170px]"
              >
                <img
                  src="https://cdn.fuel.network/assets/eth.svg"
                  alt="ETH Logo"
                  className="w-[1.3rem] h-[1.3rem] shrink-0 rounded-full mobile:max-desktop:w-[1rem] mobile:max-desktop:h-[1rem]"
                />
                {isChainSupported
                  ? shortAddress(address)
                  : 'Unsupported network'}
              </Button>
            </DropdownTrigger>

            <DropdownContent>
              {!isChainSupported && (
                <DropdownItem
                  className="gap-1 justify-start rounded-lg"
                  onClick={() => {
                    switchChain({
                      chainId: expectedChainId,
                    });
                  }}
                >
                  <IconSwitch3 size="1em" />
                  Switch network
                </DropdownItem>
              )}
              <DropdownItem
                className="gap-1 justify-start rounded-lg"
                onClick={onCopy}
              >
                <IconCopy size="1em" />
                Copy address
              </DropdownItem>
              <DropdownItem
                className="gap-1 justify-start rounded-lg"
                color="red"
                onClick={() => disconnect()}
              >
                <IconLogout size="1em" />
                Disconnect
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </motion.div>
      ) : showConnectButton ? (
        <motion.div
          key="disconnected"
          variants={animations}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <Button
            size="2"
            color="green"
            onClick={() => setOpen(true)}
            className="w-[190px]"
          >
            Connect Ethereum Wallet
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
