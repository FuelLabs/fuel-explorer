export interface TokenLogoProps {
  src: string;
  size?: number;
  alt?: string;
}

export function TokenLogo({ src, size = 24, alt = 'Token' }: TokenLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full flex-shrink-0"
      style={{ width: size, height: size }}
    />
  );
}
