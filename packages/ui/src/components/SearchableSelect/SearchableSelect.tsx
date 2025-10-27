import { IconChevronDown } from '@tabler/icons-react';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { tv } from 'tailwind-variants';

const containerVariants = tv({
  base: [
    'flex flex-row items-center w-full bg-transparent',
    'pb-2 pt-2 transition-colors border-b border-solid',
  ],
  variants: {
    error: {
      true: 'border-red-9',
      false: 'border-gray-8',
    },
    selected: {
      true: 'border-gray-12',
    },
  },
  defaultVariants: {
    error: false,
  },
});

const optionsListVariants = tv({
  base: [
    'overflow-y-auto rounded-lg mt-0.5',
    'border border-solid border-gray-5A',
    'max-h-[252px] min-w-[300px]',
    'shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
    'bg-gray-3',
    'animate-[fadeIn_0.2s_ease,scaleIn_0.2s_ease]',
    '[&::-webkit-scrollbar]:w-[10px] [&::-webkit-scrollbar]:bg-transparent',
    '[&::-webkit-scrollbar-track]:bg-transparent',
    '[&::-webkit-scrollbar-thumb]:bg-gray-8 [&::-webkit-scrollbar-thumb]:opacity-50',
    '[&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent',
    '[&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-clip-content',
    '[&::-webkit-scrollbar-thumb:hover]:bg-gray-10',
  ],
});

const optionItemVariants = tv({
  base: [
    'p-2 cursor-pointer bg-[var(--color-panel-solid)]',
    'flex items-center w-full hover:bg-gray-3',
  ],
  variants: {
    selected: {
      true: 'bg-gray-alpha-1',
    },
  },
});

const inputVariants = tv({
  base: [
    'bg-transparent text-gray-12 w-full outline-none pt-0 pb-0',
    'placeholder:text-gray-9',
    'disabled:text-gray-9 disabled:cursor-not-allowed',
    'focus:outline-none',
  ],
});

const imageVariants = tv({
  base: 'w-7 h-7 rounded-full',
});

const fallbackImageVariants = tv({
  base: 'w-7 h-7 rounded-full bg-[#2b3f2f] flex items-center justify-center',
});

const monikerVariants = tv({
  base: 'text-gray-12 font-medium leading-none inline-block align-middle ml-2',
});

const commissionVariants = tv({
  base: 'text-gray-8 ml-0.5 text-[15px] leading-none inline-block align-middle',
});

const selectedDisplayVariants = tv({
  base: 'flex-1 cursor-pointer min-h-6 flex items-center',
});

export interface Option {
  label: string;
  value: string;
  commission?: string;
  votingPower?: string;
  image?: string;
}

export interface SearchableSelectProps {
  placeholder?: string;
  className?: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  onSelectOption?: (option: Option) => void;
  selectedOption?: Option;
  endAdornment?: ReactNode;
  disabled?: boolean;
  error?: boolean;
  selected?: string;
}

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
};

