"use client";

import { Frame, type LucideIcon, Map, PieChart } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

// Example data
const exampleData = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/01.png",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
	],
};

interface AppSidebarProps {
	links: SidebarNavItem[];
	currentPath?: string;
}

export function AppSidebar({ links, currentPath }: AppSidebarProps) {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<TeamSwitcher teams={exampleData.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={links} />
				<NavProjects projects={exampleData.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={exampleData.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
