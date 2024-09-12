import { Flex, HStack, RoundedContainer } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export const TableTile = () => {
  const classes = styles();

  return (
    <RoundedContainer className="bg-white hover:bg-gray-1">
      <Flex className="justify-between items-start">
        <div className="space-y-[6px]">
          <p className={classes.paragraphStrong()}>#4540916</p>
          <p className={classes.paragraph()}>0.004878700 ETH</p>
        </div>
        <div className="flex items-center gap-[4px]">
          <img
            className="w-[16px] h-[16px] rounded-full overflow-hidden"
            src="https://s3-alpha-sig.figma.com/img/404f/e544/a721b4897fea63c5007fea0819a062e4?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HQ4U-6SV-6Neqns-0oAsAQiV26pnff609Srfd-PFdNQJvjOH7t7CfkNNoA90jzSdyELyRALWQfQAf5yrQAdKzz-yLKDg1A5Y7VpRN5ZRnR6~eHBGovRzDEdLtiHSRRY04fTUR~DN6RAXpPZBwnporoqKgk3ntoYvskkkEl56Hn1WUYhnfM3OtgqaZu327f39qdvO3VZudMUpVLxOWVk92ky4USKXEmu1AA9Y1luOexzTNyqQdabjaLQbr5zF-hPZtQV-pKHIKBCewNvhGiMp8hVU~XXnCcJvMvI9AaI~fZnq~6frNAAQEN9c22usX3kIwmTy9qoOXqzqFcOxoW4PGQ__"
            alt=""
          />
          <p className={classes.paragraph()}>fuel1a...3zxt</p>
        </div>

        <div className="space-y-[6px]">
          <HStack gap="4px" className="items-center">
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
        </div>
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
