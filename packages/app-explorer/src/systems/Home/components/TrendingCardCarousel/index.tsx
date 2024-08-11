'use client';

import { Button, Carousel, CarouselContent, CarouselItem } from '@fuels/ui';
import { CarouselApi } from '@fuels/ui/src/components/Carousel/Carousel';
import React from 'react';
import { TrendingCard } from '../TrendingCard/TrendingCard';

export const TRENDING_DATA = [
  {
    title: 'Bored Ape',
    icon: 'https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__',
  },
  {
    title: 'Bored Ape',
    icon: 'https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__',
  },
  {
    title: 'Bored Ape',
    icon: 'https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__',
  },
  {
    title: 'Bored Ape',
    icon: 'https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__',
  },
  {
    title: 'Bored Ape',
    icon: 'https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__',
  },
  {
    title: 'Bored Ape',
    icon: 'https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__',
  },
  {
    title: 'Bored Ape',
    icon: 'https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__',
  },
  {
    title: 'Bored Ape',
    icon: 'https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__',
  },
  {
    title: 'Bored Ape',
    icon: 'https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__',
  },
  {
    title: 'Bored Ape',
    icon: 'https://s3-alpha-sig.figma.com/img/5749/3ce7/292d2723de1ca424839b5b023c2aa32a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ErIqnWTWbaxPj5AuflxmF-maSANAvESYDz~GS7U4C8fZwxqzOaBMWZvcMPMloF5b6EeNzRktU6-YsGzlCz31S3Ch9EhGzGCCuqb2U6JNoOMKfsO7i2VTvsGT2ScFn1tTyxVYegQTRIwyhnV7feQW7KU7biO4W0Ahs-Ncvytj0wohz2dNXjrHeYN7Yap5o5aU-No2ct54EaevLGiGFgeDWO9Ysbl1o4AcCAH4Eua9~S3IBV035RSXQNYdSqQjYOsuRcpBKfbbZoZOHw5yWCNEUOqnTjFpXbFC7bGqwPCaaYbSjElFObIpqI83GNbZ0UOEQb-eI9lPJEX-2lOvJFdm3g__',
  },
];

export const TrendingCardCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative">
      {/* Mext button */}
      {current < count && (
        <Button
          className="absolute z-10 top-1/2 -translate-y-1/2 translate-x-1/2 right-0 bg-[#2A2A2A] rounded-full w-8 h-8 p-0"
          onClick={() => api?.scrollNext()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.354 8.35378L6.35403 13.3538C6.30757 13.4002 6.25242 13.4371 6.19173 13.4622C6.13103 13.4874 6.06598 13.5003 6.00028 13.5003C5.93458 13.5003 5.86953 13.4874 5.80883 13.4622C5.74813 13.4371 5.69298 13.4002 5.64653 13.3538C5.60007 13.3073 5.56322 13.2522 5.53808 13.1915C5.51294 13.1308 5.5 13.0657 5.5 13C5.5 12.9343 5.51294 12.8693 5.53808 12.8086C5.56322 12.7479 5.60007 12.6927 5.64653 12.6463L10.2934 8.00003L5.64653 3.35378C5.55271 3.25996 5.5 3.13272 5.5 3.00003C5.5 2.86735 5.55271 2.7401 5.64653 2.64628C5.74035 2.55246 5.8676 2.49976 6.00028 2.49976C6.13296 2.49976 6.26021 2.55246 6.35403 2.64628L11.354 7.64628C11.4005 7.69272 11.4374 7.74786 11.4626 7.80856C11.4877 7.86926 11.5007 7.93433 11.5007 8.00003C11.5007 8.06574 11.4877 8.13081 11.4626 8.1915C11.4374 8.2522 11.4005 8.30735 11.354 8.35378Z"
              fill="white"
            />
          </svg>
        </Button>
      )}
      {/* Previous Button */}
      {current > 1 && (
        <Button
          className="absolute z-10 top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 bg-[#2A2A2A] rounded-full w-8 h-8 p-0"
          onClick={() => api?.scrollPrev()}
        >
          <svg
            className="rotate-180"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.354 8.35378L6.35403 13.3538C6.30757 13.4002 6.25242 13.4371 6.19173 13.4622C6.13103 13.4874 6.06598 13.5003 6.00028 13.5003C5.93458 13.5003 5.86953 13.4874 5.80883 13.4622C5.74813 13.4371 5.69298 13.4002 5.64653 13.3538C5.60007 13.3073 5.56322 13.2522 5.53808 13.1915C5.51294 13.1308 5.5 13.0657 5.5 13C5.5 12.9343 5.51294 12.8693 5.53808 12.8086C5.56322 12.7479 5.60007 12.6927 5.64653 12.6463L10.2934 8.00003L5.64653 3.35378C5.55271 3.25996 5.5 3.13272 5.5 3.00003C5.5 2.86735 5.55271 2.7401 5.64653 2.64628C5.74035 2.55246 5.8676 2.49976 6.00028 2.49976C6.13296 2.49976 6.26021 2.55246 6.35403 2.64628L11.354 7.64628C11.4005 7.69272 11.4374 7.74786 11.4626 7.80856C11.4877 7.86926 11.5007 7.93433 11.5007 8.00003C11.5007 8.06574 11.4877 8.13081 11.4626 8.1915C11.4374 8.2522 11.4005 8.30735 11.354 8.35378Z"
              fill="white"
            />
          </svg>
        </Button>
      )}
      <Carousel
        opts={{
          align: 'start',
        }}
        setApi={setApi}
        className="relative"
      >
        <CarouselContent>
          {TRENDING_DATA.map((item, i) => (
            <CarouselItem
              key={i}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <TrendingCard title={item.title} icon={item.icon} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
