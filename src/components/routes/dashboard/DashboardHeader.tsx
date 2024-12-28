"use client";

import { SearchCommand } from "@/components/core/SearchCommand";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
	return (
		<header className="flex h-16 shrink-0 items-center overflow-hidden transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex flex-1 items-center gap-2 px-4 min-w-0 overflow-hidden">
				<SidebarTrigger className="-ml-1 shrink-0" />
				<Separator orientation="vertical" className="mr-2 h-4 shrink-0" />
				<Breadcrumb className="min-w-0 flex-1 overflow-hidden">
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href="#" className="truncate">
								Building Your Application
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="hidden md:block shrink-0" />
						<BreadcrumbItem>
							<BreadcrumbPage className="truncate">
								Data Fetching
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="px-4 shrink-0">
				<SearchCommand />
			</div>
		</header>
	);
}
