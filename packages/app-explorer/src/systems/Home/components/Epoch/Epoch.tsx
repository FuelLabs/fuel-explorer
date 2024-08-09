import {
  Flex,
  Heading,
  ProgressBar,
  RoundedContainer,
  VStack,
} from '@fuels/ui';
import { tv } from 'tailwind-variants';

const Epoch = () => {
  const classes = styles();
  return (
    <RoundedContainer className="h-[18.375rem] w-[18.6875rem] ">
      <VStack>
        <Heading size="7" className={classes.title()}>
          Current EPOCH
        </Heading>
        <Flex className="justify-between items-center">
          <Heading size="3" className="p-0">
            649
          </Heading>
          <p className={classes.paragraph()}>55%</p>
        </Flex>
        <ProgressBar />
        <RoundedContainer className="bg-gray-3 dark:bg-gray-3">
          <VStack className="gap-1">
            <p className={classes.paragraph()}>Slot Range</p>
            <Flex className="gap-1">
              <p className={classes.paragraphStrong()}>280368000</p>
              <p className={classes.paragraph()}>to</p>
              <p className={classes.paragraphStrong()}>280368000</p>
            </Flex>
            <p className="rounded w-[100%] h-[0.5px] my-2 bg-card-border" />
            <p className={classes.paragraph()}>Time Remain</p>
            <p className={classes.paragraphStrong()}>0d 15h 32m 30s</p>
          </VStack>
        </RoundedContainer>
      </VStack>
    </RoundedContainer>
  );
};

const styles = tv({
  slots: {
    title: ['text-[16px]'],
    subtitle: ['justify-center'],
    paragraph: ['text-muted text-[14px] p-0'],
    paragraphStrong: ['text-[14px] p-0'],
    searchWrapper: 'max-w-[400px]',
  },
});
export default Epoch;
