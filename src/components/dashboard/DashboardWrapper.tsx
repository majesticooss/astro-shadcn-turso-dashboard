"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AppSidebar } from "@/components/shadcn/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

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
			<AppSidebar />
			<SidebarInset>
				<DashboardHeader />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
