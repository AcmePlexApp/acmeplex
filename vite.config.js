import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isDev = mode === "development";
	return {
		plugins: [react(), eslint()],
		base: isDev ? "/" : "/acmeplex/",
		build: {
			outDir: "dist",
			assetsDir: "assets",
		},
		server: {
			headers: {
				"Cross-Origin-Opener-Policy": "same-origin-allow-popups", // Allow window interactions
			},
		},
	};
});
