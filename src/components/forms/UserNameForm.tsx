import { actions } from "astro:actions";
import { z } from "astro:schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SectionColumns } from "@/components/dashboard/SectionColumns";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const userNameSchema = z.object({
	name: z.string().min(2).max(32),
});

type FormData = z.infer<typeof userNameSchema>;

interface UserNameFormProps {
	user: {
		id: string;
		name: string;
	};
}

export function UserNameForm({ user }: UserNameFormProps) {
	const [updated, setUpdated] = useState(false);
	const [isPending, startTransition] = useTransition();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(userNameSchema),
		defaultValues: {
			name: user?.name || "",
		},
	});

	const checkUpdate = (value: string) => {
		setUpdated(user.name !== value);
	};

	const onSubmit = handleSubmit((data) => {
		startTransition(() => {
			(async () => {
				try {
					const result = await actions.updateUsername({ id: user.id, ...data });
					if (result.success) {
						setUpdated(false);
						toast.success("Your name has been updated.");
					} else {
						throw new Error(result.error || "Failed to update name");
					}
				} catch (error) {
					toast.error("Something went wrong.", {
						description:
							error instanceof Error
								? error.message
								: "Your name was not updated. Please try again.",
					});
				}
			})();
		});
	});

	return (
		<form onSubmit={onSubmit}>
			<SectionColumns
				title="Your Name"
				description="Please enter a display name you are comfortable with."
			>
				<div className="flex w-full items-center gap-2">
					<Label className="sr-only" htmlFor="name">
						Name
					</Label>
					<Input
						id="name"
						className="flex-1"
						size={32}
						{...register("name", {
							onChange: (e) => checkUpdate(e.target.value),
						})}
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
					{errors?.name && (
						<p className="pb-0.5 text-[13px] text-red-600">
							{errors.name.message}
						</p>
					)}
					<p className="text-[13px] text-muted-foreground">Max 32 characters</p>
				</div>
			</SectionColumns>
		</form>
	);
}
