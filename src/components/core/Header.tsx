import { navigate } from "astro:transitions/client";
import { Button } from "@/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useTheme } from "@/hooks/useTheme";
import { CircleUser, Menu, Search, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
	const { theme, setThemePreference } = useTheme();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isCommandOpen, setIsCommandOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	interface SearchResult {
		id: number;
		title: string;
		url: string;
	}

	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	useEffect(() => {
		const fetchSearchResults = async () => {
			if (debouncedSearchQuery) {
				try {
					const sampleSearchData = [
						{ id: 1, title: "Home Page", url: "/" },
						{ id: 2, title: "About Us", url: "/about" },
						{ id: 3, title: "Products", url: "/products" },
						{ id: 4, title: "Contact", url: "/contact" },
						{ id: 5, title: "Blog", url: "/blog" },
						{ id: 6, title: "Terms of Service", url: "/terms" },
						{ id: 7, title: "Privacy Policy", url: "/privacy" },
						{ id: 8, title: "FAQ", url: "/faq" },
					];

					// const response = await fetch(
					// 	`/api/search?q=${encodeURIComponent(debouncedSearchQuery)}`,
					// );
					// if (response.ok) {
					// 	const data = await response.json();
					// 	setSearchResults(data.results);
					// } else {
					// 	console.error("Search request failed");
					// }

					const filteredResults = sampleSearchData.filter((item) =>
						item.title
							.toLowerCase()
							.includes(debouncedSearchQuery.toLowerCase()),
					);

					setSearchResults(filteredResults);
				} catch (error) {
					console.error("Error fetching search results:", error);
				}
			} else {
				setSearchResults([]);
			}
		};

		fetchSearchResults();
	}, [debouncedSearchQuery]);

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

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsCommandOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<header className="flex h-12 items-center gap-4 border-b border-muted bg-muted/40 px-4 lg:px-6">
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
				<form
					onSubmit={(e) => {
						e.preventDefault();
						setIsCommandOpen(true);
					}}
				>
					<div className="relative">
						<Search className="absolute left-2.5 top-[0.45rem] size-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search..."
							className="w-full h-8 appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onFocus={() => setIsCommandOpen(true)}
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
							<span>Light Mode</span>
						) : (
							<span>Dark Mode</span>
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
			<CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
				<CommandInput
					placeholder="Type to search..."
					value={searchQuery}
					onValueChange={setSearchQuery}
				/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Search Results">
						{searchResults.map((result, index) => (
							<CommandItem
								key={result.id}
								onSelect={() => {
									navigate(result.url);
									setIsCommandOpen(false);
								}}
							>
								{result.title}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</header>
	);
};

export default Header;
