import { bn } from 'fuels';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { NumericFormat, type OnValueChange } from 'react-number-format';
import { useAmountSimpleCtx } from './InputAmountSimpleContext';
import { adjustFontSize } from './utils/adjustFontSize';

export function InputAmountSimpleField() {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { decimals, value, disabled, readOnly, onChange } =
    useAmountSimpleCtx();

  const formattedValue = useMemo<string>(() => {
    if (!value || value.isZero()) {
      return '';
    }

    return value.format({
      units: decimals,
      minPrecision: 0,
    });
  }, [decimals, value]);

  const handleFontSize = useCallback(() => {
    if (!inputRef.current) return;
    adjustFontSize(inputRef.current);
  }, []);

  const handleValueChange: OnValueChange = useCallback(
    (values) => {
      handleFontSize();
      const parsed = bn.parseUnits(values.value, decimals);
      onChange?.(parsed);
    },
    [handleFontSize, onChange, decimals],
  );

  const debouncedHandleFontSize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleFontSize, 100);
  }, [handleFontSize]);

  useEffect(() => {
    if (!inputRef.current) return;

    const resizeObserver = new ResizeObserver(debouncedHandleFontSize);
    resizeObserver.observe(inputRef.current);

    return () => {
      resizeObserver.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedHandleFontSize]);

  useEffect(() => {
    debouncedHandleFontSize();
  }, [debouncedHandleFontSize]);

  return (
    <NumericFormat
      getInputRef={inputRef}
      className="flex-1 p-2 font-mono text-2xl text-[--gray-12] font-semibold tracking-wide bg-transparent border-0 outline-none w-full placeholder:text-[--gray-10] disabled:text-[--gray-10] read-only:text-[--gray-12] read-only:cursor-default"
      valueIsNumericString
      placeholder="0.00"
      thousandSeparator=","
      decimalSeparator="."
      decimalScale={decimals}
      value={formattedValue}
      onValueChange={handleValueChange}
      allowNegative={false}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}
