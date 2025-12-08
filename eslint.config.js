const { defineConfig, globalIgnores } = require("eslint/config");
const nextConfig = require("eslint-config-next");
const unicorn = require("eslint-plugin-unicorn");
const tailwindcss = require("eslint-plugin-tailwindcss");
const unusedImports = require("eslint-plugin-unused-imports");

const eslintConfig = defineConfig([
	...nextConfig,
	...tailwindcss.configs["flat/recommended"],
	{
		plugins: {
			unicorn,
			"unused-imports": unusedImports,
		},
		rules: {
			"no-unused-vars": [
				"error",
				{
					args: "after-used",
					caughtErrors: "none",
					ignoreRestSiblings: true,
					vars: "all",
				},
			],
			"prefer-const": "error",
			"react-hooks/exhaustive-deps": "error",
			"unicorn/filename-case": [
				"error",
				{
					case: "kebabCase",
				},
			],
			"@typescript-eslint/no-unused-vars": "off",
			"unused-imports/no-unused-imports": "error",
			"no-template-curly-in-string": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
		},
		settings: {
			tailwindcss: {
				config: "./tailwind.config.js",
				callees: ["cx"],
			},
		},
	},
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

module.exports = eslintConfig;
