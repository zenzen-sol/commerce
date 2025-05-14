import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { InlineAddToCart } from "components/cart/inline-add-to-cart";
import Price from "components/price";
import { getShopifyLocale } from "lib/locales";
import { getCollectionProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Link from "next/link";
import Label from "../label";
import { GridTileImage } from "./tile";

function HomepageProductsItem({
	item,
	priority,
}: { item: Product; priority?: boolean }) {
	const size = item?.variants?.[0]?.selectedOptions?.find(
		(option) => option.name === "Size",
	);
	const image = item?.variants?.[0]?.image;

	return image ? (
		<div
			className={clsx(
				"col-span-1 row-span-1 flex flex-col justify-between space-y-6 pb-24 md:col-span-2 md:row-span-1 md:pb-0",
			)}
		>
			<Link className="group block w-full" href={`/product/${item.handle}`}>
				<span className="relative block aspect-tall overflow-hidden">
					<GridTileImage
						src={image?.url}
						fill
						sizes={"(min-width: 768px) 33vw, 100vw"}
						priority={priority}
						alt={item.title}
					/>
				</span>
				<span className="font-multilingual block max-w-sm pb-0 pt-4">
					<Label
						title={item.title as string}
						amount={item.priceRange.maxVariantPrice.amount}
						currencyCode={item.priceRange.maxVariantPrice.currencyCode}
						size={size?.value}
					/>
					<span className="pt-2 font-extralight">
						<span>{item?.summary?.value}</span>{" "}
						<span className="ml-2 inline-flex flex-row items-center space-x-1 opacity-50 transition-opacity duration-150 group-hover:opacity-100">
							<span>read more.</span>
							<span>
								<ChevronRightIcon width={16} />
							</span>
						</span>
					</span>
				</span>
			</Link>
			<InlineAddToCart
				variants={item.variants}
				availableForSale={item.availableForSale}
			/>
		</div>
	) : null;
}

function HomepagePromoItem({
	item,
	priority,
}: { item: Product; priority?: boolean }) {
	const size = item?.variants?.[0]?.selectedOptions?.find(
		(option) => option.name === "Size",
	);
	const image = item?.variants?.[0]?.image;

	return image ? (
		<div className="pt-24">
			<Link className="group block w-full" href={`/product/${item.handle}`}>
				<span className="relative block aspect-[16/9] overflow-hidden">
					<GridTileImage
						src={image?.url}
						fill
						priority={priority}
						alt={item.title}
					/>
				</span>
			</Link>

			<div className="gap-6 pt-6 md:flex md:flex-row">
				<div
					className={clsx(
						"col-span-1 row-span-1 flex flex-col justify-between space-y-6 md:w-1/2 w-full",
					)}
				>
					<div className="font-multilingual block pb-0">
						<div className={clsx("@container/label")}>
							<div className="flex flex-col space-y-2">
								<h3 className="mr-4 line-clamp-4 grow font-serif text-[28px] leading-tight tracking-wider md:text-[28px]">
									{item.title as string}
								</h3>
								<div className="font-multilingual flex flex-row items-center space-x-2 text-[14px] font-normal">
									<Price
										className="flex-none"
										amount={item.priceRange.maxVariantPrice.amount}
										currencyCode={item.priceRange.maxVariantPrice.currencyCode}
										currencyCodeClassName="hidden @[275px]/label:inline"
									/>
									{!!size && (
										<>
											<div>/</div>
											<div>{size?.value}</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full space-y-6 pt-6 md:w-1/2 md:pt-0">
					<InlineAddToCart
						variants={item.variants}
						availableForSale={item.availableForSale}
					/>
					<div className="font-multilingual block space-y-2 font-extralight">
						<div>{item?.summary?.value}</div>
						<div className="inline-flex flex-row items-center space-x-1 opacity-50 transition-opacity duration-150 group-hover:opacity-100">
							<div>Read more.</div>
							<div>
								<ChevronRightIcon width={16} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : null;
}

export async function HomepageProducts({ lang }: { lang?: string }) {
	// Collections that start with `hidden-*` are hidden from the search page.
	const homepageItems = await getCollectionProducts({
		collection: "hidden-homepage-featured-items",
		language: getShopifyLocale({ locale: lang }),
	});

	const promotionalItems = await getCollectionProducts({
		collection: "hidden-homepage-promotional-item",
		language: getShopifyLocale({ locale: lang }),
	});

	if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

	const [firstProduct, secondProduct, thirdProduct] = homepageItems;

	const [promotionalProduct] = promotionalItems;

	return (
		<section className="space-y-12">
			<section
				className={clsx(
					"mx-auto grid max-w-screen-xl gap-12 px-4 pb-4 ",
					"grid-cols-1 md:grid-cols-6",
					"grid-rows-3 md:grid-rows-1",
				)}
			>
				<HomepageProductsItem item={firstProduct} priority={true} />
				<HomepageProductsItem item={secondProduct} priority={true} />
				<HomepageProductsItem item={thirdProduct} priority={true} />
			</section>
			{promotionalProduct && (
				<section className={clsx("mx-auto grid max-w-screen-lg px-4 pb-4")}>
					<HomepagePromoItem item={promotionalProduct} priority={true} />
				</section>
			)}
		</section>
	);
}
