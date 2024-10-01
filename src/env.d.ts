/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { Icons } from "@/components/ui/icons";
import type { Session as LuciaSession, User as LuciaUser } from "lucia";

declare global {
	type User = typeof LuciaUser;
	type Session = typeof LuciaSession;

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
}

type UserRole = "admin" | "user";
