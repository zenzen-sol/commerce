import "server-only";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
	ja: () => import("./ja.json").then((module) => module.default),
	en: () => import("./en.json").then((module) => module.default),
	zh: () => import("./zh.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) =>
	dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.ja();
