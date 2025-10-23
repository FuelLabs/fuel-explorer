import { useMemo } from 'react';

type BlockieAvatarProps = {
  address: string;
  size?: number;
};

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const hexString = Math.abs(hash).toString(16).padStart(8, '0');
  return hexString.repeat(4);
}

export function BlockieAvatar({ address, size = 40 }: BlockieAvatarProps) {
  const svgProps = useMemo(() => {
    if (!address) return null;
    const hash = hashString(address);

    // Primary color
    const hue = Number.parseInt(hash.slice(0, 2), 16) % 360;
    const saturation = 60 + (Number.parseInt(hash.slice(2, 4), 16) % 40);
    const lightness = 45 + (Number.parseInt(hash.slice(4, 6), 16) % 20);

    // Secondary color (for accessories)
    const secondaryHue = (hue + 180) % 360;
    const secondarySat = 50 + (Number.parseInt(hash.slice(6, 8), 16) % 50);
    const secondaryLight = 40 + (Number.parseInt(hash.slice(8, 10), 16) % 20);

    // Features
    const eyeType = Number.parseInt(hash.slice(10, 12), 16) % 5;
    const eyeSize = 2 + (Number.parseInt(hash.slice(12, 14), 16) % 3);
    const mouthType = Number.parseInt(hash.slice(14, 16), 16) % 6;
    const accessoryType = Number.parseInt(hash.slice(16, 18), 16) % 5;
    const patternType = Number.parseInt(hash.slice(18, 20), 16) % 4;
    const rotation = (Number.parseInt(hash.slice(20, 22), 16) % 30) - 15;

    return {
      backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      secondaryColor: `hsl(${secondaryHue}, ${secondarySat}%, ${secondaryLight}%)`,
      eyeType,
      eyeSize,
      mouthType,
      accessoryType,
      patternType,
      rotation,
    };
  }, [address]);

  if (!svgProps) return null;

  const renderPattern = () => {
    switch (svgProps.patternType) {
      case 0: // Dots
        return (
          <g opacity="0.2">
            {[...Array(6)].map((_, i) => (
              <circle
                key={i}
                cx={25 + (i % 2) * 50}
                cy={20 + Math.floor(i / 2) * 30}
                r="4"
                fill={svgProps.secondaryColor}
              />
            ))}
          </g>
        );
      case 1: // Stripes
        return (
          <g opacity="0.15">
            {[...Array(5)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1={20 + i * 15}
                x2="100"
                y2={20 + i * 15}
                stroke={svgProps.secondaryColor}
                strokeWidth="2"
              />
            ))}
          </g>
        );
      case 2: // Triangles
        return (
          <g opacity="0.15">
            {[...Array(3)].map((_, i) => (
              <path
                key={i}
                d={`M ${20 + i * 30} 20 L ${30 + i * 30} 35 L ${10 + i * 30} 35 Z`}
                fill={svgProps.secondaryColor}
              />
            ))}
          </g>
        );
      default:
        return null;
    }
  };

  const renderEyes = () => {
    const eyeY = 35;
    const leftX = 30;
    const rightX = 70;
    const size = svgProps.eyeSize;

    switch (svgProps.eyeType) {
      case 0: // Round eyes with shine
        return (
          <>
            <circle cx={leftX} cy={eyeY} r={size + 1} fill="black" />
            <circle cx={rightX} cy={eyeY} r={size + 1} fill="black" />
            <circle cx={leftX} cy={eyeY} r={size} fill="white" />
            <circle cx={rightX} cy={eyeY} r={size} fill="white" />
            <circle cx={leftX - 1} cy={eyeY - 1} r={size / 2} fill="black" />
            <circle cx={rightX - 1} cy={eyeY - 1} r={size / 2} fill="black" />
            <circle cx={leftX - 0.5} cy={eyeY - 0.5} r={1} fill="white" />
            <circle cx={rightX - 0.5} cy={eyeY - 0.5} r={1} fill="white" />
          </>
        );
      case 1: // Anime-style eyes
        return (
          <>
            <path
              d={`M${leftX - size * 2} ${eyeY} C ${leftX - size} ${eyeY - size} ${leftX + size} ${eyeY - size} ${leftX + size * 2} ${eyeY}`}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d={`M${rightX - size * 2} ${eyeY} C ${rightX - size} ${eyeY - size} ${rightX + size} ${eyeY - size} ${rightX + size * 2} ${eyeY}`}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          </>
        );
      case 2: // Square eyes with gradient
        return (
          <>
            <rect
              x={leftX - size}
              y={eyeY - size}
              width={size * 2}
              height={size * 2}
              fill="black"
              rx="1"
            />
            <rect
              x={rightX - size}
              y={eyeY - size}
              width={size * 2}
              height={size * 2}
              fill="black"
              rx="1"
            />
          </>
        );
      case 3: // Sleepy eyes
        return (
          <>
            <path
              d={`M${leftX - size * 2} ${eyeY + size} C ${leftX} ${eyeY - size} ${leftX + size * 2} ${eyeY + size} ${leftX + size * 2} ${eyeY + size}`}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d={`M${rightX - size * 2} ${eyeY + size} C ${rightX} ${eyeY - size} ${rightX + size * 2} ${eyeY + size} ${rightX + size * 2} ${eyeY + size}`}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          </>
        );
      case 4: {
        // Star eyes
        const starPoints = (cx: number, cy: number, size: number) => {
          const points = [];
          for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            points.push(
              `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`,
            );
            const innerAngle = angle + Math.PI / 5;
            points.push(
              `${cx + (size / 2) * Math.cos(innerAngle)},${cy + (size / 2) * Math.sin(innerAngle)}`,
            );
          }
          return points.join(' ');
        };
        return (
          <>
            <polygon
              points={starPoints(leftX, eyeY, size * 1.5)}
              fill="black"
            />
            <polygon
              points={starPoints(rightX, eyeY, size * 1.5)}
              fill="black"
            />
          </>
        );
      }
      default:
        return null;
    }
  };

  const renderMouth = () => {
    const mouthY = 65;

    switch (svgProps.mouthType) {
      case 0: // Cat-like smile
        return (
          <path
            d={'M 30 65 Q 50 80 70 65 Q 50 75 30 65'}
            fill="black"
            opacity="0.6"
          />
        );
      case 1: // Squiggly smile
        return (
          <path
            d="M 25 65 Q 35 60 45 65 Q 55 70 65 65 Q 75 60 85 65"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        );
      case 2: // Heart mouth
        return (
          <path
            d="M 50 75 L 40 65 A 7 7 0 0 1 50 55 A 7 7 0 0 1 60 65 L 50 75"
            fill="black"
            opacity="0.6"
          />
        );
      case 3: // Surprised mouth
        return <circle cx="50" cy={mouthY} r="5" fill="black" opacity="0.6" />;
      case 4: // Smirk
        return (
          <path
            d="M 30 65 Q 45 65 50 70 Q 55 65 70 60"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        );
      case 5: // Cute smile
        return (
          <>
            <path
              d="M 30 65 Q 50 75 70 65"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <line
              x1="40"
              y1="72"
              x2="60"
              y2="72"
              stroke="black"
              strokeWidth="2"
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderAccessory = () => {
    switch (svgProps.accessoryType) {
      case 0: // Top hat
        return (
          <g fill={svgProps.secondaryColor}>
            <rect x="35" y="5" width="30" height="20" />
            <rect x="30" y="20" width="40" height="5" />
          </g>
        );
      case 1: // Bow
        return (
          <g fill={svgProps.secondaryColor}>
            <circle cx="25" cy="15" r="8" />
            <circle cx="75" cy="15" r="8" />
            <circle cx="50" cy="15" r="6" />
          </g>
        );
      case 2: // Crown
        return (
          <path
            d="M 30 15 L 40 25 L 50 15 L 60 25 L 70 15 L 75 25 L 25 25 L 30 15"
            fill={svgProps.secondaryColor}
          />
        );
      case 3: // Glasses
        return (
          <g fill="none" stroke={svgProps.secondaryColor} strokeWidth="2">
            <circle cx="30" cy="35" r="10" />
            <circle cx="70" cy="35" r="10" />
            <line x1="40" y1="35" x2="60" y2="35" />
          </g>
        );
      case 4: // Bandana
        return (
          <path
            d="M 0 15 L 100 15 L 90 25 L 10 25 Z"
            fill={svgProps.secondaryColor}
            opacity="0.8"
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        borderRadius: '50%',
        transform: `rotate(${svgProps.rotation}deg)`,
      }}
    >
      <circle cx="50" cy="50" r="50" fill={svgProps.backgroundColor} />
      {renderPattern()}
      {renderAccessory()}
      {renderEyes()}
      {renderMouth()}
    </svg>
  );
}
