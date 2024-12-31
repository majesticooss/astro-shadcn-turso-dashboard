import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useListOrganizations } from "@/lib/authClient";
import { CaretSortIcon, PlusIcon } from "@radix-ui/react-icons";
import * as React from "react";

export function OrganizationSwitcher() {
	const { isMobile } = useSidebar();
	const { data: organizations = [] } = useListOrganizations();
	const [activeOrganization, setActiveOrganization] = React.useState(
		organizations?.length > 0 ? organizations[0] : null,
	);

	React.useEffect(() => {
		if (!activeOrganization && organizations?.length > 0) {
			setActiveOrganization(organizations[0]);
		}
	}, [organizations, activeOrganization]);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								{activeOrganization?.logo ? (
									<activeOrganization.logo className="size-4" />
								) : (
									<PlusIcon className="size-4" />
								)}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{activeOrganization?.name ?? "Create Team"}
								</span>
								<span className="truncate text-xs">
									{activeOrganization?.plan ?? "Get started"}
								</span>
							</div>
							<CaretSortIcon className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						{organizations?.length > 0 && (
							<>
								<DropdownMenuLabel className="text-xs text-muted-foreground">
									Teams
								</DropdownMenuLabel>
								{organizations?.map((organization: any, index: number) => (
									<DropdownMenuItem
										key={organization.name}
										onClick={() => setActiveOrganization(organization)}
										className="gap-2 p-2"
									>
										<div className="flex size-6 items-center justify-center rounded-sm border">
											<organization.logo className="size-4 shrink-0" />
										</div>
										{organization.name}
										<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
							</>
						)}
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-background">
								<PlusIcon className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">
								{organizations?.length > 0
									? "Add team"
									: "Create your first team"}
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
