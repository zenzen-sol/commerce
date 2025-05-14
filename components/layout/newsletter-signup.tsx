'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export default function NewsletterSignup() {
  const t = useTranslations('Index');

  return (
    <div className="mx-auto max-w-xl space-y-4 px-4">
      <h3 className="font-serif text-2xl tracking-wider">{t('newsletter.title')}</h3>
      <div className="font-multilingual text-sm font-extralight">{t('newsletter.description')}</div>
      <form
        className="max-w-xl space-x-px md:flex"
        action={`${process?.env?.NEXT_PUBLIC_MAILCHIMP_HOST}/subscribe/post?u=${process?.env?.NEXT_PUBLIC_MAILCHIMP_USER_ID}&amp;id=${process?.env?.NEXT_PUBLIC_MAILCHIMP_LIST_ID}`}
        method="post"
        name="mc-embedded-subscribe-form"
      >
        <label htmlFor="email-address" className="sr-only">
          {t('newsletter.placeholder')}
        </label>
        <input
          type="email"
          name="EMAIL"
          id="email-address"
          autoComplete="email"
          required
          className={clsx(
            'w-full min-w-0 appearance-none text-sm',
            'bg-white outline-none',
            'px-4 py-3 focus:outline-none',
            'focus:ring-2 focus:ring-inset focus:ring-emerald-300 focus:ring-offset-0',
            'text-gray-900 placeholder-gray-400'
          )}
          placeholder={t('newsletter.placeholder')}
        />
        <div className="mt-3 rounded-md sm:ml-3 sm:mt-0 sm:shrink-0">
          <button
            type="submit"
            className={clsx(
              'px-4 py-3 text-sm',
              'transition-colors duration-150',
              'font-multilingual flex w-full items-center justify-center font-extralight',
              'border border-white/30 hover:border-white',
              'focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-300 focus:ring-offset-0'
            )}
          >
            {t('newsletter.button')}
          </button>
        </div>
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input
            type="text"
            name={`b_${process?.env?.NEXT_PUBLIC_MAILCHIMP_USER_ID}_${process?.env?.NEXT_PUBLIC_MAILCHIMP_LIST_ID}`}
            defaultValue=""
            tabIndex={-1}
          />
        </div>
      </form>
    </div>
  );
}
