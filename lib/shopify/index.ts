import {
	HIDDEN_PRODUCT_TAG,
	SHOPIFY_GRAPHQL_STOREFRONT_API_ENDPOINT,
	TAGS,
} from "lib/constants";
import { isShopifyError } from "lib/type-guards";
import { ensureStartsWith } from "lib/utils";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
	addToCartMutation,
	createCartMutation,
	editCartItemsMutation,
	removeFromCartMutation,
} from "./mutations/cart";
import { getBlogArticleQuery, getBlogQuery } from "./queries/blog";
import { getCartQuery } from "./queries/cart";
import {
	getCollectionProductsQuery,
	getCollectionQuery,
	getCollectionsQuery,
} from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import {
	getProductQuery,
	getProductRecommendationsQuery,
	getProductsQuery,
} from "./queries/product";
import type {
	Blog,
	BlogArticle,
	Cart,
	Collection,
	Connection,
	Image,
	Menu,
	Page,
	Product,
	ShopifyAddToCartOperation,
	ShopifyBlog,
	ShopifyBlogArticleOperation,
	ShopifyBlogOperation,
	ShopifyCart,
	ShopifyCartOperation,
	ShopifyCollection,
	ShopifyCollectionOperation,
	ShopifyCollectionProductsOperation,
	ShopifyCollectionsOperation,
	ShopifyCreateCartOperation,
	ShopifyMenuOperation,
	ShopifyPageOperation,
	ShopifyPagesOperation,
	ShopifyProduct,
	ShopifyProductOperation,
	ShopifyProductRecommendationsOperation,
	ShopifyProductsOperation,
	ShopifyRemoveFromCartOperation,
	ShopifyUpdateCartOperation,
} from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN
	? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
	: "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_STOREFRONT_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
	? T["variables"]
	: never;

export async function shopifyFetch<T>({
	cache = "force-cache",
	headers,
	query,
	tags,
	variables,
}: {
	cache?: RequestCache;
	headers?: HeadersInit;
	query: string;
	tags?: string[];
	variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
	try {
		const result = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Shopify-Storefront-Access-Token": key,
				...headers,
			},
			body: JSON.stringify({
				...(query && { query }),
				...(variables && { variables }),
			}),
			cache,
			...(tags && { next: { tags } }),
		});

		const body = await result.json();

		if (body.errors) {
			throw body.errors[0];
		}

		return {
			status: result.status,
			body,
		};
	} catch (e) {
		if (isShopifyError(e)) {
			throw {
				cause: e.cause?.toString() || "unknown",
				status: e.status || 500,
				message: e.message,
				query,
			};
		}

		throw {
			error: e,
			query,
		};
	}
}

const removeEdgesAndNodes = (array: Connection<any>) => {
	return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
	if (!cart.cost?.totalTaxAmount) {
		cart.cost.totalTaxAmount = {
			amount: "0.0",
			currencyCode: "USD",
		};
	}

	return {
		...cart,
		lines: removeEdgesAndNodes(cart.lines),
	};
};

const reshapeCollection = (
	collection: ShopifyCollection,
): Collection | undefined => {
	if (!collection) {
		return undefined;
	}

	return {
		...collection,
		path: `/search/${collection.handle}`,
	};
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
	const reshapedCollections = [];

	for (const collection of collections) {
		if (collection) {
			const reshapedCollection = reshapeCollection(collection);

			if (reshapedCollection) {
				reshapedCollections.push(reshapedCollection);
			}
		}
	}

	return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
	const flattened = removeEdgesAndNodes(images);

	return flattened.map((image) => {
		const filename = image.url.match(/.*\/(.*)\..*/)[1];
		return {
			...image,
			altText: image.altText || `${productTitle} - ${filename}`,
		};
	});
};

const reshapeBlog = (blog: ShopifyBlog) => {
	if (!blog) {
		return undefined;
	}

	const { articles, ...rest } = blog;

	return {
		...rest,
		articles: removeEdgesAndNodes(articles),
	};
};

