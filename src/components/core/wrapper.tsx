"use client";

import { DashboardHeader } from "@/components/core/header";
import { AppSidebar } from "@/components/shadcn/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardWrapperProps {
	currentPath?: string;
	currentOrganization?: OrganizationAndMember | null;
	currentUser?: User | null;
	title?: string;
	children: React.ReactNode;
}

export function DashboardWrapper({
	currentPath,
	currentOrganization,
	currentUser,
	children,
	title,
}: DashboardWrapperProps) {
	return (
		<SidebarProvider>
			<AppSidebar
				currentOrganization={currentOrganization}
				currentUser={currentUser}
			/>
			<SidebarInset>
				<DashboardHeader title={title} />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
