import { HStack, RoundedContainer } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export const ViewAllButton = () => {
  const classes = styles();
  return (
    <RoundedContainer className="bg-card-border dark:bg-card-border p-1">
      <HStack className="items-center justify-center">
        <p className={classes.paragraphStrong()}>View All</p>
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
      </HStack>
    </RoundedContainer>
  );
};

const styles = tv({
  slots: {
    paragraphStrong: ['text-[14px] p-0'],
  },
});
