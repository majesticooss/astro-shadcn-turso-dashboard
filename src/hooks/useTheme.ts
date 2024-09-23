import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
	const [theme, setTheme] = useState<Theme>("system");

	useEffect(() => {
		const updateTheme = () => {
			if (typeof window !== "undefined" && window.getThemePreference) {
				setTheme(window.getThemePreference() as Theme);
			}
		};

		updateTheme();
		document.addEventListener("astro:after-swap", updateTheme);

		return () => {
			document.removeEventListener("astro:after-swap", updateTheme);
		};
	}, []);

	const setThemePreference = (newTheme: Theme) => {
		setTheme(newTheme);
		if (typeof window !== "undefined" && window.setThemePreference) {
			window.setThemePreference(newTheme);
		}
	};

	return { theme, setThemePreference };
}
