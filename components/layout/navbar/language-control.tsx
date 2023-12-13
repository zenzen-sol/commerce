'use client';

import clsx from 'clsx';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export type SupportedLocale = 'en' | 'ja' | 'zh_tw';

const locales = ['en', 'ja', 'zh_tw'] as const;

function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export const LanguageControl = ({ lang }: { lang?: SupportedLocale }) => {
  const { Link, usePathname } = createSharedPathnamesNavigation({ locales });
  const pathName = usePathname();

  const basePathName = () => {
    const unjoined = pathName.split('/');
    let unjoinedWithoutLocale = removeItem(unjoined, 'en');
    unjoinedWithoutLocale = removeItem(unjoinedWithoutLocale, 'ja');
    unjoinedWithoutLocale = removeItem(unjoinedWithoutLocale, 'zh_tw');
    return unjoinedWithoutLocale.join('/') || '/';
  };

  return (
    <div className="flex flex-row space-x-0">
      <span className="px-2 py-4">
        <Link
          href={basePathName()}
          className={clsx(
            lang === 'ja' ? 'opacity-100' : 'opacity-50 hover:opacity-70',
            'transition-opacity duration-150'
          )}
          scroll={false}
          locale="ja"
        >
          日本
        </Link>
      </span>
      <span className="py-4">/</span>
      <span className="px-2 py-4">
        <Link
          href={basePathName()}
          className={clsx(
            lang === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-70',
            'transition-opacity duration-150'
          )}
          scroll={false}
          locale="en"
        >
          EN
        </Link>
      </span>
      <span className="py-4">/</span>
      <span className="px-2 py-4">
        <Link
          href={basePathName()}
          className={clsx(
            lang === 'zh_tw' ? 'opacity-100' : 'opacity-50 hover:opacity-70',
            'transition-opacity duration-150'
          )}
          scroll={false}
          locale="zh_tw"
        >
          中文
        </Link>
      </span>
    </div>
  );
};
