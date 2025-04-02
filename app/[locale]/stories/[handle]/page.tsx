import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Prose from "components/prose";
import { BLOG_HANDLE, HIDDEN_ARTICLE_TAG } from "lib/constants";
import { getShopifyLocale } from "lib/locales";
import { getBlogArticle } from "lib/shopify";
import type { BlogArticle } from "lib/shopify/types";
import { getLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata(props: {
	params: Promise<{ handle: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const locale = await getLocale();
	const article: BlogArticle | undefined = await getBlogArticle({
		handle: BLOG_HANDLE,
		articleHandle: params.handle,
		language: getShopifyLocale({ locale }),
	});

	if (!article) return {};

	const { url, width, height, altText: alt } = article.image || {};
	const indexable = !article?.tags?.includes(HIDDEN_ARTICLE_TAG);

	return {
		title: article?.seo?.title || article?.title,
		description: article?.seo?.description || article?.excerpt,
		robots: {
			index: indexable,
			follow: indexable,
			googleBot: {
				index: indexable,
				follow: indexable,
			},
		},
		openGraph: url
			? {
					images: [
						{
							url,
							width,
							height,
							alt,
						},
					],
				}
			: null,
	};
}

export default async function BlogArticlePage(props: {
	params: Promise<{ handle: string }>;
}) {
	const params = await props.params;
	const locale = await getLocale();

	const article: BlogArticle | undefined = await getBlogArticle({
		handle: BLOG_HANDLE,
		articleHandle: params.handle,
		language: getShopifyLocale({ locale }),
	});

	if (!article) notFound();

	return (
		<>
			<div className="mx-auto max-w-screen-xl py-24">
				<div className="flex flex-col space-y-12">
					{!!article?.image && (
						<div className="relative aspect-square h-full w-full">
							<Image
								src={article?.image?.url}
								alt={article?.image?.altText}
								height={article?.image.height}
								width={article?.image.width}
								className="h-full w-full object-cover"
								priority={true}
							/>
						</div>
					)}

					<div className="flex flex-col space-y-6 px-6 md:flex-row md:space-x-6 md:space-y-0">
						<div className="md:w-1/2">
							<h1 className="font-multilingual mb-2 text-5xl leading-normal">
								{article.title}
							</h1>
						</div>
						<div className="md:w-1/2">
							<div className="flex flex-col space-y-6">
								<Prose html={article.contentHtml} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