const reshapeProduct = (
	product: ShopifyProduct,
	filterHiddenProducts = true,
) => {
	if (
		!product ||
		(filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
	) {
		return undefined;
	}

	const { images, variants, ...rest } = product;

	return {
		...rest,
		images: reshapeImages(images, product.title),
		variants: removeEdgesAndNodes(variants),
	};
};

const reshapeProducts = (products: ShopifyProduct[]) => {
	const reshapedProducts = [];

	for (const product of products) {
		if (product) {
			const reshapedProduct = reshapeProduct(product);

			if (reshapedProduct) {
				reshapedProducts.push(reshapedProduct);
			}
		}
	}

	return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
	const res = await shopifyFetch<ShopifyCreateCartOperation>({
		query: createCartMutation,
		cache: "no-store",
	});

	return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
	cartId: string,
	lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyAddToCartOperation>({
		query: addToCartMutation,
		variables: {
			cartId,
			lines,
		},
		cache: "no-store",
	});
	return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(
	cartId: string,
	lineIds: string[],
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
		query: removeFromCartMutation,
		variables: {
			cartId,
			lineIds,
		},
		cache: "no-store",
	});

	return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
	cartId: string,
	lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyUpdateCartOperation>({
		query: editCartItemsMutation,
		variables: {
			cartId,
			lines,
		},
		cache: "no-store",
	});

	return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
	const res = await shopifyFetch<ShopifyCartOperation>({
		query: getCartQuery,
		variables: { cartId },
		tags: [TAGS.cart],
		cache: "no-store",
	});

	// Old carts becomes `null` when you checkout.
	if (!res.body.data.cart) {
		return undefined;
	}

	return reshapeCart(res.body.data.cart);
}

export async function getCollection({
	handle,
	language,
	country,
}: {
	handle: string;
	language?: string;
	country?: string;
}): Promise<Collection | undefined> {
	const res = await shopifyFetch<ShopifyCollectionOperation>({
		query: getCollectionQuery,
		tags: [TAGS.collections],
		variables: {
			handle,
			language,
			country,
		},
	});

	return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
	collection,
	reverse,
	sortKey,
	language,
	country,
}: {
	collection: string;
	reverse?: boolean;
	sortKey?: string;
	language?: string;
	country?: string;
}): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
		query: getCollectionProductsQuery,
		tags: [TAGS.collections, TAGS.products],
		variables: {
			handle: collection,
			reverse,
			sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
			language: language,
			country: country,
		},
	});

	if (!res.body.data.collection) {
		console.log(`No collection found for \`${collection}\``);
		return [];
	}

	return reshapeProducts(
		removeEdgesAndNodes(res.body.data.collection.products),
	);
}

export async function getCollections(): Promise<Collection[]> {
	const res = await shopifyFetch<ShopifyCollectionsOperation>({
		query: getCollectionsQuery,
		tags: [TAGS.collections],
	});
	const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
	const collections = [
		{
			handle: "",
			title: "All",
			description: "All products",
			seo: {
				title: "All",
				description: "All products",
			},
			path: "/search",
			updatedAt: new Date().toISOString(),
		},
		// Filter out the `hidden` collections.
		// Collections that start with `hidden-*` need to be hidden on the search page.
		...reshapeCollections(shopifyCollections).filter(
			(collection) => !collection.handle.startsWith("hidden"),
		),
	];

	return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
	const res = await shopifyFetch<ShopifyMenuOperation>({
		query: getMenuQuery,
		tags: [TAGS.collections],
		variables: {
			handle,
		},
	});

	return (
		res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
			title: item.title,
			path: item.url
				.replace(domain, "")
				.replace("/collections", "/search")
				.replace("/pages", ""),
		})) || []
	);
}

export async function getPage({
	handle,
	language,
	country,
}: {
	handle: string;
	language?: string;
	country?: string;
}): Promise<Page> {
	const res = await shopifyFetch<ShopifyPageOperation>({
		query: getPageQuery,
		cache: "no-store",
		variables: { handle, language, country },
	});

	return res.body.data.pageByHandle;
}

export async function getPages({
	language,
	country,
}: {
	language?: string;
	country?: string;
}): Promise<Page[]> {
	const res = await shopifyFetch<ShopifyPagesOperation>({
		query: getPagesQuery,
		cache: "no-store",
		variables: { language, country },
	});

	return removeEdgesAndNodes(res.body.data.pages);
}

export async function getBlog({
	handle,
	articles,
	language,
	country,
}: {
	handle: string;
	articles?: number;
	language?: string;
	country?: string;
}): Promise<Blog | undefined> {
	const res = await shopifyFetch<ShopifyBlogOperation>({
		query: getBlogQuery,
		variables: { handle, articles, language, country },
	});

	return reshapeBlog(res.body.data.blogByHandle);
}

