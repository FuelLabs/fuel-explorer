import { HStack, RoundedContainer, VStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { fromNow } from '~/systems/Core/utils/dayjs';
import { Block } from '../interface/blocks.interface';

interface BlockTableProps {
  block: Block;
}

export const BlockTableTile: React.FC<BlockTableProps> = ({ block }) => {
  const classes = styles();

  return (
    <RoundedContainer className="bg-white hover:bg-gray-5 py-3">
      <HStack align={'center'} className="justify-between">
        <div className="space-y-[4px]">
          <p className={classes.paragraphStrong()}>#{block.blockNo}</p>
          <p className={classes.paragraph()}>{+block.gasUsed / 10 ** 9} ETH</p>
        </div>
        <div className="flex items-center gap-[4px] overflow-hidden">
          <p
            className={`${classes.paragraph()} overflow-hidden text-ellipsis whitespace-nowrap w-[100px]`}
          >
            {block.producer}
          </p>
        </div>

        <div className="space-y-[4px]">
          <VStack gap={'0'}>
            <HStack gap={'1'} className="items-center">
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
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className={classes.paragraphAccent()}>Settled</p>
            </HStack>
            <p
              className={`${classes.paragraph()} overflow-hidden text-ellipsis whitespace-nowrap`}
            >
              {fromNow(block.timeStamp)}
            </p>
          </VStack>
        </div>
      </HStack>
    </RoundedContainer>
  );
};

const styles = tv({
  slots: {
    paragraphStrong: [
      'text-[12px]',
      'text-[color:var(--gray-12)]',
      'font-bold',
      ' w-[110px]',
    ],
    paragraph: [
      'text-muted',
      'text-[12px]',
      'p-0',
      'whitespace-nowrap',
      'text-ellipsis',
    ],
    paragraphAccent: ['text-accent text-[12px] p-0'],
  },
});
