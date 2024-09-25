import { navigate } from "astro:transitions/client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/useTheme";
import {
	CircleUser,
	EllipsisVertical,
	Menu,
	Moon,
	Search,
	Sun,
	X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

const Header: React.FC = () => {
	const { theme, setThemePreference } = useTheme();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleLogout = async (e: Event) => {
		e.preventDefault();
		try {
			await fetch("/api/logout", {
				method: "POST",
				credentials: "include",
			});
			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const toggleSidebar = () => {
		const sidebar = document.querySelector("aside");
		if (sidebar) {
			sidebar.classList.toggle("hidden");
			setIsSidebarOpen(!isSidebarOpen);
		}
	};

	const toggleTheme = () => {
		setThemePreference(theme === "dark" ? "light" : "dark");
	};

	return (
		<header className="flex h-12 items-center gap-4 border-b border-muted bg-muted/20 px-4 lg:px-6">
			<Button
				variant="outline"
				size="icon"
				className="shrink-0 md:hidden size-8"
				onClick={toggleSidebar}
			>
				<Menu className="size-4" />
				<span className="sr-only">Toggle navigation menu</span>
			</Button>
			<div className="w-full flex-1">
				<form>
					<div className="relative">
						<Search className="absolute left-2.5 top-[0.45rem] size-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							className="w-full h-8 appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
						/>
					</div>
				</form>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="size-7">
						<CircleUser className="size-5" />
						<span className="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuItem onClick={toggleTheme}>
						{theme === "dark" ? (
							<>
								<span>Light Mode</span>
							</>
						) : (
							<>
								<span>Dark Mode</span>
							</>
						)}
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{isSidebarOpen && (
				<Button
					variant="outline"
					size="icon"
					className="shrink-0 inline-flex md:hidden size-8 z-30 absolute top-3 right-4 "
					onClick={toggleSidebar}
				>
					<X className="size-4" />
					<span className="sr-only">Close navigation menu</span>
				</Button>
			)}
		</header>
	);
};

export default Header;
