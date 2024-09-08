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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 26 27"
            fill="none"
          >
            <path
              className="fill-gray-12 dark:fill-green-10"
              d="M2.318 1.571h20.927v22.422H2.318z"
            />
            <path
              className="fill-gray-12 dark:fill-green-10"
              d="M1.795.076C.844.076.076.853.076 1.816v24.419h21.385c.723 0 1.418-.29 1.93-.809l1.733-1.753a2.78 2.78 0 0 0 .798-1.953V.076H1.795ZM16.952 3.44l-8.407 8.508a1.106 1.106 0 0 1-1.791-.315L3.496 4.665a.858.858 0 0 1 .768-1.225h12.688ZM3.399 22.87v-8.277c0-.441.353-.798.789-.798h8.178L3.4 22.871Zm9.645-10.594h-2.708l8.148-8.246a1.985 1.985 0 0 1 1.41-.591h2.709l-8.148 8.245a1.985 1.985 0 0 1-1.41.592Z"
            />
            <path
              className="fill-green-10 dark:fill-[#202020]"
              d="m8.545 11.948 8.407-8.509H4.264a.858.858 0 0 0-.768 1.225l3.258 6.969a1.106 1.106 0 0 0 1.791.315ZM3.4 14.594v8.277l8.966-9.075H4.188a.793.793 0 0 0-.789.798ZM10.336 12.277h2.708c.53 0 1.038-.214 1.411-.592l8.147-8.246h-2.707c-.53 0-1.038.214-1.411.592l-8.148 8.246Z"
            />
          </svg>
        )}
        {showLettering && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size * 3.05}
            height={size}
            viewBox="0 0 61 20"
            fill="none"
          >
            <path
              className="fill-gray-12 dark:fill-white"
              d="M15.317 18.214V.375h2.443V17.15h9.559L27.265.393l2.5-.018v17.839c0 .78-.624 1.411-1.395 1.411H16.715a1.402 1.402 0 0 1-1.395-1.411h-.003ZM48.188 18.214V.375h2.442V17.15h9.854v2.475H49.582a1.402 1.402 0 0 1-1.395-1.411ZM.25 19.625h2.443v-8.36H11.9V8.789H2.693V2.85h9.057a.7.7 0 0 0 .631-.402l.975-2.073H1.647C.876.375.25 1.006.25 1.786v17.839ZM32.422 1.786c0-.78.623-1.411 1.394-1.411h11.71l-.973 2.073a.694.694 0 0 1-.631.402h-9.057v5.94h9.207v2.475h-9.207v5.885h10.66v2.475H33.816a1.402 1.402 0 0 1-1.394-1.411V1.786Z"
            />
          </svg>
        )}
      </span>
    );
  },
});
