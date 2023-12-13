import { SupportedLocale } from 'components/layout/navbar/language-control';
import OpengraphImage from 'components/opengraph-image';
import { getShopifyLocale } from 'lib/locales';
import { getPage } from 'lib/shopify';

export default async function Image({
  params
}: {
  params: { page: string; locale?: SupportedLocale };
}) {
  const page = await getPage({
    handle: params.page,
    language: getShopifyLocale({ locale: params?.locale })
  });
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
