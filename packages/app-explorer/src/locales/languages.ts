import type { Locale } from './locales';

export const languages: { code: Locale; name: string; emoji: string }[] = [
  { code: 'en', name: 'English', emoji: '🇺🇸' },
  { code: 'zh-HK', name: '繁體中文', emoji: '🇭🇰' },
  { code: 'zh-CN', name: '简体中文', emoji: '🇨🇳' },
  { code: 'ko', name: '한국어', emoji: '🇰🇷' },
  { code: 'ja', name: '日本語', emoji: '🇯🇵' },
];
