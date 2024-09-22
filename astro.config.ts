import cloudflare from "@astrojs/cloudflare";
import db from "@astrojs/db";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { siteUrl } from "./dashboard.config";

export default defineConfig({
	site: siteUrl,
	output: "server",
	adapter: cloudflare({
		imageService: "compile",
	}),
	compressHTML: true,
	vite: {
		optimizeDeps: {
			exclude: ["astro:db"],
		},
	},
	integrations: [
		react(),
		tailwind({
			applyBaseStyles: false,
		}),
		db(),
	],
});
