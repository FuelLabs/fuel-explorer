import { Flex, Heading, RoundedContainer, VStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export const LatestBlock = () => {
  const classes = styles();
  return (
    <RoundedContainer className="w-[33.3125rem] dark:linear-gradient(0deg, #191919, #191919), linear-gradient(243.06deg, #00F58C -52.89%, #0F4B32 10.83%, #141414 65.48%)">
      <VStack>
        <Flex className="justify-between">
          <p className={classes.paragraph()}>Latest Block</p>
          <p className={classes.paragraph()}>2s Ago</p>
        </Flex>
        <Heading size="3" className="p-0">
          1,960,152
        </Heading>
        <Flex className="justify-between">
          <p
            className={`${classes.paragraph()} w-[50%] overflow-hidden text-ellipsis whitespace-nowrap`}
          >
            DUND26mEDfFeaPsVof3YvbXDRvpuQX7HMUJrLgEWzYw4ds
          </p>
          <p className={classes.paragraph()}>0.008293100 ETH</p>
        </Flex>
      </VStack>
    </RoundedContainer>
  );
};

const styles = tv({
  slots: {
    title: ['text-[16px]'],
    subtitle: ['justify-center'],
    paragraph: ['text-muted text-[14px] p-0 text-ellipsis'],
    paragraphStrong: ['text-[14px] p-0'],
    searchWrapper: 'max-w-[400px]',
  },
});
