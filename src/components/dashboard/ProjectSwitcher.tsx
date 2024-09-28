import Link from "@/components/core/Link";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type ProjectType = {
	title: string;
	slug: string;
	color: string;
};

const projects: ProjectType[] = [
	{
		title: "Project 1",
		slug: "project-number-one",
		color: "bg-red-500",
	},
	{
		title: "Project 2",
		slug: "project-number-two",
		color: "bg-blue-500",
	},
];

interface ProjectSwitcherProps {
	large?: boolean;
	user: {
		isLoggedIn: boolean;
		isLoading: boolean;
	};
}

export default function ProjectSwitcher({
	large = false,
	user,
}: ProjectSwitcherProps) {
	const [openPopover, setOpenPopover] = useState(false);
	const [selected, setSelected] = useState<ProjectType>(projects[1]);

	if (!projects || user?.isLoading) {
		return <ProjectSwitcherPlaceholder />;
	}

	return (
		<div>
			<Popover open={openPopover} onOpenChange={setOpenPopover}>
				<PopoverTrigger>
					<Button
						className="h-8 px-2"
						variant={openPopover ? "secondary" : "ghost"}
						onClick={() => setOpenPopover(!openPopover)}
					>
						<div className="flex items-center space-x-3 pr-2">
							<div
								className={cn("size-3 shrink-0 rounded-full", selected.color)}
							/>
							<div className="flex items-center space-x-3">
								<span
									className={cn(
										"inline-block truncate text-sm font-medium xl:max-w-[120px]",
										large ? "w-full" : "max-w-[80px]",
									)}
								>
									{selected.slug}
								</span>
							</div>
						</div>
						<ChevronsUpDown
							className="size-4 text-muted-foreground"
							aria-hidden="true"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className="max-w-60 p-2">
					<ProjectList
						selected={selected}
						projects={projects}
						setOpenPopover={setOpenPopover}
						setSelected={setSelected}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

interface ProjectListProps {
	selected: ProjectType;
	projects: ProjectType[];
	setOpenPopover: (open: boolean) => void;
	setSelected: (project: ProjectType) => void;
}

function ProjectList({
	selected,
	projects,
	setOpenPopover,
	setSelected,
}: ProjectListProps) {
	return (
		<div className="flex flex-col gap-1">
			{projects.map((project) => (
				<Link
					key={project.slug}
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"relative flex h-9 items-center gap-3 p-3 text-muted-foreground hover:text-foreground",
					)}
					href="#"
					onClick={() => {
						setSelected(project);
						setOpenPopover(false);
					}}
				>
					<div className={cn("size-3 shrink-0 rounded-full", project.color)} />
					<span
						className={`flex-1 truncate text-sm ${
							selected.slug === project.slug
								? "font-medium text-foreground"
								: "font-normal"
						}`}
					>
						{project.slug}
					</span>
					{selected.slug === project.slug && (
						<span className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground">
							<Check size={18} aria-hidden="true" />
						</span>
					)}
				</Link>
			))}
			<Button
				variant="outline"
				className="relative flex h-9 items-center justify-center gap-2 p-2"
				onClick={() => {
					setOpenPopover(false);
				}}
			>
				<Plus size={18} className="absolute left-2.5 top-2" />
				<span className="flex-1 truncate text-center">New Project</span>
			</Button>
		</div>
	);
}

function ProjectSwitcherPlaceholder() {
	return (
		<div className="flex animate-pulse items-center space-x-1.5 rounded-lg px-1.5 py-2 sm:w-60">
			<div className="h-8 w-36 animate-pulse rounded-md bg-muted xl:w-[180px]" />
		</div>
	);
}
