import { defineConfig, defaultPlugins } from "@hey-api/openapi-ts";

export default defineConfig({
	input: "http://localhost:5052/swagger/v1/swagger.json",
	output: { path: "src/api", format: "prettier", lint: "eslint" },
	plugins: [
		...defaultPlugins,
		"@hey-api/client-next",
		"@tanstack/react-query",
		"zod",
		{ name: "@hey-api/typescript", enums: "javascript" },
		{ name: "@hey-api/sdk", asClass: true, validator: true },
		{
			name: "@hey-api/client-next",
			runtimeConfigPath: "./src/open-api.ts",
		},
	],
});
