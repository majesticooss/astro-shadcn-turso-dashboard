import { actions } from "astro:actions";
import { z } from "astro:schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SectionColumns } from "@/components/routes/dashboard/SectionColumns";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Assuming these are imported from a shared location
const UserRole = {
	ADMIN: "ADMIN",
	USER: "USER",
	// Add other roles as needed
};

const userRoleSchema = z.object({
	role: z.enum(Object.values(UserRole) as [string, ...string[]]),
});

type FormData = z.infer<typeof userRoleSchema>;

interface UserRoleFormProps {
	user: {
		id: string;
		role?: string | null;
	};
}

export function UserRoleForm({ user }: UserRoleFormProps) {
	const [updated, setUpdated] = useState(false);
	const [isPending, startTransition] = useTransition();
	const roles = Object.values(UserRole);
	const [role, setRole] = useState(user.role);

	const form = useForm<FormData>({
		resolver: zodResolver(userRoleSchema),
		defaultValues: {
			role: user.role as UserRole,
		},
	});

	const onSubmit = (data: FormData) => {
		startTransition(() => {
			(async () => {
				const { status, error } = await actions.updateUserRole({
					userId: user.id,
					...data,
				});

				if (status !== "success") {
					toast.error("Something went wrong.", {
						description:
							error || "Your role was not updated. Please try again.",
					});
				} else {
					setUpdated(false);
					toast.success("Your role has been updated.");
				}
			})();
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<SectionColumns
					title="Your Role"
					description="Select the role you want to test the app."
				>
					<div className="flex w-full items-center gap-2">
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem className="w-full space-y-0">
									<FormLabel className="sr-only">Role</FormLabel>
									<Select
										onValueChange={(value: UserRole) => {
											setUpdated(user.role !== value);
											setRole(value);
											field.onChange(value);
										}}
										defaultValue={user.role}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a role" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{roles.map((role) => (
												<SelectItem key={role} value={role}>
													{role}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							variant={updated ? "default" : "disable"}
							disabled={isPending || !updated}
							className="w-[67px] shrink-0 px-0 sm:w-[130px]"
						>
							{isPending ? (
								<Icons.spinner className="size-4 animate-spin" />
							) : (
								<p>
									Save
									<span className="hidden sm:inline-flex">&nbsp;Changes</span>
								</p>
							)}
						</Button>
					</div>
					<div className="flex flex-col justify-between p-1">
						<p className="text-[13px] text-muted-foreground">
							Remove this field in real production
						</p>
					</div>
				</SectionColumns>
			</form>
		</Form>
	);
}
