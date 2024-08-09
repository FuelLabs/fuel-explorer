import { RoundedContainer } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export interface TrendingCardProps {
  title: string;
  icon: string;
}

export const TrendingCard = ({ icon, title }: TrendingCardProps) => {
  const classes = styles();
  return (
    <RoundedContainer className="px-4 py-3 w-full">
      <div className="flex items-center gap-2">
        <img
          width={24}
          height={24}
          className="h-[24px] w-[24px]"
          src={icon}
          alt={title}
        />
        <p className={classes.paragraphStrong()}>{title}</p>
      </div>
    </RoundedContainer>
  );
};

const styles = tv({
  slots: {
    paragraphStrong: ['text-sm px-2 whitespace-nowrap'],
  },
});
