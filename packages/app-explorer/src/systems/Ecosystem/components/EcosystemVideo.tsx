import { useEffect, useRef, useState } from 'react';

const REDUCED = '(prefers-reduced-motion: reduce)';
const SMALL = '(max-width: 767px)';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia?.(query).matches ?? false,
  );
  useEffect(() => {
    const media = window.matchMedia?.(query);
    if (!media) return;
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

type EcosystemVideoProps = {
  src: string;
  poster: string;
  className: string;
  label?: string;
  // The first screen loads the file at once. Below the fold, only metadata.
  eager?: boolean;
};

// A decorative looping video. It plays on desktop and stops while offscreen or
// in a background tab. With reduced motion, and below tablet, it shows the
// poster and loads nothing.
export function EcosystemVideo({
  src,
  poster,
  className,
  label,
  eager,
}: EcosystemVideoProps) {
  const reduced = useMediaQuery(REDUCED);
  const small = useMediaQuery(SMALL);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(
    () => document.visibilityState !== 'hidden',
  );

  const playing = !small && inView && pageVisible;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry?.isIntersecting ?? true),
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const onChange = () =>
      setPageVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.play().catch(() => {});
    else video.pause();
  }, [playing, reduced]);

  if (reduced) {
    return (
      <img
        src={poster}
        alt={label ?? ''}
        aria-hidden={label ? undefined : true}
        className={className}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      loop
      muted
      playsInline
      preload={small ? 'none' : eager ? 'auto' : 'metadata'}
      className={className}
    />
  );
}
