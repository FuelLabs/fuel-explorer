import { RoundedContainer } from '@fuels/ui';

interface LineGraphProps {
  titleProp: string;
  valuesProp: string;
  timeProp: string;
}

export const StatsHeader: React.FC<LineGraphProps> = ({
  titleProp,
  valuesProp,
  timeProp,
}) => {
  return (
    <RoundedContainer className="w-[17rem]">
      <p className="text-heading" style={{ fontSize: '1rem' }}>
        {titleProp}
      </p>
      <h1 className="text-heading -mb-3 -mt-1" style={{ fontSize: '1.5rem' }}>
        {valuesProp}
      </h1>
      <p className="text-heading" style={{ fontSize: '0.9rem' }}>
        {timeProp}
      </p>
    </RoundedContainer>
  );
};
