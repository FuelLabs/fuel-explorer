import { Button, Dropdown, Link } from '@fuels/ui';
import { IconChevronDown } from '@fuels/ui';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { languages } from '~/locales/languages';
import { type Locale, locales } from '~/locales/locales';

export function LanguageSelect() {
  const { t, i18n } = useTranslation();
  const value = locales[i18n.language as Locale] ? i18n.language : 'en';
  const current = languages.find((language) => language.code === value);

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          variant="ghost"
          color="gray"
          size="1"
          rightIcon={IconChevronDown}
          aria-label={t('common.language')}
          className="m-0 h-10 px-4 text-color-gray-3"
        >
          {current?.name}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content align="end">
        {languages.map((language) => {
          const selected = language.code === value;
          return (
            <Dropdown.Item
              key={language.code}
              disabled={selected}
              className={clsx('px-4', {
                'hover:bg-gray-3': !selected,
                'hover:bg-transparent': selected,
              })}
              onSelect={() => {
                void i18n.changeLanguage(language.code);
              }}
            >
              <Link
                color={selected ? 'green' : 'gray'}
                underline="none"
                className="decoration-none pointer-events-none w-full"
              >
                {language.name}
              </Link>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown>
  );
}
