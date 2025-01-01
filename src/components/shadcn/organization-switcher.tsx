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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CaretSortIcon,
	ImageIcon,
	PlusIcon,
	UploadIcon,
} from "@radix-ui/react-icons";
import * as React from "react";
import { useForm } from "react-hook-form";
import { GoOrganization } from "react-icons/go";
import * as z from "zod";

// Add a constant for max file size
const MAX_FILE_SIZE = 200 * 1024; // 200KB in bytes

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Organization name must be at least 2 characters." })
		.regex(/^[a-zA-Z0-9\s-]+$/, {
			message:
				"Organization name can only contain letters, numbers, spaces, and hyphens.",
		}),
	slug: z.string().min(2),
	logo: z
		.instanceof(File)
		.optional()
		.or(z.string().optional())
		.refine((file) => {
			if (!file) return true;
			if (file instanceof File) {
				return file.size <= MAX_FILE_SIZE;
			}
			return true;
		}, "File size should be less than 200KB"),
});

async function uploadToR2(file: File): Promise<string> {
	const formData = new FormData();
	formData.append("file", file);

	const response = await fetch("/api/upload", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to upload file");
	}

	const data = await response.json();
	return data.url;
}

export function OrganizationSwitcher() {
	const { isMobile } = useSidebar();
	const { data: organizations = [] } = useListOrganizations();
	const [activeOrganization, setActiveOrganization] = React.useState<any>(
		organizations?.length > 0 ? organizations[0] : null,
	);
	const [open, setOpen] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const [preview, setPreview] = React.useState<string | null>(null);

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

			// Handle file upload if exists
			let logoUrl = values.logo as string;
			if (values.logo instanceof File) {
				try {
					logoUrl = await uploadToR2(values.logo);
				} catch (error) {
					console.error("Failed to upload logo:", error);
					setError("Failed to upload logo. Please try again.");
					return;
				}
			}

			const newOrg = await organization.create({
				...values,
				logo: logoUrl,
			});

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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > MAX_FILE_SIZE) {
				form.setError("logo", {
					message: "File size should be less than 200KB",
				});
				return;
			}
			const url = URL.createObjectURL(file);
			setPreview(url);
			form.setValue("logo", file);
			form.clearErrors("logo");
		}
	};

	React.useEffect(() => {
		return () => {
			if (preview) {
				URL.revokeObjectURL(preview);
			}
		};
	}, [preview]);

	const renderLogo = (logo: string | any) => {
		if (!logo) return <GoOrganization className="size-4" />;
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
								{organizations?.map((organization: any, index: number) => (
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
										<FormField
											control={form.control}
											name="logo"
											render={({ field: { value, onChange, ...field } }) => (
												<FormItem>
													<FormLabel>Logo</FormLabel>
													<FormControl>
														<div className="grid gap-4">
															<div className="flex items-center gap-4">
																<div className="flex size-16 items-center justify-center rounded-lg border bg-muted">
																	{preview ? (
																		<img
																			src={preview}
																			alt="Preview"
																			className="size-14 rounded object-cover"
																		/>
																	) : (
																		<ImageIcon className="size-8 text-muted-foreground" />
																	)}
																</div>
																<div className="grid gap-1.5">
																	<label
																		htmlFor="logo-upload"
																		className={cn(
																			"group relative flex size-9 cursor-pointer items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
																			"dark:hover:bg-accent/50",
																		)}
																	>
																		<UploadIcon className="size-4" />
																		<span className="sr-only">Upload logo</span>
																	</label>
																	<p className="text-xs text-muted-foreground">
																		Upload your organization logo
																	</p>
																</div>
															</div>
															<Input
																id="logo-upload"
																type="file"
																accept="image/*"
																className="hidden"
																onChange={handleFileChange}
																{...field}
															/>
														</div>
													</FormControl>
													<FormDescription>
														Accepted formats: .jpg, .jpeg, .png, .gif. Max size
														200KB.
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
