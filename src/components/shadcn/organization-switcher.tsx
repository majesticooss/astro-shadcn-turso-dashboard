import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { organization, useListOrganizations } from "@/lib/authClient";
import { slugify } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, PlusIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Add proper type for organization
type Organization = any;

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Organization name must be at least 2 characters." })
		.regex(/^[a-zA-Z0-9\s-]+$/, {
			message:
				"Organization name can only contain letters, numbers, spaces, and hyphens.",
		}),
	slug: z.string().min(2),
	logo: z.string().optional(),
});

export function OrganizationSwitcher() {
	const { isMobile } = useSidebar();
	const { data: organizations = [] } = useListOrganizations();
	const [activeOrganization, setActiveOrganization] = React.useState<any>(
		organizations?.length > 0 ? organizations[0] : null,
	);
	const [open, setOpen] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleOrganizationSwitch = async (org: any) => {
		try {
			await organization.setActive({
				organizationId: org.id,
			});
			setActiveOrganization(org);
		} catch (error) {
			console.error("Failed to switch organization:", error);
			// Show error in UI
			setError("Failed to switch organization. Please try again.");
		}
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			slug: "",
			logo: "",
		},
	});

	const name = form.watch("name");

	React.useEffect(() => {
		const slug = slugify(name);
		form.setValue("slug", slug);
	}, [name, form]);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setError(null);
		try {
			setIsLoading(true);
			const newOrg = await organization.create(values);
			await handleOrganizationSwitch(newOrg);
			setOpen(false);
			form.reset();
		} catch (error) {
			console.error("Failed to create organization:", error);
			setError("Failed to create organization. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	React.useEffect(() => {
		if (!activeOrganization && organizations?.length > 0) {
			setActiveOrganization(organizations[0]);
		}
	}, [organizations, activeOrganization]);

	const renderLogo = (logo: string | any) => {
		if (!logo) return <PlusIcon className="size-4" />;
		if (typeof logo === "string") {
			return (
				<img
					src={logo}
					alt="Organization logo"
					className="size-4 object-contain"
				/>
			);
		}
		const LogoComponent = logo;
		return <LogoComponent className="size-4" />;
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
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								{renderLogo(activeOrganization?.logo)}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{activeOrganization?.name ?? "Create Organization"}
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
									Organizations
								</DropdownMenuLabel>
								{organizations?.map((organization, index) => (
									<DropdownMenuItem
										key={organization.name}
										onClick={() => handleOrganizationSwitch(organization)}
										className="gap-2 p-2"
									>
										<div className="flex size-6 items-center justify-center rounded-sm border">
											{renderLogo(organization.logo)}
										</div>
										{organization.name}
										<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
							</>
						)}
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger asChild>
								<DropdownMenuItem
									className="gap-2 p-2"
									onSelect={(e) => e.preventDefault()}
								>
									<div className="flex size-6 items-center justify-center rounded-md border bg-background">
										<PlusIcon className="size-4" />
									</div>
									<div className="font-medium text-muted-foreground">
										{organizations?.length > 0
											? "Add organization"
											: "Create your first organization"}
									</div>
								</DropdownMenuItem>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Create Organization</DialogTitle>
									<DialogDescription>
										Add a new organization to manage your teams and projects.
									</DialogDescription>
								</DialogHeader>
								{error && (
									<div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
										{error}
									</div>
								)}
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-4"
									>
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Organization Name</FormLabel>
													<FormControl>
														<Input placeholder="Acme Inc." {...field} />
													</FormControl>
													<FormDescription>
														This is your organization's display name.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="slug"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Slug</FormLabel>
													<FormControl>
														<Input
															placeholder="acme"
															{...field}
															readOnly
															className="bg-muted"
														/>
													</FormControl>
													<FormDescription>
														The URL-friendly version of your organization name.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button type="submit" disabled={isLoading}>
											{isLoading ? "Creating..." : "Create Organization"}
										</Button>
									</form>
								</Form>
							</DialogContent>
						</Dialog>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
