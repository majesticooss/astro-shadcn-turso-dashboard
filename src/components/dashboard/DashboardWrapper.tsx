"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AppSidebar } from "@/components/structure/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface DashboardWrapperProps {
	links: SidebarNavItem[];
	currentPath?: string;
	children: React.ReactNode;
}

export function DashboardWrapper({
	links,
	currentPath,
	children,
}: DashboardWrapperProps) {
	return (
		<SidebarProvider>
			<AppSidebar links={links} currentPath={currentPath} />
			<SidebarInset>
				<DashboardHeader />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
