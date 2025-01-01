import type * as React from "react";

import { NavMain } from "@/components/shadcn/nav-main";
import { NavProjects } from "@/components/shadcn/nav-projects";
import { NavUser } from "@/components/shadcn/nav-user";
import { OrganizationSwitcher } from "@/components/shadcn/organization-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { dashboardConfig } from "config";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<OrganizationSwitcher currentOrganization={props.currentOrganization} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={dashboardConfig.mainNav} />
				<NavProjects projects={dashboardConfig.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={props.currentUser} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
