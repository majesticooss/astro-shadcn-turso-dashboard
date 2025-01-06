import type * as React from "react";

import { NavMain } from "@/components/shadcn/nav-main";
import { NavUser } from "@/components/shadcn/nav-user";
import { OrganizationSwitcher } from "@/components/shadcn/organization-switcher";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarProvider,
	SidebarRail,
} from "@/components/ui/sidebar";
import { dashboardNavigation } from "config";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<SidebarProvider>
			<Sidebar collapsible="icon" {...props}>
				<SidebarHeader>
					<OrganizationSwitcher
						currentOrganization={props.currentOrganization}
					/>
				</SidebarHeader>
				<SidebarContent>
					<ScrollArea className="h-full">
						<NavMain items={dashboardNavigation} />
					</ScrollArea>
				</SidebarContent>
				<SidebarFooter>
					<NavUser user={props.currentUser} />
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
		</SidebarProvider>
	);
}
