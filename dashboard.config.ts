import {
	Book,
	Bot,
	Frame,
	Map as MapIcon,
	PieChart,
	Settings,
	Terminal
} from "lucide-react";

export const siteDomain = "admin.novafy.app";
export const siteUrl = `https://${siteDomain}`;

export const mailConfig = {
	from: "noreply@mail.majestico.co",
}

export const authConfig: AuthConfig = {
	callbackURL: "/dashboard",
}

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
	author: "Majestico",
	themeColor: "#ffffff",
};

export const dashboardConfig: DashboardConfig = {
	mainNav: [
		{
			title: "Dashboard",
			href: "/dashboard",
			icon: Terminal,
			isActive: true,
		},
		{
			title: "Models",
			href: "#",
			icon: Bot,
			items: [
				{
					title: "Genesis",
					href: "#",
				},
				{
					title: "Explorer",
					href: "#",
				},
				{
					title: "Quantum",
					href: "#",
				},
			],
		},
		{
			title: "Documentation",
			href: "#",
			icon: Book,
			items: [
				{
					title: "Introduction",
					href: "#",
				},
				{
					title: "Get Started",
					href: "#",
				},
				{
					title: "Tutorials",
					href: "#",
				},
				{
					title: "Changelog",
					href: "#",
				},
			],
		},
		{
			title: "Settings",
			icon: Settings,
			items: [
				{
					title: "General",
					href: "/settings",
				},
				{
					title: "Team",
					href: "#",
				},
				{
					title: "Billing",
					href: "#",
				},
				{
					title: "Limits",
					href: "#",
				},
			],
		},
	],
	projects: [
		{
			name: "Design Engineering",
			href: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			href: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			href: "#",
			icon: MapIcon,
		},
	],
};
