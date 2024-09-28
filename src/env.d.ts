/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { Session, User } from "lucia";

declare global {
	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}

export type SiteConfig = {
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

export type NavItem = {
	title: string;
	href: string;
	badge?: number;
	disabled?: boolean;
	external?: boolean;
	authorizeOnly?: UserRole;
	icon?: keyof typeof Icons;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
	mainNav: MainNavItem[];
};

export type SidebarNavItem = {
	title: string;
	items: NavItem[];
	authorizeOnly?: UserRole;
	icon?: keyof typeof Icons;
};

export type DocsConfig = {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
};
