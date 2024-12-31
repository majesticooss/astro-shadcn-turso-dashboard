import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/icons";

type Theme = "light" | "dark" | "system";

export function ModeToggle() {
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

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="size-8 px-0">
					<Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleSetTheme("light")}>
					<Icons.sun className="mr-2 size-4" />
					<span>Light</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleSetTheme("dark")}>
					<Icons.moon className="mr-2 size-4" />
					<span>Dark</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleSetTheme("system")}>
					<Icons.laptop className="mr-2 size-4" />
					<span>System</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
