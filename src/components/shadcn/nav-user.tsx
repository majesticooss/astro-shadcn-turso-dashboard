"use client";

import { navigate } from "astro:transitions/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { signOut } from "@/lib/authClient";
import { CaretSortIcon, ComponentPlaceholderIcon } from "@radix-ui/react-icons";
import { BadgeCheck, Bell, LogOut, Moon, Sparkles, Sun } from "lucide-react";
import * as React from "react";

type Theme = "light" | "dark" | "system";

export function NavUser({
	user,
}: {
	user?: User | null;
}) {
	const { isMobile } = useSidebar();

	const [theme, setTheme] = React.useState<Theme>(() => {
		if (typeof window !== "undefined") {
			return window.getThemePreference();
		}
		return "light";
	});

	React.useEffect(() => {
		const handleStorageChange = () => {
			if (typeof window !== "undefined") {
				setTheme(window.getThemePreference());
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const handleSetTheme = (newTheme: Theme) => {
		if (typeof window !== "undefined") {
			window.setThemePreference(newTheme);
			setTheme(newTheme);
		}
	};

	const handleLogout = async () => {
		try {
			await signOut();
			await navigate("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user?.image || ""} alt={user?.name || ""} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{user?.name || ""}
								</span>
								<span className="truncate text-xs">{user?.email || ""}</span>
							</div>
							<CaretSortIcon className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user?.image || ""} alt={user?.name || ""} />
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{user?.name || ""}
									</span>
									<span className="truncate text-xs">{user?.email || ""}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Sparkles />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<BadgeCheck />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ComponentPlaceholderIcon />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Bell />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuItem
							onSelect={() =>
								handleSetTheme(theme === "dark" ? "light" : "dark")
							}
						>
							{theme === "dark" ? (
								<Sun className="mr-2 h-4 w-4" />
							) : (
								<Moon className="mr-2 h-4 w-4" />
							)}
							{theme === "dark" ? "Light mode" : "Dark mode"}
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onSelect={handleLogout}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