export function SearchableSelect({
  placeholder = 'Search...',
  className,
  options = [],
  value = '',
  onChange,
  onSelectOption,
  selectedOption,
  endAdornment,
  disabled = false,
  error = false,
  selected,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(
    selectedOption?.label || value || '',
  );
  const [isEditMode, setIsEditMode] = useState(!selectedOption);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    width: 0,
  });
  const [internalSelectedOption, setInternalSelectedOption] = useState<
    Option | undefined
  >(selectedOption);
  const [isFreshEditMode, setIsFreshEditMode] = useState(false);
  const [preventDropdownOpen, setPreventDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search
  // In fresh edit mode, show all options. Otherwise filter by localValue
  const filteredOptions = useMemo(
    () =>
      isFreshEditMode
        ? options
        : options.filter(
            (option) =>
              option.label.toLowerCase().includes(localValue.toLowerCase()) ||
              option.value.toLowerCase().includes(localValue.toLowerCase()),
          ),
    [isFreshEditMode, options, localValue],
  );

  // Update dropdown position
  const updatePosition = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDropdownPosition({
        top: rect.bottom + 2,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  // Handle option selection
  const handleSelectOption = useCallback(
    (option: Option) => {
      // Immediately update selection and close dropdown
      setInternalSelectedOption(option);
      setLocalValue(option.label);
      setIsEditMode(false);
      setIsOpen(false);
      setIsFreshEditMode(false);

      // Prevent dropdown from reopening during transition
      setPreventDropdownOpen(true);

      // Notify parent component
      onSelectOption?.(option);

      // Allow dropdown to open again after a short delay
      setTimeout(() => {
        setPreventDropdownOpen(false);
      }, 100);
    },
    [onSelectOption],
  );

  // Handle focus
  const handleFocus = useCallback(() => {
    if (!disabled && !preventDropdownOpen) {
      setIsOpen(true);
      setIsEditMode(true);
      setIsFreshEditMode(true); // Show all options on first focus

      // Clear input value while keeping the selection intact
      setLocalValue('');
      onChange('');

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [disabled, preventDropdownOpen, onChange]);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      setIsEditMode(true);
      setIsFreshEditMode(false); // Exit fresh mode when user starts typing
      setIsOpen(true);
      onChange(newValue);
    },
    [onChange],
  );

  // Handle input blur
  const handleBlur = useCallback(() => {
    if (disabled) return;

    // Auto-select first filtered option if user has typed something
    if (filteredOptions?.length && localValue !== '') {
      handleSelectOption(filteredOptions[0]);
    }

    // Reset to selected option or clear
    if (!internalSelectedOption) {
      setLocalValue('');
      onChange('');
    } else if (internalSelectedOption && !isEditMode) {
      setLocalValue(internalSelectedOption.label);
    }

    setIsFreshEditMode(false);
  }, [
    disabled,
    internalSelectedOption,
    filteredOptions,
    handleSelectOption,
    onChange,
    localValue,
    isEditMode,
  ]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Handle Tab key to move focus to dropdown
      if (e.key === 'Tab' && !e.shiftKey && isOpen && optionsRef.current) {
        e.preventDefault();
        optionsRef.current.focus();
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedOptionIndex((prev) =>
            Math.min(prev + 1, filteredOptions.length - 1),
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedOptionIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredOptions?.length > 0) {
            const optionToSelect =
              focusedOptionIndex >= 0 &&
              focusedOptionIndex < filteredOptions.length
                ? filteredOptions[focusedOptionIndex]
                : filteredOptions[0];
            setTimeout(() => {
              handleSelectOption(optionToSelect);
            }, 0);
          }
          break;
        case 'Escape':
          e.preventDefault();
          e.stopPropagation();
          break;
      }
    },
    [isOpen, filteredOptions, focusedOptionIndex, handleSelectOption],
  );

  // Handle option click
  const handleOptionClick = useCallback(
    (e: React.MouseEvent, option: Option) => {
      e.stopPropagation();
      e.preventDefault();
      handleSelectOption(option);
    },
    [handleSelectOption],
  );

  // Update position when dropdown opens
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    updatePosition();

    const observer = new MutationObserver(updatePosition);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    const debouncedPositionUpdate = () => {
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('scroll', debouncedPositionUpdate, {
      passive: true,
    });
    window.addEventListener('resize', debouncedPositionUpdate, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', debouncedPositionUpdate);
      window.removeEventListener('resize', debouncedPositionUpdate);
    };
  }, [isOpen, updatePosition]);

  // Sync with external selectedOption changes
  useEffect(() => {
    if (selectedOption) {
      setInternalSelectedOption(selectedOption);
      setLocalValue(selectedOption.label);
      setIsEditMode(false);
    }
  }, [selectedOption]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsEditMode(false);
        setIsFreshEditMode(false);
        if (internalSelectedOption) {
          setLocalValue(internalSelectedOption.label);
        } else {
          setLocalValue('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [internalSelectedOption]);

  // Scroll focused option into view
  useEffect(() => {
    if (focusedOptionIndex >= 0 && optionsRef.current) {
      const optionElements =
        optionsRef.current.querySelectorAll('[role="option"]');
      if (optionElements[focusedOptionIndex]) {
        optionElements[focusedOptionIndex].scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedOptionIndex]);

  const optionsListId = useMemo(
    () =>
      `searchable-select-options-${Math.random().toString(36).substring(2, 9)}`,
    [],
  );

  // Render validator info helper
  const renderValidatorInfo = (option?: Option, extraClassName?: string) => {
    if (!option) return null;
    return (
      <div
        className={`flex items-center gap-1.5 w-full ${extraClassName || ''}`}
      >
        {option.image ? (
          <img
            src={option.image}
            alt={option.label}
            className={imageVariants()}
          />
        ) : (
          <div className={fallbackImageVariants()}>&nbsp;</div>
        )}
        <span className={monikerVariants()}>{option.label}</span>
        {option.commission && (
          <span className={commissionVariants()}>
            {option.commission}% Voting Power
          </span>
        )}
      </div>
    );
  };

  // Determine which view to show
  const shouldShowField = !internalSelectedOption || isEditMode;
  const shouldShowDisplay = internalSelectedOption && !isEditMode;

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%' }}
      className={className}
    >
      <div
        className={containerVariants({
          error,
          selected: !!selected || !!internalSelectedOption || isOpen,
        })}
      >
        {/* Input field when in edit mode or no selection */}
        {shouldShowField && (
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              className={inputVariants()}
              placeholder={placeholder}
              value={localValue}
              onChange={handleInputChange}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              disabled={disabled}
              aria-autocomplete="list"
              aria-expanded={isOpen}
              role="combobox"
              aria-controls={optionsListId}
              aria-label={placeholder}
            />
          </div>
        )}

        {/* Display selected value when not in edit mode */}
        {shouldShowDisplay && (
          <div
            className={selectedDisplayVariants()}
            onClick={handleFocus}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFocus();
              }
            }}
            tabIndex={0}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            data-state="selected"
          >
            {renderValidatorInfo(internalSelectedOption)}
          </div>
        )}

        {/* Chevron icon */}
        <div
          onClick={handleFocus}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleFocus();
            }
          }}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          aria-label="Toggle dropdown"
        >
          {endAdornment || <IconChevronDown size={20} />}
        </div>
      </div>

      {/* Dropdown portal */}
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100000,
              pointerEvents: 'none',
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            aria-modal="true"
            role="dialog"
            aria-label="Select options"
          >
            <div
              ref={optionsRef}
              className={optionsListVariants()}
              role="listbox"
              id={optionsListId}
              aria-label="Options"
              tabIndex={0}
              style={{
                position: 'fixed',
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
                zIndex: 100000,
                pointerEvents: 'auto',
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const isSelected =
                    option.value === selected ||
                    (internalSelectedOption &&
                      option.value === internalSelectedOption.value) ||
                    index === focusedOptionIndex;

                  return (
                    <div
                      key={option.value}
                      className={optionItemVariants({ selected: isSelected })}
                      onClick={(e) => handleOptionClick(e, option)}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSelectOption(option);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSelectOption(option);
                        }
                      }}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={0}
                    >
                      {renderValidatorInfo(option, 'px-2 py-3')}
                    </div>
                  );
                })
              ) : (
                <div
                  className={optionItemVariants()}
                  role="option"
                  aria-disabled="true"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  No results found
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
