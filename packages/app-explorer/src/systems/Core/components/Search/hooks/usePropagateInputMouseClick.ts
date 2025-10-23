import { useBreakpoints } from '@fuels/ui';
import { type MutableRefObject, type RefObject, useEffect } from 'react';

// Radix's Dropdown component uses a Portal to render the dropdown content,
// That causes Input to not capture click events, forcing the user to double click the input when the dropdown is open.
// To fix that we need to render a separate Portal to render the overlay and capture the click to make it work.

export function usePropagateInputMouseClick({
  containerRef,
  inputRef,
  enabled,
  hasClickedFieldArea,
  isPressingFloatingIcon,
}: {
  containerRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  enabled: boolean | undefined;
  hasClickedFieldArea: MutableRefObject<boolean>;
  isPressingFloatingIcon: MutableRefObject<boolean>;
}) {
  const { isMobile } = useBreakpoints();

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const onClick = (e: MouseEvent) => {
      if (isPressingFloatingIcon.current) {
        return;
      }
      const boundingData = containerRef.current?.getBoundingClientRect();

      if (boundingData) {
        const { clientX, clientY } = e;
        if (
          clientX >= boundingData.x &&
          clientX <= boundingData.x + boundingData.width &&
          clientY >= boundingData.y &&
          clientY <= boundingData.y + boundingData.height
        ) {
          if (isMobile) {
            hasClickedFieldArea.current = true;
            inputRef.current?.focus();
            setTimeout(() => {
              hasClickedFieldArea.current = false;
              inputRef.current?.focus();
            }, 200);
          } else {
            inputRef.current?.focus();
          }
        }
      }
    };

    document.addEventListener('click', onClick);

    return () => {
      setTimeout(() => {
        document.removeEventListener('click', onClick);
      }, 500);
    };
  }, [enabled, isMobile]);
}
