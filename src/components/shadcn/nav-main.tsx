"use client";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export function NavMain({
	items,
}: {
	items: NavItemWithSubItems[];
}) {
	return (
		<>
			{items.map((section) => (
				<SidebarGroup key={section.title}>
					<SidebarGroupLabel>{section.title}</SidebarGroupLabel>
					<SidebarMenu>
						{section.items?.map((item) => {
							if (!item.items?.length) {
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild tooltip={item.title}>
											<a href={item.href}>
												{item.icon && <item.icon />}
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							}

							return (
								<Collapsible
									key={item.title}
									asChild
									defaultOpen={item.isActive}
									className="group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton tooltip={item.title}>
												{item.icon && <item.icon />}
												<span>{item.title}</span>
												<ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton asChild>
															<a href={subItem.href}>
																<span>{subItem.title}</span>
															</a>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	);
}
