import fluid, { extract, screens, fontSize } from "fluid-tailwind";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
	darkMode: ["class"],
	content: {
		files: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
		extract,
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		...screens,
		...fontSize,
		container: {
			center: true,
			padding: ".8rem",
		},
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			fontFamily: {
				sans: ["Inter", "Inter-fallback", ...defaultTheme.fontFamily.sans],
				heading: ["CalSans-SemiBold", ...defaultTheme.fontFamily.sans],
				satoshi: ["Satoshi", ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				"fade-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)",
					},
					"80%": {
						opacity: "0.7",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0px)",
					},
				},
				"fade-down": {
					"0%": {
						opacity: "0",
						transform: "translateY(-10px)",
					},
					"80%": {
						opacity: "0.6",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0px)",
					},
				},
				"fade-in": {
					"0%": {
						opacity: "0",
					},
					"50%": {
						opacity: "0.6",
					},
					"100%": {
						opacity: "1",
					},
				},
				"fade-out": {
					"0%": {
						opacity: "0",
					},
					"50%": {
						opacity: "0.6",
					},
					"100%": {
						opacity: "1",
					},
				},
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-up": "fade-up 0.5s",
				"fade-down": "fade-down 0.5s",
				"fade-in": "fade-in 0.4s",
				"fade-out": "fade-out 0.4s",
			},
		},
	},
	plugins: [
		animate,
		fluid({
			checkSC144: false,
		}),
	],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};

export default config;
