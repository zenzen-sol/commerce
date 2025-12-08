import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.shopify.com",
				pathname: "/s/files/**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/password",
				destination: "/",
				permanent: true,
			},
		];
	},
};
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);
