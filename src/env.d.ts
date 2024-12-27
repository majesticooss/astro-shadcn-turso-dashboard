/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { Icons } from "@/components/ui/icons";

declare global {
	type User = {
		id: string;
		email: string;
	};

	namespace App {
		interface Locals {
			session: {
				user: User | null;
			} | null;
		}
	}

	type SiteConfig = {
		name: string;
		description: string;
		url: string;
		ogImage: string;
		mailSupport: string;
		links: {
			twitter: string;
			github: string;
		};
	};

	type NavItem = {
		title: string;
		href: string;
		badge?: number;
		disabled?: boolean;
		external?: boolean;
		authorizeOnly?: UserRole;
		icon?: keyof typeof Icons;
	};

	type MainNavItem = NavItem;

	type MarketingConfig = {
		mainNav: MainNavItem[];
	};

	type SidebarNavItem = {
		title: string;
		items: NavItem[];
		authorizeOnly?: UserRole;
		icon?: keyof typeof Icons;
	};

	type DocsConfig = {
		mainNav: MainNavItem[];
		sidebarNav: SidebarNavItem[];
	};

	type UserRole = "admin" | "user";
}

interface ImportMetaEnv {
	readonly ASTRO_DB_REMOTE_URL: string;
	readonly ASTRO_DB_APP_TOKEN: string;
	readonly BETTER_AUTH_SECRET: string;
	readonly BETTER_AUTH_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
