import { tv } from 'tailwind-variants';
import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type FuelLogoProps = PropsOf<'span'> & {
  size?: number;
  showLettering?: boolean;
  showSymbol?: boolean;
};

const styles = tv({
  slots: {
    root: 'inline-flex items-center gap-3',
  },
});

export const FuelLogo = createComponent<FuelLogoProps, 'span'>({
  id: 'FuelLogo',
  className: ({ className }) => styles().root({ className }),
  render: (_, { size = 40, showLettering, showSymbol = true, ...props }) => {
    return (
      <span {...props}>
        {showSymbol && (
          <svg height={size} viewBox="0 0 136 136" width={size}>
            <path
              d="M9.01875 0C6.62737 -1.43557e-07 4.33388 0.949756 2.64263 2.64042C0.951377 4.33109 0.000828614 6.62425 0 9.01563V135.625H112.216C116.013 135.625 119.655 134.116 122.341 131.431L131.431 122.341C132.761 121.011 133.816 119.433 134.535 117.695C135.255 115.958 135.625 114.096 135.625 112.216V0H9.01875ZM21.975 17.4375H88.5531L44.4469 61.5437C43.3514 62.6376 41.8668 63.2523 40.3187 63.2531V63.2531C39.213 63.253 38.1299 62.9391 37.1956 62.3477C36.2612 61.7563 35.5139 60.9119 35.0406 59.9125L17.9531 23.7844C17.6328 23.1065 17.489 22.3586 17.5352 21.6103C17.5814 20.862 17.8161 20.1374 18.2174 19.5041C18.6188 18.8708 19.1737 18.3493 19.8306 17.9879C20.4876 17.6266 21.2252 17.4373 21.975 17.4375V17.4375ZM17.4375 118.187V75.2719C17.4383 74.1726 17.8756 73.1186 18.6532 72.3416C19.4308 71.5646 20.4851 71.1281 21.5844 71.1281H64.4969L17.4375 118.187ZM75.4375 60.1906C73.4746 62.1506 70.8145 63.2519 68.0406 63.2531H53.8312L96.5843 20.5031C97.5555 19.5314 98.7087 18.7605 99.9778 18.2345C101.247 17.7085 102.607 17.4376 103.981 17.4375H118.187L75.4375 60.1906Z"
              fill="#00F58C"
            />
          </svg>
        )}
        {showLettering && (
          <svg
            height={size}
            viewBox="0 0 430 136"
            width={size * 3.1}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M0.515747 135.625H17.9407V76.725H83.5876V59.2875H17.9251V17.4375H82.5032C83.4435 17.4375 84.3644 17.171 85.1592 16.6687C85.9541 16.1665 86.5902 15.4492 86.9938 14.6L93.9344 0H10.447C7.81189 0.00496554 5.28638 1.05503 3.4245 2.9198C1.56268 4.78458 0.516541 7.31176 0.515747 9.94687V135.625ZM107.931 0V125.678C107.931 128.314 108.977 130.842 110.84 132.707C112.703 134.572 115.23 135.622 117.865 135.625H200.99C202.297 135.625 203.591 135.368 204.798 134.869C206.005 134.369 207.102 133.636 208.026 132.713C208.95 131.789 209.683 130.692 210.183 129.485C210.683 128.278 210.94 126.985 210.94 125.678V0L193.128 0.128126L193.512 118.187H125.353V0H107.931ZM342.313 0V125.678C342.313 128.316 343.361 130.846 345.226 132.712C347.092 134.577 349.622 135.625 352.26 135.625H430V118.187H359.735V0H342.313ZM230.666 6.14037C230.166 7.34718 229.909 8.64063 229.909 9.94687V125.678C229.909 128.316 230.957 130.846 232.822 132.712C234.688 134.577 237.218 135.625 239.856 135.625H323.328V118.187H247.331V76.725H312.981V59.2875H247.331V17.4375H311.896C312.837 17.4379 313.758 17.1715 314.553 16.6692C315.348 16.1669 315.984 15.4494 316.387 14.6L323.328 0H239.856C238.549 0 237.256 0.257283 236.049 0.75716C234.842 1.25704 233.746 1.98972 232.822 2.91337C231.898 3.83702 231.166 4.93356 230.666 6.14037Z"
              fill="white"
              fillRule="evenodd"
            />
          </svg>
        )}
      </span>
    );
  },
});
