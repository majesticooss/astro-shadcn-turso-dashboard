import type { SidebarNavItem, SiteConfig } from "@/env";

export const siteDomain = "admin.novafy.app";
export const siteUrl = `https://${siteDomain}`;

export const siteConfig: SiteConfig = {
	name: "Next Starter",
	description:
		"Get your project off to an explosive start with Auth & User Roles! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui to build your next big thing.",
	url: siteUrl,
	ogImage: `${siteUrl}/_static/og.jpg`,
	links: {
		twitter: "https://twitter.com/miickasmt",
		github: "https://github.com/mickasmt/next-auth-roles-template",
	},
	mailSupport: "support@next-starter.fake",
};

export const sidebarLinks: SidebarNavItem[] = [
	{
		title: "MENU",
		items: [
			{
				href: "/admin",
				icon: "laptop",
				title: "Admin Panel",
				authorizeOnly: "admin",
			},
			{ href: "/dashboard", icon: "dashboard", title: "Dashboard" },
			{ href: "/dashboard/charts", icon: "lineChart", title: "Charts" },
			{
				href: "/admin/orders",
				icon: "package",
				title: "Orders",
				badge: 2,
				authorizeOnly: "admin",
			},
			{
				href: "#/dashboard/posts",
				icon: "post",
				title: "User Posts",
				authorizeOnly: "user",
				disabled: true,
			},
		],
	},
	{
		title: "OPTIONS",
		items: [
			{ href: "/dashboard/settings", icon: "settings", title: "Settings" },
			{ href: "/", icon: "home", title: "Homepage" },
			{ href: "/docs", icon: "bookOpen", title: "Documentation" },
			{
				href: "#",
				icon: "messages",
				title: "Support",
				authorizeOnly: "admin",
				disabled: true,
			},
		],
	},
];
