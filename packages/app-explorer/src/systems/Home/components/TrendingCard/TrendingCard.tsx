import { HStack, RoundedContainer } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export const TrendingCard = () => {
  const classes = styles();
  return (
    <RoundedContainer className="w-[19.15625rem]">
      <HStack>
        <img
          className="h-[24px] w-[24px]"
          src="https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__"
          alt=""
        />
        <p className={classes.paragraphStrong()}>Bored Ape</p>
      </HStack>
    </RoundedContainer>
  );
};

const styles = tv({
  slots: {
    paragraphStrong: ['text-[14px] px-2'],
  },
});
