import { createI18n } from 'vue-i18n';
import pa from './locales/pa.json';
import en from './locales/en.json';

function loadLocalMessages() {
  const locales = [{ en: en }, { pa: pa }];
  const messages = {};
  locales.forEach((lang) => {
    const key = Object.keys(lang);
    messages[key] = lang[key];
  });
  return messages;
}

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocalMessages(),
});