export async function getBlogArticle({
	handle,
	articleHandle,
	language,
	country,
}: {
	handle: string;
	articleHandle: string;
	language?: string;
	country?: string;
}): Promise<BlogArticle | undefined> {
	const res = await shopifyFetch<ShopifyBlogArticleOperation>({
		query: getBlogArticleQuery,
		variables: { handle, articleHandle, language, country },
	});

	return res.body.data.blogByHandle.articleByHandle;
}

export async function getProduct({
	handle,
	language,
	country,
}: {
	handle: string;
	language?: string;
	country?: string;
}): Promise<Product | undefined> {
	const res = await shopifyFetch<ShopifyProductOperation>({
		query: getProductQuery,
		tags: [TAGS.products],
		variables: {
			handle,
			language,
			country,
		},
	});

	return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations({
	productId,
	language,
	country,
}: {
	productId: string;
	language?: string;
	country?: string;
}): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
		query: getProductRecommendationsQuery,
		tags: [TAGS.products],
		variables: {
			productId,
			language,
			country,
		},
	});

	return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
	query,
	reverse,
	sortKey,
	language,
	country,
}: {
	query?: string;
	reverse?: boolean;
	sortKey?: string;
	language?: string;
	country?: string;
}): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyProductsOperation>({
		query: getProductsQuery,
		tags: [TAGS.products],
		variables: {
			query,
			reverse,
			sortKey,
			language,
			country,
		},
	});

	return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
	// We always need to respond with a 200 status code to Shopify,
	// otherwise it will continue to retry the request.
	const collectionWebhooks = [
		"collections/create",
		"collections/delete",
		"collections/update",
	];
	const productWebhooks = [
		"products/create",
		"products/delete",
		"products/update",
	];
	const topic = (await headers()).get("x-shopify-topic") || "unknown";
	const secret = req.nextUrl.searchParams.get("secret");
	const envSecret = process.env.SHOPIFY_REVALIDATION_SECRET;

	console.log(`[Revalidate] Received webhook for topic: ${topic}`);
	console.log(
		`[Revalidate] Secret from query: ${secret ? secret.substring(0, 4) + "..." : "Not Provided"}`,
	); // Log a portion for verification
	console.log(
		`[Revalidate] SHOPIFY_REVALIDATION_SECRET from env: ${envSecret ? "Exists" : "MISSING!"}`,
	);

	const isCollectionUpdate = collectionWebhooks.includes(topic);
	const isProductUpdate = productWebhooks.includes(topic);

	if (!secret || secret !== envSecret) {
		console.error(
			`[Revalidate] Invalid revalidation secret. Topic: ${topic}. Provided secret: ${secret ? secret.substring(0, 4) + "..." : "None"}. Matches env var: ${secret === envSecret}`,
		);
		// Still return 200 to Shopify, but log the error clearly.
		return NextResponse.json({
			status: 200,
			revalidated: false,
			error: "Invalid revalidation secret.",
		});
	}

	if (!isCollectionUpdate && !isProductUpdate) {
		console.log(`[Revalidate] No revalidation needed for topic: ${topic}`);
		return NextResponse.json({
			status: 200,
			revalidated: false,
			message: "No revalidation needed for this topic.",
		});
	}

	let revalidatedSomething = false;
	if (isCollectionUpdate) {
		console.log(
			`[Revalidate] Revalidating TAGS.collections for topic: ${topic}`,
		);
		revalidateTag(TAGS.collections);
		console.log(
			`[Revalidate] Revalidating TAGS.products for collection update topic: ${topic}`,
		);
		revalidateTag(TAGS.products);
		revalidatedSomething = true;
	}

	if (isProductUpdate) {
		console.log(`[Revalidate] Revalidating TAGS.products for topic: ${topic}`);
		revalidateTag(TAGS.products);
		console.log(
			`[Revalidate] Revalidating TAGS.collections for product update topic: ${topic}`,
		);
		revalidateTag(TAGS.collections);
		revalidatedSomething = true;
	}

	if (revalidatedSomething) {
		console.log(`[Revalidate] Revalidation successful for topic: ${topic}`);
		return NextResponse.json({
			status: 200,
			revalidated: true,
			now: Date.now(),
		});
	} // Should not happen if isCollectionUpdate or isProductUpdate is true, but as a fallback.
	console.log(
		`[Revalidate] No specific tags revalidated for topic: ${topic}, though it matched a webhook type.`,
	);
	return NextResponse.json({
		status: 200,
		revalidated: false,
		message: "No specific tags revalidated.",
	});
}
