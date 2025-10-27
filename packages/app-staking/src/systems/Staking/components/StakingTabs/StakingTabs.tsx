import { Box, HStack, ToggleGroup } from '@fuels/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { Routes as StakingRoutes } from '../../../../routes';

export const StakingTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = styles();

  // Check if we're on any path under /staking/on-ethereum/
  const isEthereumStaking = location.pathname.includes('/on-ethereum');

  return (
    <ToggleGroup
      defaultValue={
        isEthereumStaking
          ? StakingRoutes.stakingL1()
          : StakingRoutes.stakingRig()
      }
      value={
        isEthereumStaking
          ? StakingRoutes.stakingL1()
          : StakingRoutes.stakingRig()
      }
      className={classes.toggle()}
      size="2"
    >
      <ToggleGroup.Item
        value={StakingRoutes.stakingRig()}
        aria-label="Liquid Staking Tab"
        onClick={() => navigate(StakingRoutes.stakingRig())}
      >
        <HStack className="text-lg">
          <Box className="mt-1">
            <svg
              width="28"
              height="15"
              viewBox="0 0 67 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <g clipPath="url(#clip0_309_5487)">
                <path
                  fill="#FF3C3F"
                  d="M29.795 19.8808C29.795 15.5243 26.2501 11.9795 21.8937 11.9795H3.43323e-05V18.5644H21.8937C22.6184 18.5644 23.2101 19.1561 23.2101 19.8808C23.2101 20.6055 22.6184 21.1973 21.8937 21.1973H0.0651777L17.8439 37H29.4014L19.0301 27.7822H21.8937C26.2501 27.7822 29.795 24.2373 29.795 19.8808ZM31.1114 14.6123V37H40.3292V14.9408L35.8859 19.3841L31.1114 14.6096V14.6123ZM53.9931 18.5617H66.9973V11.9767H53.9931C47.0933 11.9767 41.4828 17.5899 41.4828 24.487C41.4828 31.3841 47.096 36.9972 53.9931 36.9972H66.9973V21.1945H56.0451L57.5271 27.7794H60.4151V30.4123H53.9958C50.7278 30.4123 48.0704 27.755 48.0704 24.487C48.0704 21.219 50.7278 18.5617 53.9958 18.5617H53.9931Z"
                />
                <path
                  fill="var(--primary)"
                  d="M31.2761 2.26593C33.8211 -0.279075 37.9514 -0.279073 40.4964 2.26593C43.0395 4.80901 43.0414 8.94127 40.4964 11.4863L35.8863 16.0964L31.2761 11.4863C28.733 8.93935 28.733 4.80901 31.2761 2.26593Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_309_5487">
                  <rect
                    width="67"
                    height="36.6432"
                    fill="white"
                    transform="translate(0 0.356812)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Box>
          Liquid Stake via The Rig
        </HStack>
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value={StakingRoutes.stakingL1()}
        aria-label="Ethereum Staking Tab"
        onClick={() => navigate(StakingRoutes.stakingL1())}
      >
        <HStack className="text-lg">
          <img
            src="/assets/eth.svg"
            alt="ETH Logo"
            className="w-[28px] h-[28px] shrink-0 rounded-full"
          />
          Stake on Ethereum Network
        </HStack>
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};

const styles = tv({
  slots: {
    tabTrigger: ['flex-1', '[&_.rt-TabsTriggerInner]:w-full'],
    toggle: [
      'w-full rounded-lg h-16',
      'fuel-[ToggleGroupItem]:text-xlg',
      'mb-8',
    ],
    nextLink: 'w-full text-center',
  },
});
