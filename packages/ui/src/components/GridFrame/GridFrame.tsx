import { cx } from '../../utils/css';

export interface GridFrameProps {
  children: React.ReactNode;
  className?: string;
}

const CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

export function GridFrame({ children, className }: GridFrameProps) {
  return (
    <div className={cx('fuel-grid-frame', className)}>
      {CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden
          className={`fuel-corner fuel-corner-${corner}`}
        />
      ))}
      {children}
    </div>
  );
}
