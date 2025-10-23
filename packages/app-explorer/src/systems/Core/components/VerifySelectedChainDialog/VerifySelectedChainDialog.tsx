import { AnimatedDialog, Button, Separator, Text, VStack } from '@fuels/ui';
import { useExpectedChainName, useVerifySelectedChain } from 'app-commons';
import clsx from 'clsx';

import { useEffect, useState } from 'react';
import { responsiveDialogStyles } from '~staking/systems/Staking/constants/styles/dialogContent';

export function VerifySelectedChainDialog() {
  const { isChainSupported, validateChain } = useVerifySelectedChain();
  const [isLoading, setIsLoading] = useState(false);
  const responsiveDialogStyle = responsiveDialogStyles();
  const expectedChainName = useExpectedChainName();

  useEffect(() => {
    setIsLoading(false);
  }, [isChainSupported]);

  return (
    <AnimatedDialog>
      <AnimatedDialog.Content
        open={!isChainSupported}
        className={clsx(
          responsiveDialogStyle.content({ sizing: 'auto' }),
          'max-w-[440px]',
        )}
        hideClose
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <AnimatedDialog.Title>Network Switch Required</AnimatedDialog.Title>
          </div>
          <Text className="mt-10 mb-4 text-gray-11">
            It looks like you're connected to a wrong network.
            <br /> To ensure the app works correctly, please switch to{' '}
            {expectedChainName || 'our network'} network.
          </Text>
          <div>
            <Separator size="4" className="mb-4 mt-4" />
            <VStack>
              <Button
                variant={'solid'}
                color={'green'}
                className="w-full"
                onClick={() => {
                  setIsLoading(true);
                  validateChain();
                }}
                isLoading={isLoading}
              >
                Switch{' '}
                {expectedChainName ? `to ${expectedChainName}` : 'Networks'}
              </Button>
            </VStack>
          </div>
        </div>
      </AnimatedDialog.Content>
    </AnimatedDialog>
  );
}
