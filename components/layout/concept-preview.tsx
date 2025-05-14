'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ConceptPreview() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-col space-y-4 px-6 py-24 md:flex-row md:space-x-12 md:space-y-0 md:p-24">
      <div className="font-multilingual flex flex-col space-y-2 font-extralight md:w-1/2">
        <div className="max-w-sm text-[40px]">{t('home.previews.concept.title')}</div>
        <div className="max-w-sm text-[40px]">{t('home.previews.concept.subtitle')}</div>
      </div>
      <div className="font-multilingual flex flex-col space-y-6 text-base font-extralight md:w-1/2">
        <div>{t('home.previews.concept.body')}</div>
        <Link
          href="/concept"
          className="max-w-sm border border-white px-6 py-3 text-center text-base transition-colors duration-150 hover:border-white/50"
        >
          {t('home.previews.concept.button')}
        </Link>
      </div>
    </div>
  );
}
