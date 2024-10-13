import Footer from "components/layout/footer";
import type { SupportedLocale } from "components/layout/navbar/language-control";

import Navbar from "components/layout/navbar";
import { getShopifyLocale } from "lib/locales";
import { getCart, getPage, getProduct } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { Suspense } from "react";
import AboutNaraiDetail from "./about-narai-detail";

const { SITE_NAME } = process.env;

export const metadata = {
	title: SITE_NAME,
	description: SITE_NAME,
	openGraph: {
		type: "website",
	},
};

export default async function Page({
	params,
}: { params: { locale?: SupportedLocale } }) {
	if (!!params?.locale) {
		unstable_setRequestLocale(params.locale);
	}

	const cartId = cookies().get("cartId")?.value;
	let cart;

	if (cartId) {
		cart = await getCart(cartId);
	}

	const promotedItem: Product | undefined = await getProduct({
		handle: "gift-bag-and-postcard-set",
		language: getShopifyLocale({ locale: params?.locale }),
	});

	const awardsPage = await getPage({
		handle: "awards",
		language: getShopifyLocale({ locale: params?.locale }),
	});

	return (
		<div>
			<Navbar
				cart={cart}
				locale={params?.locale}
				compact
				promotedItem={promotedItem}
			/>
			<Suspense fallback={null}>
				<div className="pt-24 md:pt-32">
					<AboutNaraiDetail awards={awardsPage.body} />
				</div>
			</Suspense>

			<Footer cart={cart} />
		</div>
	);
}
