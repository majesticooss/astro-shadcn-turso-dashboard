import React from "react";

import { Button } from "@/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface SearchCommandProps {
	links?: NavItemWithSubItems[];
	onNavigate?: (href: string) => void;
}

export function SearchCommand({ links, onNavigate }: SearchCommandProps) {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = React.useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

	return (
		<>
			<Button
				variant="outline"
				className={cn(
					"relative h-9 w-[160px] justify-start rounded-md bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:w-[200px] md:w-[240px]",
					"flex items-center gap-2",
				)}
				onClick={() => setOpen(true)}
			>
				<Icons.search className="h-4 w-4 shrink-0" />
				<span className="inline-flex items-center gap-1 truncate overflow-hidden">
					<span className="truncate">Search</span>
				</span>
				<kbd className="pointer-events-none absolute right-[0.3rem] top-[0.45rem] h-5 select-none flex items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 ">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{links?.map((section) => (
						<CommandGroup key={section.title} heading={section.title}>
							{section.items?.map((item) => {
								const Icon =
									Icons[(item.icon as keyof typeof Icons) || "arrowRight"];
								return (
									<CommandItem
										key={item.title}
										onSelect={() => {
											runCommand(() => {
												if (item.href && onNavigate) {
													onNavigate(item.href);
												}
											});
										}}
									>
										<Icon className="mr-2 size-5" />
										{item.title}
									</CommandItem>
								);
							})}
						</CommandGroup>
					))}
				</CommandList>
			</CommandDialog>
		</>
	);
}
