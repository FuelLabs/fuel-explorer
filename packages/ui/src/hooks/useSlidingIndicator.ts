import { type RefObject, useLayoutEffect, useRef } from 'react';

/**
 * One indicator element that slides under the active item of a row of tabs.
 *
 * Attach the returned ref to the indicator and give it `transform-origin: left`,
 * `width: 1px` and a `transform` transition. The hook sets `transform` to
 * `translateX(x) scaleX(width)` and `opacity` to 1, or 0 when no item matches,
 * so only `transform` animates. The first placement and container resizes
 * jump instead of travelling.
 *
 * @param containerRef the element that holds the items and positions the indicator
 * @param activeSelector selects the active item inside the container, for example `[data-active="true"]`
 * @param deps values that move the active item: the active value and the item set
 */
export function useSlidingIndicator<
  C extends HTMLElement = HTMLElement,
  I extends HTMLElement = HTMLElement,
>(
  containerRef: RefObject<C>,
  activeSelector: string,
  deps: ReadonlyArray<unknown> = [],
): RefObject<I> {
  const indicatorRef = useRef<I>(null);
  const placed = useRef(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: deps are passed by the caller
  useLayoutEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    function place(animate: boolean) {
      if (!container || !indicator) return;
      const item = container.querySelector<HTMLElement>(activeSelector);
      indicator.style.opacity = item ? '1' : '0';
      if (!item) return;
      if (!animate) indicator.style.transition = 'none';
      const box = item.getBoundingClientRect();
      const x = box.left - container.getBoundingClientRect().left;
      indicator.style.transform = `translateX(${x}px) scaleX(${box.width})`;
      if (!animate) {
        void indicator.offsetWidth;
        indicator.style.transition = '';
      }
    }

    place(placed.current);
    placed.current = true;
    let width = container.offsetWidth;
    const observer = new ResizeObserver(() => {
      if (container.offsetWidth === width) return;
      width = container.offsetWidth;
      place(false);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, activeSelector, ...deps]);

  return indicatorRef;
}
