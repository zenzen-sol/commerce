'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function SagyobarPreview() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-col space-y-4 px-6 py-24 md:flex-row md:space-x-12 md:space-y-0 md:p-24">
      <div className="font-multilingual flex flex-col font-extralight md:w-1/2">
        <div className="max-w-sm text-[40px]">{t('home.previews.bar.title.line001')}</div>
        <div className="max-w-sm text-[40px]">{t('home.previews.bar.title.line002')}</div>
        <div className="max-w-sm text-[40px]">{t('home.previews.bar.title.line003')}</div>
      </div>
      <div className="font-multilingual flex flex-col space-y-6 text-base font-extralight md:w-1/2">
        <div>{t('home.previews.bar.body')}</div>
        <Link
          href="/bar"
          className="max-w-sm border border-white px-6 py-3 text-center text-base transition-colors duration-150 hover:border-white/50"
        >
          {t('home.previews.bar.button')}
        </Link>
      </div>
    </div>
  );
}
