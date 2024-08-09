import { Flex, HStack, RoundedContainer, VStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export const TableTile = () => {
  const classes = styles();

  return (
    <RoundedContainer className="w-[30.8125rem] ">
      <Flex className="justify-between">
        <VStack>
          <p className={classes.paragraphStrong()}>#4540916</p>
          <p className={classes.paragraph()}>0.004878700 ETH</p>
        </VStack>
        <p className={classes.paragraph()}>fuel1a...3zxt</p>

        <VStack>
          <HStack className="items-center">
            <svg
              width="11"
              height="8"
              viewBox="0 0 11 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.875 4.25L3.5 6.875L9.5 0.875"
                stroke="#00F58C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className={classes.paragraphAccent()}>Settled</p>
          </HStack>
          <p className={classes.paragraph()}>1 Hour Ago</p>
        </VStack>
      </Flex>
    </RoundedContainer>
  );
};

const styles = tv({
  slots: {
    paragraphStrong: ['text-[14px]'],
    paragraph: ['text-muted text-[14px] p-0'],
    paragraphAccent: ['text-accent text-[14px] p-0'],
  },
});
