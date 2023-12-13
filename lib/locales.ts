export const getShopifyLocale = ({ locale }: { locale?: string }) => {
  if (!locale) {
    return 'JA';
  } else if (locale === 'zh') {
    return 'zh-TW';
  } else {
  }
};
