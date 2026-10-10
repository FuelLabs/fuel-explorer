import { Button, Dropdown } from '@fuels/ui';
import { IconChevronDown } from '@fuels/ui';
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
          aria-label={`${t('common.language')}: ${current?.name ?? ''}`}
          className="m-0 h-10 px-4 text-[var(--fuel-element-mid-em)]"
        >
          {current?.name}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content align="end">
        {languages.map((language) => {
          const selected = language.code === value;
          return (
            <Dropdown.CheckboxItem
              key={language.code}
              lang={language.code}
              checked={selected}
              className="px-4"
              onCheckedChange={() => {
                if (!selected) void i18n.changeLanguage(language.code);
              }}
            >
              {language.name}
            </Dropdown.CheckboxItem>
          );
        })}
      </Dropdown.Content>
    </Dropdown>
  );
}
