/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { Icons } from "@/components/ui/icons";

declare global {
	type User = import("better-auth").User;
	type Session = import("better-auth").Session;

	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}

	type SiteConfig = {
		name: string;
		description: string;
		url: string;
		ogImage: string;
		mailSupport: string;
		author: string;
		themeColor: string;
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
	readonly APP_NAME: string;
	readonly APP_ORGANIZATION: string;
	readonly APP_PRIMARY_LOCATION: string;
	readonly APP_GROUP: string;
	readonly RESEND_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
