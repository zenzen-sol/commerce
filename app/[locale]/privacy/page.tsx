import Footer from 'components/layout/footer';
import type { SupportedLocale } from 'components/layout/navbar/language-control';

import Navbar from 'components/layout/navbar';
import { getShopifyLocale } from 'lib/locales';
import { getCart, getProduct } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import { unstable_setRequestLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import PrivacyPolicy from './privacy-policy';

const { SITE_NAME } = process.env;

export const metadata = {
  title: SITE_NAME,
  description: SITE_NAME,
  openGraph: {
    type: 'website'
  }
};

export default async function PrivacyPage({
  params: { locale }
}: {
  params: { locale?: SupportedLocale };
}) {
  if (!!locale) {
    unstable_setRequestLocale(locale);
  }

  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  const promotedItem: Product | undefined = await getProduct({
    handle: 'gift-bag-and-postcard-set',
    language: getShopifyLocale({ locale })
  });

  return (
    <div>
      <Navbar cart={cart} locale={locale} compact promotedItem={promotedItem} />
      <Suspense fallback={null}>
        <div className="py-24 md:py-48">
          <PrivacyPolicy />
        </div>
      </Suspense>

      <Footer cart={cart} />
    </div>
  );
}
