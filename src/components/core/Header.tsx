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
import { CircleUser, Menu, Moon, Search, Sun } from "lucide-react";
import type React from "react";

interface HeaderProps {
	onOpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
	const { theme, setThemePreference } = useTheme();

	const handleLogout = async (e: React.MouseEvent) => {
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

	const toggleTheme = () => {
		setThemePreference(theme === "dark" ? "light" : "dark");
	};

	return (
		<header className="flex h-10 items-center gap-4 border-b border-muted bg-muted/20 px-4 lg:h-12 lg:px-6">
			<Button
				variant="outline"
				size="icon"
				className="shrink-0 md:hidden size-6"
				onClick={onOpenSidebar}
			>
				<Menu className="size-4" />
				<span className="sr-only">Toggle navigation menu</span>
			</Button>
			<div className="w-full flex-1">
				<form>
					<div className="relative">
						<Search className="absolute left-2.5 top-[0.45rem] size-3 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							className="w-full h-7 appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
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
		</header>
	);
};

export default Header;
