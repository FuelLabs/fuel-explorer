import { Card, LoadingBox } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export const ProjectItemLoader = () => {
  const classes = styles();

  return (
    <Card className={classes.loaderWrapper()}>
      <LoadingBox className={classes.loaderPicture()} />
      <LoadingBox className={classes.loaderTitle()} />
      <LoadingBox className={classes.loaderPicture()} />
      <LoadingBox className={classes.loaderSubtitleRow1()} />
      <LoadingBox className={classes.loaderSubtitleRow2()} />
      <LoadingBox className={classes.loaderSubtitleRow3()} />
      <LoadingBox className={classes.loaderSubtitleRow4()} />
    </Card>
  );
};

const styles = tv({
  slots: {
    loaderWrapper: 'w-full max-w-[496px] h-[148px] relative',
    loaderPicture: 'w-[40px] h-[40px] absolute top-[20px] left-[20px]',
    loaderTitle: 'w-[120px] h-[20px] absolute top-[20px] left-[80px]',
    loaderSubtitleRow1:
      'w-[calc(100%-100px)] h-[12px] absolute top-[50px] left-[80px]',
    loaderSubtitleRow2:
      'w-[calc(100%-100px)]  h-[12px] absolute top-[70px] left-[80px]',
    loaderSubtitleRow3: 'w-[80px] h-[12px] absolute top-[110px] left-[80px]',
    loaderSubtitleRow4: 'w-[100px] h-[12px] absolute top-[110px] right-[20px]',
  },
});
