import { AnimatedDialog, Stepper, VStack } from '@fuels/ui';
import clsx from 'clsx';
import type { BN } from 'fuels';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import { StepAllowance } from '~staking/systems/Conversion/components/ConvertDialog/StepAllowance/StepAllowance';
import { StepConvert } from '~staking/systems/Conversion/components/ConvertDialog/StepConvert/StepConvert';
import { useConversionMachine } from '~staking/systems/Conversion/hooks/useConversionMachine';
import { responsiveDialogStyles } from '~staking/systems/Staking/constants/styles/dialogContent';
import { stakingTxDialogStore } from '~staking/systems/Staking/store/stakingTxDialogStore';
type ConvertDialogContentProps = {
  account: Address | undefined;
  token: Address;
  decimals: number;
  balance: BN;
  isContractPaused: boolean;
};

function onClose() {
  stakingTxDialogStore.send({ type: 'close' });
}

export const ConvertDialogContent = ({
  account,
  token,
  decimals,
  balance,
  isContractPaused,
}: ConvertDialogContentProps) => {
  const { t } = useTranslation();
  const { step, data, handlers } = useConversionMachine();
  const responsiveDialogStyle = responsiveDialogStyles();

  return (
    <AnimatedDialog.Content
      open
      aria-describedby="Convert"
      className={clsx(
        responsiveDialogStyle.content({ sizing: 'auto' }),
        'h-[440px] min-h-[440px]',
      )}
    >
      <div className="flex flex-col h-full flex-grow-0 max-h-[100%]">
        <AnimatedDialog.Title>
          {t('staking.upgrade.dialog_title')}
        </AnimatedDialog.Title>

        <VStack pt="3" gap="0" className="flex flex-1 mt-4">
          <Stepper step={step}>
            <Stepper.Item>
              <Stepper.ItemIcon />
              {t('staking.upgrade.step_allowance')}
            </Stepper.Item>
            <Stepper.Item>
              <Stepper.ItemIcon />
              {t('staking.upgrade.step_upgrade')}
            </Stepper.Item>
          </Stepper>

          {step === 1 && (
            <StepAllowance
              account={account}
              token={token}
              decimals={decimals}
              balance={balance}
              isContractPaused={isContractPaused}
              onNext={handlers.goToConvert}
            />
          )}
          {step === 2 && (
            <StepConvert token={token} ctx={data} onClose={onClose} />
          )}
        </VStack>
      </div>
    </AnimatedDialog.Content>
  );
};
